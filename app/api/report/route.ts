import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import { ARCHETYPES } from '@/lib/data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
});

const COLORS = {
  bg: rgb(0.01, 0.01, 0.02),
  black: rgb(0, 0, 0),
  white: rgb(0.95, 0.95, 0.98),
  neon: rgb(0, 0.9, 1),
  accent: rgb(0.7, 0.2, 1),
  danger: rgb(0.9, 0.1, 0.2),
  gray: rgb(0.2, 0.2, 0.3),
  dim: rgb(0.05, 0.05, 0.08),
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
    const fontMono = await pdfDoc.embedFont(StandardFonts.CourierBold);

    // --- PAGE 1: CORE IDENTITY ---
    const page1 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page1);
    drawHUD(page1, fontMono, "DOSS_PAGE_01/02");

    // Header Info
    page1.drawText('NEURAL IDENTIFICATION DOSSIER', { x: 50, y: 780, size: 10, font: fontMono, color: COLORS.neon });
    page1.drawText('CONFIDENTIAL', { x: 450, y: 780, size: 10, font: fontMono, color: COLORS.danger });

    // Subject Identity
    page1.drawText('SUBJECT:', { x: 50, y: 740, size: 12, font: fontMono, color: COLORS.neon });
    page1.drawText(nickname.toUpperCase(), { x: 50, y: 700, size: 48, font: fontBold, color: COLORS.white });
    
    const arcName = lang === 'it' ? archetype.name_it.toUpperCase() : archetype.name.toUpperCase();
    page1.drawText('DESIGNATION:', { x: 50, y: 660, size: 10, font: fontMono, color: COLORS.neon });
    page1.drawText(arcName, { x: 50, y: 630, size: 28, font: fontBold, color: COLORS.accent });

    // Archetype Card Area
    drawTechBox(page1, 50, 420, 495, 180, fontMono, "NEURAL_CORE_ANALYSIS");
    const motivation = lang === 'it' ? archetype.motivation_it : archetype.motivation;
    drawWrappedText(page1, motivation, 70, 560, 455, 12, fontRegular, COLORS.white);

    // Radar Matrix
    page1.drawText('PSYCHOMETRIC_MATRIX:', { x: 50, y: 380, size: 10, font: fontMono, color: COLORS.neon });
    const traitValues = [archetype.traits.ego, archetype.traits.clutch, archetype.traits.toxic, archetype.traits.tactics, archetype.traits.resilience];
    const traitLabels = ['EGO', 'CLUTCH', 'TOXIC', 'TACTICS', 'RESIL'];
    drawRadarChart(page1, 180, 220, 180, traitValues, traitLabels, COLORS.neon, fontBold, fontMono);

    // Trait List next to Radar
    let traitY = 320;
    traitLabels.forEach((l, i) => {
        page1.drawText(`${l}: ${traitValues[i]}%`, { x: 400, y: traitY, size: 11, font: fontMono, color: COLORS.white });
        page1.drawRectangle({ x: 400, y: traitY - 10, width: 100, height: 4, color: COLORS.gray });
        page1.drawRectangle({ x: 400, y: traitY - 10, width: traitValues[i], height: 4, color: COLORS.neon });
        traitY -= 35;
    });

    // --- PAGE 2: ANALYTICS & VERIFICATION ---
    const page2 = pdfDoc.addPage([595.28, 841.89]);
    drawBaseLayer(page2);
    drawHUD(page2, fontMono, "DOSS_PAGE_02/02");

    // Global Stats
    page2.drawText('GLOBAL_POPULATION_RANKING', { x: 50, y: 780, size: 12, font: fontBold, color: COLORS.white });
    page2.drawText('TOP 2.7%', { x: 50, y: 710, size: 72, font: fontBold, color: COLORS.neon });
    page2.drawText('RARITY PERCENTILE DETECTED', { x: 55, y: 690, size: 10, font: fontMono, color: COLORS.white });

    // Optimization Vectors
    drawTechBox(page2, 50, 480, 495, 160, fontMono, "NEURAL_OPTIMIZATION_VECTORS");
    const recommendation = lang === 'it' 
        ? "1. Forza scenari di fine partita per sfruttare l'alto indice CLUTCH.\n2. Usa la dominanza EGO per guidare la comunicazione del team.\n3. Riduci lo stress biologico nei primi round per mantenere performance meccaniche di picco."
        : "1. Force late-game scenarios to exploit high CLUTCH index.\n2. Utilize EGO dominance to lead team communication.\n3. Minimize early-round biological stress to sustain peak mechanical performance.";
    drawWrappedText(page2, recommendation, 70, 600, 455, 11, fontRegular, COLORS.white);

    // Official Verification
    const sealSize = 180;
    drawComplexSeal(page2, 297, 300, sealSize, nickname, fontBold, fontMono);

    // Legal Clause
    const legalTitle = lang === 'it' ? "CERTIFICAZIONE NEURALE UFFICIALE" : "OFFICIAL NEURAL CERTIFICATION";
    const legalClause = lang === 'it'
        ? "Questo documento è un dossier di identità unico generato dal sistema PlayerDNA. La riproduzione o la falsificazione di questo certificato è severamente vietata secondo i protocolli di sicurezza neurale vigenti. Ogni copia non autorizzata verrà considerata nulla."
        : "This document is a unique generated identity dossier by PlayerDNA. Reproduction or falsification of this certificate is strictly prohibited under current neural security protocols. Any unauthorized copy will be considered void.";
    
    page2.drawText(legalTitle, { x: 50, y: 150, size: 10, font: fontBold, color: COLORS.white });
    drawWrappedText(page2, legalClause, 50, 135, 495, 8, fontRegular, COLORS.gray);

    // Footer metadata
    page2.drawText(`VER_ID: ${sessionId.substring(0, 16).toUpperCase()}`, { x: 50, y: 60, size: 7, font: fontMono, color: COLORS.gray });
    page2.drawText('AUTHENTICITY STATUS: VERIFIED BY PLAYERDNA LABS', { x: 300, y: 60, size: 7, font: fontMono, color: COLORS.neon });

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
    for(let i=0; i<width; i+=40) {
        for(let j=0; j<height; j+=40) {
            page.drawCircle({ x: i, y: j, size: 0.5, color: COLORS.gray, opacity: 0.2 });
        }
    }
}

function drawHUD(page: PDFPage, font: any, id: string) {
    const { width, height } = page.getSize();
    const m = 40;
    const l = 30;
    const color = COLORS.neon;
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

function drawComplexSeal(page: PDFPage, cx: number, cy: number, size: number, nick: string, fontB: any, fontM: any) {
    const r = size/2;
    page.drawCircle({ x: cx, y: cy, size: r, borderColor: COLORS.neon, borderWidth: 3 });
    page.drawCircle({ x: cx, y: cy, size: r-15, borderColor: COLORS.neon, borderWidth: 1, opacity: 0.5 });
    const nText = nick.toUpperCase();
    const nw = fontB.widthOfTextAtSize(nText, 22);
    page.drawText(nText, { x: cx - nw/2, y: cy - 8, size: 22, font: fontB, color: COLORS.white });
    page.drawText("VERIFIED_PLAYER", { x: cx - 40, y: cy + 50, size: 8, font: fontM, color: COLORS.neon });
    page.drawText("DNA_ORIGIN_ID", { x: cx - 35, y: cy - 60, size: 8, font: fontM, color: COLORS.neon });
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
    const words = text.split(' ');
    let line = '';
    let currY = y;
    const max = width / (size * 0.55);
    words.forEach(w => {
        if((line + w).length < max) line += w + ' ';
        else {
            page.drawText(line.trim(), { x, y: currY, size, font, color });
            line = w + ' ';
            currY -= (size + 6);
        }
    });
    page.drawText(line.trim(), { x, y: currY, size, font, color });
}
