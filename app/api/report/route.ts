import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import { ARCHETYPES } from '@/lib/data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
});

// Color Palette - Deep Slate & Neon
const COLORS = {
  bg: rgb(0.02, 0.02, 0.04),
  black: rgb(0, 0, 0),
  white: rgb(0.95, 0.95, 0.98),
  neon: rgb(0, 0.9, 1),
  accent: rgb(0.7, 0.2, 1), 
  danger: rgb(0.9, 0.1, 0.2),
  gray: rgb(0.2, 0.2, 0.3),
  dim: rgb(0.1, 0.1, 0.15),
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) return new Response(JSON.stringify({ error: 'Missing session' }), { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return new Response(JSON.stringify({ error: 'Not paid' }), { status: 403 });

    const { archetype_id, lang, nickname } = session.metadata as any;
    const archetype = ARCHETYPES.find(a => a.id === archetype_id) || ARCHETYPES[0];
    
    const pdfDoc = await PDFDocument.create();
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontCourier = await pdfDoc.embedFont(StandardFonts.CourierBold);

    // --- PAGE 1: THE DOSSIER COVER ---
    const page1 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page1);
    drawHUD(page1, fontCourier, '001/006');
    
    page1.drawRectangle({ x: 40, y: 680, width: 350, height: 120, color: COLORS.dim, borderColor: COLORS.neon, borderWidth: 1 });
    page1.drawText('IDENTITY_ANALYSIS', { x: 55, y: 760, size: 24, font: fontBold, color: COLORS.white });
    page1.drawText('PROTOCOL: PROJECT_AURORA', { x: 55, y: 740, size: 8, font: fontCourier, color: COLORS.neon });
    page1.drawText('VER_8.42', { x: 330, y: 740, size: 8, font: fontCourier, color: COLORS.neon });
    
    page1.drawText('CLASSIFIED', { x: 420, y: 730, size: 30, font: fontBold, color: COLORS.danger, opacity: 0.15 });

    page1.drawRectangle({ x: 40, y: 400, width: 515, height: 250, color: COLORS.black, opacity: 0.4 });
    page1.drawText('SUBJECT_ID:', { x: 60, y: 610, size: 10, font: fontCourier, color: COLORS.neon });
    page1.drawText(nickname.toUpperCase(), { x: 60, y: 560, size: 50, font: fontBold, color: COLORS.white });
    
    const arcName = lang === 'it' ? archetype.name_it.toUpperCase() : archetype.name.toUpperCase();
    page1.drawText('ARCHETYPE_DESIGNATION:', { x: 60, y: 520, size: 10, font: fontCourier, color: COLORS.neon });
    page1.drawText(arcName, { x: 60, y: 480, size: 30, font: fontBold, color: COLORS.accent });

    drawMetadataStream(page1, 560, 50, 750, fontCourier);

    // --- PAGE 2: NEURAL PROFILE ---
    const page2 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page2);
    drawHUD(page2, fontCourier, '002/006');
    page2.drawText('01. NEURAL_CORE_MAPPING', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    const motivation = lang === 'it' ? archetype.motivation_it : archetype.motivation;
    drawTechnicalBox(page2, 40, 560, 515, 200, fontBold);
    drawWrappedText(page2, motivation, 60, 730, 470, 12, fontRegular, COLORS.white);
    
    drawHeatmap(page2, 40, 250, 515, 250);

    // --- PAGE 3: PSYCHOMETRIC MATRIX ---
    const page3 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page3);
    drawHUD(page3, fontCourier, '003/006');
    page3.drawText('02. PSYCHOMETRIC_MATRIX', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    const traitValues = [archetype.traits.ego, archetype.traits.clutch, archetype.traits.toxic, archetype.traits.tactics, archetype.traits.resilience];
    const traitLabels = ['EGO', 'CLUTCH', 'TOXIC', 'TACTICS', 'RESIL'];
    drawRadarChart(page3, 297, 520, 180, traitValues, traitLabels, COLORS.neon, fontBold, fontCourier);
    
    let barY = 320;
    traitLabels.forEach((l, i) => {
        page3.drawText(l, { x: 100, y: barY, size: 10, font: fontCourier, color: COLORS.neon });
        drawGlowBar(page3, 180, barY - 2, 280, 10, traitValues[i] / 100, COLORS.neon);
        page3.drawText(`${traitValues[i]}%`, { x: 470, y: barY, size: 10, font: fontBold, color: COLORS.white });
        barY -= 32;
    });

    // --- PAGE 4: BEHAVIORAL STABILITY ---
    const page4 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page4);
    drawHUD(page4, fontCourier, '004/006');
    page4.drawText('03. BEHAVIORAL_STABILITY_SCAN', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    page4.drawText('NEURAL_OSCILLATION_IN_CLUTCH', { x: 60, y: 730, size: 9, font: fontCourier, color: COLORS.neon });
    drawTechnicalWave(page4, 40, 580, 515, 120, COLORS.neon);
    
    drawTechnicalBox(page4, 40, 350, 515, 150, fontBold, COLORS.danger);
    page4.drawText('THREAT_LEVEL: OMEGA_PROTOCOL', { x: 60, y: 470, size: 14, font: fontBold, color: COLORS.danger });
    const threatText = "Subject demonstrates extreme competitive variance. High probability of ranked dominance. Social toxicity levels are monitored but within 'lethal operator' parameters.";
    drawWrappedText(page4, threatText, 60, 435, 470, 11, fontRegular, COLORS.white);

    // --- PAGE 5: RARITY ---
    const page5 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page5);
    drawHUD(page5, fontCourier, '005/006');
    page5.drawText('04. PERFORMANCE_RARITY_INDEX', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    page5.drawText('TOP 2.7%', { x: 60, y: 580, size: 95, font: fontBold, color: COLORS.neon });
    page5.drawText('ELITE_TIER_PROFILE_DETECTED', { x: 65, y: 550, size: 14, font: fontBold, color: COLORS.white });
    
    drawTechnicalBox(page5, 40, 200, 515, 250, fontBold);
    const recommendation = "OPTIMIZATION VECTORS:\n1. Force late-game scenarios to exploit high CLUTCH index.\n2. Utilize EGO dominance to lead team communication.\n3. Minimize early-round biological stress to sustain peak mechanical performance.";
    drawWrappedText(page5, recommendation, 60, 410, 470, 11, fontRegular, COLORS.white);

    // --- PAGE 6: VERIFICATION ---
    const page6 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page6);
    drawHUD(page6, fontCourier, '006/006');
    page6.drawText('05. FINAL_VERIFICATION', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    drawPremiumSeal(page6, 297 - 125, 420, 250, nickname, fontBold, fontCourier);
    
    const vY = 320;
    page6.drawText('CERTIFICATE_OF_AUTHENTICITY', { x: 175, y: vY, size: 14, font: fontBold, color: COLORS.white });
    page6.drawText(`VERIFICATION_HASH: ${sessionId.substring(0, 24).toUpperCase()}`, { x: 175, y: vY - 20, size: 8, font: fontCourier, color: COLORS.neon });
    page6.drawText('THIS_DOSSIER_IS_NEURALLY_LINKED_TO_SUBJECT_DNA', { x: 175, y: vY - 35, size: 7, font: fontRegular, color: COLORS.gray });

    page6.drawText('PLAYERDNA // CYBER-PSYCHOLOGY LAB // PROJECT_AURORA', { x: 40, y: 50, size: 8, font: fontCourier, color: COLORS.gray });

    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes as any, { headers: { 'Content-Type': 'application/pdf' } });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// --- VISUAL ENGINE ---

function drawBaseLayer(page: PDFPage) {
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: COLORS.bg });
    for(let i=0; i<width; i+=25) {
        page.drawLine({ start: { x: i, y: 0 }, end: { x: i, y: height }, thickness: 0.2, color: COLORS.gray, opacity: 0.1 });
    }
    for(let i=0; i<height; i+=25) {
        page.drawLine({ start: { x: 0, y: i }, end: { x: width, y: i }, thickness: 0.2, color: COLORS.gray, opacity: 0.1 });
    }
}

function drawHUD(page: PDFPage, font: any, pageLabel: string) {
    const { width, height } = page.getSize();
    const m = 30;
    const l = 20;
    const color = COLORS.neon;
    page.drawLine({ start: { x: m, y: m }, end: { x: m+l, y: m }, thickness: 1, color });
    page.drawLine({ start: { x: m, y: m }, end: { x: m, y: m+l }, thickness: 1, color });
    page.drawLine({ start: { x: width-m, y: m }, end: { x: width-m-l, y: m }, thickness: 1, color });
    page.drawLine({ start: { x: width-m, y: m }, end: { x: width-m, y: m+l }, thickness: 1, color });
    page.drawLine({ start: { x: m, y: height-m }, end: { x: m+l, y: height-m }, thickness: 1, color });
    page.drawLine({ start: { x: m, y: height-m }, end: { x: m, y: height-m-l }, thickness: 1, color });
    page.drawLine({ start: { x: width-m, y: height-m }, end: { x: width-m-l, y: height-m }, thickness: 1, color });
    page.drawLine({ start: { x: width-m, y: height-m }, end: { x: width-m, y: height-m-l }, thickness: 1, color });
    page.drawText('PLAYER_DNA_SYSTEM_v2.4', { x: m + 10, y: height - m - 10, size: 6, font, color });
    page.drawText(`STATUS: SECURE // ${pageLabel}`, { x: width - m - 120, y: height - m - 10, size: 6, font, color });
}

function drawTechnicalBox(page: PDFPage, x: number, y: number, w: number, h: number, font: any, color: any = COLORS.neon) {
    page.drawRectangle({ x, y, width: w, height: h, borderColor: color, borderWidth: 1, opacity: 0.3 });
    page.drawRectangle({ x, y: y+h-15, width: 100, height: 15, color });
    page.drawText('SCAN_RESULT', { x: x + 5, y: y + h - 11, size: 7, font, color: COLORS.black });
}

function drawHeatmap(page: PDFPage, x: number, y: number, w: number, h: number) {
    for(let i=0; i<25; i++) {
        page.drawCircle({ 
            x: x + Math.random()*w, 
            y: y + Math.random()*h, 
            size: 15 + Math.random()*35, 
            color: COLORS.neon, 
            opacity: 0.04 
        });
    }
}

function drawGlowBar(page: PDFPage, x: number, y: number, w: number, h: number, p: number, color: any) {
    page.drawRectangle({ x, y, width: w, height: h, color: COLORS.dim });
    page.drawRectangle({ x, y, width: w * p, height: h, color });
}

function drawTechnicalWave(page: PDFPage, x: number, y: number, w: number, h: number, color: any) {
    let prev = { x, y: y + h/2 };
    for(let i=0; i<w; i+=8) {
        const next = { x: x + i, y: y + h/2 + Math.sin(i*0.09) * (h/4) * (Math.random()*0.3+0.7) };
        page.drawLine({ start: prev, end: next, thickness: 1, color, opacity: 0.6 });
        prev = next;
    }
}

function drawMetadataStream(page: PDFPage, x: number, y: number, h: number, font: any) {
    for(let i=0; i<h; i+=15) {
        const txt = Math.random().toString(16).substring(2, 5).toUpperCase();
        page.drawText(txt, { x, y: y + i, size: 5, font, color: COLORS.neon, opacity: 0.2 });
    }
}

function drawPremiumSeal(page: PDFPage, x: number, y: number, size: number, nick: string, fontB: any, fontC: any) {
    const cx = x + size/2;
    const cy = y + size/2;
    page.drawCircle({ x: cx, y: cy, size: size/2, borderColor: COLORS.neon, borderWidth: 3 });
    page.drawCircle({ x: cx, y: cy, size: size/2 - 12, borderColor: COLORS.neon, borderWidth: 1, opacity: 0.4 });
    const nt = nick.toUpperCase();
    const nw = fontB.widthOfTextAtSize(nt, 22);
    page.drawText(nt, { x: cx - nw/2, y: cy - 8, size: 22, font: fontB, color: COLORS.white });
    page.drawText('AUTHENTICATED', { x: cx - 35, y: cy + 50, size: 8, font: fontC, color: COLORS.neon });
}

function drawRadarChart(page: PDFPage, x: number, y: number, size: number, values: number[], labels: string[], color: any, fontB: any, fontC: any) {
    const n = values.length;
    const step = (Math.PI * 2) / n;
    const r = size / 2;
    for(let i=1; i<=4; i++) {
        const cr = (r/4)*i;
        for(let j=0; j<n; j++) {
            const a1 = j*step - Math.PI/2;
            const a2 = (j+1)*step - Math.PI/2;
            page.drawLine({ start: { x: x+cr*Math.cos(a1), y: y+cr*Math.sin(a1) }, end: { x: x+cr*Math.cos(a2), y: y+cr*Math.sin(a2) }, thickness: 0.5, color: COLORS.gray });
        }
    }
    const pts = values.map((v, i) => {
        const a = i*step - Math.PI/2;
        return { x: x + (v/100)*r*Math.cos(a), y: y + (v/100)*r*Math.sin(a) };
    });
    for(let i=0; i<n; i++) {
        page.drawLine({ start: pts[i], end: pts[(i+1)%n], thickness: 2, color });
        page.drawCircle({ x: pts[i].x, y: pts[i].y, size: 3, color });
        const la = i*step - Math.PI/2;
        page.drawText(labels[i], { x: x + (r+20)*Math.cos(la)-15, y: y + (r+20)*Math.sin(la), size: 7, font: fontC, color: COLORS.neon });
    }
}

function drawWrappedText(page: PDFPage, text: string, x: number, y: number, width: number, size: number, font: any, color: any) {
    const words = text.split(' ');
    let line = '';
    let cy = y;
    const max = width / (size * 0.55);
    words.forEach(w => {
        if((line + w).length < max) line += w + ' ';
        else {
            page.drawText(line.trim(), { x, y: cy, size, font, color });
            line = w + ' ';
            cy -= (size + 6);
        }
    });
    page.drawText(line.trim(), { x, y: cy, size, font, color });
}
