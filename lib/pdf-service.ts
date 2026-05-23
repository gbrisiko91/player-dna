import Stripe from 'stripe';
import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import { ARCHETYPES } from '@/lib/data';
import { Resend } from 'resend';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
});

const getResend = () => new Resend(process.env.RESEND_API_KEY);

const COLORS = {
  bg: rgb(0.01, 0.01, 0.02),
  black: rgb(0, 0, 0),
  white: rgb(0.95, 0.95, 0.98),
  neon: rgb(0, 0.85, 1),
  accent: rgb(0.6, 0.3, 1),
  danger: rgb(0.9, 0.1, 0.2),
  gray: rgb(0.2, 0.2, 0.25),
  dim: rgb(0.05, 0.05, 0.08),
};

export async function generatePDF(data: { archetype_id: string, lang: string, nickname: string, id: string }) {
    const { archetype_id, lang, nickname, id } = data;
    const archetype = ARCHETYPES.find(a => a.id === archetype_id) || ARCHETYPES.find(a => a.slug === archetype_id) || ARCHETYPES[0];
    const isIt = lang === 'it';

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return rgb(r, g, b);
    };

    const themeColor = archetype.color ? hexToRgb(archetype.color) : COLORS.neon;
    
    const pdfDoc = await PDFDocument.create();
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontMono = await pdfDoc.embedFont(StandardFonts.CourierBold);

    // --- PAGE 1 ---
    const page1 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page1);
    drawHUD(page1, fontMono, "DOSS_01/02", themeColor);

    page1.drawText(isIt ? 'DOSSIER IDENTITÀ NEURALE' : 'NEURAL IDENTITY DOSSIER', { x: 50, y: 780, size: 10, font: fontMono, color: themeColor });
    page1.drawText('CONFIDENTIAL', { x: 450, y: 780, size: 10, font: fontMono, color: COLORS.danger });

    page1.drawText(isIt ? 'SOGGETTO:' : 'SUBJECT:', { x: 50, y: 745, size: 12, font: fontMono, color: themeColor });
    page1.drawText(nickname.toUpperCase(), { x: 50, y: 700, size: 48, font: fontBold, color: COLORS.white });
    
    const arcName = archetype.name.toUpperCase();
    page1.drawText(isIt ? 'DESIGNAZIONE:' : 'DESIGNATION:', { x: 50, y: 660, size: 10, font: fontMono, color: themeColor });
    page1.drawText(arcName, { x: 50, y: 630, size: 32, font: fontBold, color: themeColor });

    drawTechBox(page1, 50, 420, 495, 185, fontMono, isIt ? "CORE ANALYSIS" : "CORE ANALYSIS", themeColor);
    const fullAnalysis = isIt 
        ? `${archetype.description_it}\n\n${archetype.motivation_it}\n\nImpatto Neurale: Il soggetto mostra una predisposizione unica per ${archetype.name_it.toLowerCase()}, con pattern sinaptici che favoriscono l'esecuzione sotto stress e la dominanza spaziale.`
        : `${archetype.description}\n\n${archetype.motivation}\n\nNeural Impact: The subject demonstrates a unique predisposition for ${archetype.name.toLowerCase()} gameplay, with synaptic patterns favoring execution under stress and spatial dominance.`;
    
    drawWrappedText(page1, fullAnalysis, 70, 575, 455, 11, fontRegular, COLORS.white);

    page1.drawText(isIt ? 'MATRICE PSICOMETRICA:' : 'PSYCHOMETRIC MATRIX:', { x: 50, y: 385, size: 10, font: fontMono, color: themeColor });
    const traitValues = [archetype.traits.ego, archetype.traits.clutch, archetype.traits.toxic, archetype.traits.tactics, archetype.traits.resilience];
    const traitLabels = ['EGO', 'CLUTCH', 'TOXIC', 'TACTICS', 'RESIL'];
    drawRadarChart(page1, 200, 215, 190, traitValues, traitLabels, themeColor, fontBold, fontMono);

    let tY = 320;
    traitLabels.forEach((l, i) => {
        page1.drawText(`${l}: ${traitValues[i]}%`, { x: 410, y: tY, size: 11, font: fontMono, color: COLORS.white });
        page1.drawRectangle({ x: 410, y: tY - 10, width: 100, height: 4, color: COLORS.gray });
        page1.drawRectangle({ x: 410, y: tY - 10, width: traitValues[i], height: 4, color: themeColor });
        tY -= 40;
    });

    // --- PAGE 2 ---
    const page2 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page2);
    drawHUD(page2, fontMono, "DOSS_02/02", themeColor);

    page2.drawText(isIt ? 'POSIZIONAMENTO GLOBALE' : 'GLOBAL POPULATION RANKING', { x: 50, y: 780, size: 12, font: fontBold, color: COLORS.white });
    page2.drawText(`TOP ${archetype.rarity}%`, { x: 50, y: 710, size: 85, font: fontBold, color: themeColor });
    page2.drawText(isIt ? 'PERCENTUALE DI RARITÀ RILEVATA' : 'RARITY PERCENTILE DETECTED', { x: 55, y: 690, size: 10, font: fontMono, color: COLORS.white });

    drawTechBox(page2, 50, 480, 495, 165, fontMono, isIt ? "OPTIMIZATION VECTORS" : "OPTIMIZATION VECTORS", themeColor);
    const recommendation = isIt 
        ? "• Sfrutta la tua dominanza naturale per dettare il ritmo del match.\n• Identifica i trigger emotivi che precedono la desincronizzazione cognitiva.\n• Ottimizza i tempi di recupero post-match per prevenire il 'neural burnout'.\n• Coordina i compagni di squadra utilizzando la tua specifica impronta tattica."
        : "• Leverage your natural dominance to dictate the match tempo.\n• Identify emotional triggers that precede cognitive desynchronization.\n• Optimize post-match recovery times to prevent 'neural burnout'.\n• Coordinate teammates using your specific tactical footprint.";
    drawWrappedText(page2, recommendation, 70, 610, 455, 11, fontRegular, COLORS.white);

    const certId = `DNA-CERT-${id.substring(id.length - 8).toUpperCase()}`;
    drawComplexSeal(page2, 297, 305, 200, nickname, fontBold, fontMono, certId, themeColor);
    
    page2.drawText(isIt ? 'CERTIFICATO UFFICIALE DI IDENTITÀ NEURALE' : 'OFFICIAL NEURAL IDENTITY CERTIFICATE', {
        x: 297 - 120,
        y: 120,
        size: 8,
        font: fontMono,
        color: COLORS.white,
        opacity: 0.6
    });

    return await pdfDoc.save();
}

function drawComplexSeal(page: PDFPage, cx: number, cy: number, r: number, nickname: string, fontB: any, fontM: any, certId: string, themeColor: any = COLORS.neon) {
    const nText = nickname.toUpperCase();
    const nw = fontB.widthOfTextAtSize(nText, 22);
    page.drawCircle({ x: cx, y: cy, size: r/2, color: COLORS.dim, borderColor: themeColor, borderWidth: 2 });
    page.drawCircle({ x: cx, y: cy, size: r/2 - 10, borderColor: COLORS.white, borderWidth: 0.5, opacity: 0.3 });
    page.drawText(nText, { x: cx - nw/2, y: cy - 8, size: 22, font: fontB, color: COLORS.white });
    page.drawText("VERIFIED PLAYER", { x: cx - 35, y: cy + 50, size: 8, font: fontM, color: themeColor });
    page.drawText(certId, { x: cx - 45, y: cy - 60, size: 8, font: fontM, color: themeColor });
}

function drawBaseLayer(page: PDFPage) {
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: COLORS.bg });
    for(let i=0; i<width; i+=40) {
        for(let j=0; j<height; j+=40) {
            page.drawCircle({ x: i, y: j, size: 0.5, color: COLORS.gray, opacity: 0.2 });
        }
    }
}

function drawHUD(page: PDFPage, font: any, id: string, color: any = COLORS.neon) {
    const { width, height } = page.getSize();
    const m = 40;
    const l = 30;
    page.drawLine({ start: { x: m, y: m }, end: { x: m+l, y: m }, thickness: 1.5, color });
    page.drawLine({ start: { x: m, y: m }, end: { x: m, y: m+l }, thickness: 1.5, color });
    page.drawLine({ start: { x: width-m, y: m }, end: { x: width-m-l, y: m }, thickness: 1.5, color });
    page.drawLine({ start: { x: width-m, y: m }, end: { x: width-m, y: m+l }, thickness: 1.5, color });
    page.drawLine({ start: { x: m, y: height-m }, end: { x: m+l, y: height-m }, thickness: 1.5, color });
    page.drawLine({ start: { x: m, y: height-m }, end: { x: m, y: height-m-l }, thickness: 1.5, color });
    page.drawLine({ start: { x: width-m, y: height-m }, end: { x: width-m-l, y: height-m }, thickness: 1.5, color });
    page.drawLine({ start: { x: width-m, y: height-m }, end: { x: width-m, y: height-m-l }, thickness: 1.5, color });
    page.drawText(id, { x: width - m - 80, y: m - 15, size: 7, font, color });
}

function drawTechBox(page: PDFPage, x: number, y: number, w: number, h: number, font: any, title: string, color: any = COLORS.neon) {
    page.drawRectangle({ x, y, width: w, height: h, borderColor: color, borderWidth: 1, opacity: 0.2 });
    page.drawRectangle({ x, y: y+h-12, width: 150, height: 12, color });
    page.drawText(title, { x: x + 5, y: y + h - 9, size: 7, font, color: COLORS.black });
}

function drawRadarChart(page: PDFPage, x: number, y: number, size: number, values: number[], labels: string[], color: any, fontB: any, fontMono: any) {
    const n = values.length;
    const step = (Math.PI * 2) / n;
    const r = size / 2;
    for(let i=1; i<=4; i++) {
        const currR = (r/4) * i;
        for(let j=0; j<n; j++) {
            const a1 = j * step - Math.PI/2;
            const a2 = (j+1) * step - Math.PI/2;
            page.drawLine({ start: { x: x + currR*Math.cos(a1), y: y + currR*Math.sin(a1) }, end: { x: x + currR*Math.cos(a2), y: y + currR*Math.sin(a2) }, thickness: 0.5, color: COLORS.gray, opacity: 0.5 });
        }
    }
    const pts = values.map((v, i) => {
        const a = i * step - Math.PI/2;
        const curR = (v/100) * r;
        return { x: x + curR*Math.cos(a), y: y + curR*Math.sin(a) };
    });
    for(let i=0; i<n; i++) {
        page.drawLine({ start: pts[i], end: pts[(i+1)%n], thickness: 2, color });
        page.drawCircle({ x: pts[i].x, y: pts[i].y, size: 3, color });
        const la = i*step - Math.PI/2;
        page.drawText(labels[i], { x: x + (r+20)*Math.cos(la)-15, y: y + (r+20)*Math.sin(la), size: 7, font: fontMono, color: COLORS.neon });
    }
}

function drawWrappedText(page: PDFPage, text: string, x: number, y: number, width: number, size: number, font: any, color: any) {
    const paragraphs = text.split('\n');
    let currY = y;
    const lineHeight = size + 6;
    const maxCharsPerLine = width / (size * 0.55);
    paragraphs.forEach(paragraph => {
        if (paragraph.trim() === '') { currY -= lineHeight / 2; return; }
        const words = paragraph.split(' ');
        let line = '';
        words.forEach(w => {
            if ((line + w).length < maxCharsPerLine) { line += w + ' '; } 
            else { page.drawText(line.trim(), { x, y: currY, size, font, color }); line = w + ' '; currY -= lineHeight; }
        });
        page.drawText(line.trim(), { x, y: currY, size, font, color });
        currY -= lineHeight;
    });
}

export async function sendPremiumEmail(session: any, pdfBuffer: Uint8Array) {
    const { nickname, lang } = session.metadata as any;
    const email = session.customer_details?.email;
    if (!email) return;

    const resend = getResend();
    const isIt = lang === 'it';
    const archetype = ARCHETYPES.find(a => a.id === (session.metadata as any).archetype_id) || ARCHETYPES.find(a => a.slug === (session.metadata as any).archetype_id) || ARCHETYPES[0];
    const themeColor = archetype?.color || '#00f2ff';

    const subject = isIt ? `IL TUO DOSSIER NEURALE: ${nickname.toUpperCase()}` : `YOUR NEURAL DOSSIER: ${nickname.toUpperCase()}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { background-color: #030303; color: #ffffff; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid ${themeColor}33; background-color: #030303; }
            .header { border-bottom: 1px solid ${themeColor}55; padding-bottom: 20px; margin-bottom: 30px; }
            .title { color: ${themeColor}; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; font-size: 24px; margin: 0; }
            .subject-info { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            .nickname { font-size: 18px; color: #fff; font-weight: bold; margin: 0; }
            .content { line-height: 1.6; font-size: 14px; color: #ccc; }
            .highlight { color: ${themeColor}; font-weight: bold; }
            .box { margin: 30px 0; padding: 20px; border-left: 4px solid ${themeColor}; background-color: #111; }
            .protocol { margin: 0; font-size: 11px; color: #666; text-transform: uppercase; }
            .status { margin: 5px 0 0 0; font-size: 11px; color: ${themeColor}; font-weight: bold; text-transform: uppercase; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #222; font-size: 10px; color: #444; text-align: center; text-transform: uppercase; letter-spacing: 2px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="subject-info">${isIt ? 'SOGGETTO RILEVATO' : 'SUBJECT DETECTED'}</div>
              <p class="nickname">${nickname}</p>
            </div>
            <div class="content">
              <h1 class="title">${isIt ? 'ACCESSO AUTORIZZATO' : 'ACCESS AUTHORIZED'}</h1>
              <p>
                ${isIt 
                  ? `Il tuo <span class="highlight">Premium Neural Report</span> è stato generato. Abbiamo analizzato le tue sinapsi per decodificare il tuo DNA competitivo.` 
                  : `Your <span class="highlight">Premium Neural Report</span> has been generated. We have analyzed your synapses to decode your competitive DNA.`
                }
              </p>
              <div class="box">
                <p class="protocol">PROTOCOL: DNA-SECURE-V4</p>
                <p class="status">${isIt ? 'STATO: CRIPTATO / ALLEGATO' : 'STATUS: ENCRYPTED / ATTACHED'}</p>
              </div>
              <p>
                ${isIt 
                  ? `Il dossier allegato contiene l'analisi completa del tuo archetipo <span class="highlight">${archetype.name}</span>.` 
                  : `The attached dossier contains the full analysis of your archetype: <span class="highlight">${archetype.name}</span>.`
                }
              </p>
              <p>${isIt ? 'Analizza i tuoi tratti. Domina la lobby.' : 'Analyze your traits. Dominate the lobby.'}</p>
            </div>
            <div class="footer">
              PlayerDNA.gg // Neural Identity Lab // 2026
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'PlayerDNA <onboarding@resend.dev>',
      to: email,
      subject: subject,
      html: html,
      attachments: [
        {
          filename: `PlayerDNA_Dossier_${nickname}.pdf`,
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    if (error) {
      console.error("Resend API Error:", error);
    } else {
      console.log("Resend Email Sent Successfully:", data?.id);
    }
}
