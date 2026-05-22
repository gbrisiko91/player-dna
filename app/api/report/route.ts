import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import { ARCHETYPES } from '@/lib/data';
import { translations } from '@/lib/translations';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
});

// Color Palette
const COLORS = {
  bg: rgb(0.02, 0.02, 0.03),
  black: rgb(0, 0, 0),
  white: rgb(0.95, 0.95, 0.98),
  neon: rgb(0, 0.8, 1),
  accent: rgb(0.7, 0.2, 1), // Purple-ish
  danger: rgb(0.9, 0.1, 0.1),
  gray: rgb(0.2, 0.2, 0.25),
  dim: rgb(0.1, 0.1, 0.12),
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
    const fontCourier = await pdfDoc.embedFont(StandardFonts.CourierBold); // For technical metadata

    // --- PAGE 1: THE DOSSIER COVER ---
    const page1 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page1);
    drawHUD(page1, fontCourier, '001/006');
    
    // Physical Folder Look
    page1.drawRectangle({ x: 40, y: 700, width: 300, height: 100, color: COLORS.dim, borderColor: COLORS.neon, borderWidth: 2 });
    page1.drawText('IDENTITY_ANALYSIS', { x: 50, y: 770, size: 24, font: fontBold, color: COLORS.white });
    page1.drawText('NEURAL_LOG: ' + sessionId.substring(0, 8).toUpperCase(), { x: 50, y: 750, size: 8, font: fontCourier, color: COLORS.neon });
    
    // Large "CLASSIFIED" stamp
    page1.drawText('CLASSIFIED', { x: 400, y: 750, size: 40, font: fontBold, color: COLORS.danger, opacity: 0.2, rotate: { type: 'degrees' as any, angle: -15 } as any });

    // Subject Identity
    page1.drawRectangle({ x: 40, y: 450, width: 515, height: 200, color: COLORS.black, opacity: 0.5 });
    page1.drawText('SUBJECT_ID:', { x: 60, y: 620, size: 10, font: fontCourier, color: COLORS.neon });
    page1.drawText(nickname.toUpperCase(), { x: 60, y: 570, size: 45, font: fontBold, color: COLORS.white });
    
    const arcName = lang === 'it' ? archetype.name_it.toUpperCase() : archetype.name.toUpperCase();
    page1.drawText('ARCHETYPE_DESIGNATION:', { x: 60, y: 530, size: 10, font: fontCourier, color: COLORS.neon });
    page1.drawText(arcName, { x: 60, y: 500, size: 25, font: fontBold, color: COLORS.accent });

    // Metadata streams
    drawMetadataStream(page1, 560, 100, 700, fontCourier);

    // --- PAGE 2: NEURAL PROFILE & MOTIVATION ---
    const page2 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page2);
    drawHUD(page2, fontCourier, '002/006');
    
    page2.drawText('01. NEURAL_CORE_MAPPING', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    const motivation = lang === 'it' ? archetype.motivation_it : archetype.motivation;
    drawTechnicalBox(page2, 40, 580, 515, 180, fontBold);
    drawWrappedText(page2, motivation, 60, 730, 480, 13, fontRegular, COLORS.white);
    
    // Glitchy heatmap visual
    drawHeatmap(page2, 40, 300, 515, 250);

    // --- PAGE 3: PSYCHOMETRIC MATRIX (RADAR) ---
    const page3 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page3);
    drawHUD(page3, fontCourier, '003/006');
    
    page3.drawText('02. PSYCHOMETRIC_MATRIX', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    const traits = [archetype.traits.ego, archetype.traits.clutch, archetype.traits.toxic, archetype.traits.tactics, archetype.traits.resilience];
    const labels = ['EGO', 'CLUTCH', 'TOXIC', 'TACTICS', 'RESIL'];
    drawRadarChart(page3, 297, 520, 180, traits, labels, COLORS.neon, fontBold);
    
    // Data Bars
    let barY = 320;
    labels.forEach((l, i) => {
        page3.drawText(l, { x: 100, y: barY, size: 10, font: fontCourier, color: COLORS.neon });
        drawGlowBar(page3, 180, barY - 2, 300, 12, traits[i] / 100, COLORS.neon);
        page3.drawText(`${traits[i]}%`, { x: 490, y: barY, size: 10, font: fontBold, color: COLORS.white });
        barY -= 35;
    });

    // --- PAGE 4: BEHAVIORAL SYNC & THREAT ---
    const page4 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page4);
    drawHUD(page4, fontCourier, '004/006');
    
    page4.drawText('03. BEHAVIORAL_STABILITY_SCAN', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    // Wave
    page4.drawText('NEURAL_OSCILLATION_IN_CLUTCH', { x: 60, y: 730, size: 10, font: fontCourier, color: COLORS.neon });
    drawTechnicalWave(page4, 40, 580, 515, 120, COLORS.neon);
    
    // Threat Level
    drawTechnicalBox(page4, 40, 350, 515, 150, fontBold, COLORS.danger);
    page4.drawText('THREAT_LEVEL: OMEGA_PROTOCOL', { x: 60, y: 470, size: 14, font: fontBold, color: COLORS.danger });
    const threatDesc = "Subject demonstrates extreme competitive variance. High probability of ranked dominance. Social toxicity levels are monitored but within 'lethal operator' parameters.";
    drawWrappedText(page4, threatDesc, 60, 440, 480, 11, fontRegular, COLORS.white);

    // --- PAGE 5: RARITY & PERFORMANCE ---
    const page5 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page5);
    drawHUD(page5, fontCourier, '005/006');
    
    page5.drawText('04. PERFORMANCE_RARITY_INDEX', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    // Big Rarity
    page5.drawText('TOP 2.7%', { x: 60, y: 600, size: 90, font: fontBold, color: COLORS.neon });
    page5.drawText('ELITE_TIER_PROFILE_DETECTED', { x: 65, y: 570, size: 14, font: fontBold, color: COLORS.white });
    
    // Optimization Columns
    page5.drawText('OPTIMIZATION_VECTORS:', { x: 60, y: 500, size: 10, font: fontCourier, color: COLORS.neon });
    drawTechnicalBox(page5, 40, 250, 515, 220, fontBold);
    const vecText = "1. Force late-game scenarios to exploit high CLUTCH index.\n2. Utilize EGO dominance to lead team communication.\n3. Minimize early-round biological stress to sustain peak mechanical performance.";
    drawWrappedText(page5, vecText, 60, 440, 480, 12, fontRegular, COLORS.white);

    // --- PAGE 6: OFFICIAL CERTIFICATION ---
    const page6 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page6);
    drawHUD(page6, fontCourier, '006/006');
    
    page6.drawText('05. OFFICIAL_NEURAL_VERIFICATION', { x: 40, y: 780, size: 18, font: fontBold, color: COLORS.white });
    
    // The Seal
    drawPremiumSeal(page6, 297 - 125, 400, 250, nickname, fontBold, fontCourier);
    
    // Verification Text
    const certY = 320;
    page6.drawText('CERTIFICATE_OF_AUTHENTICITY', { x: 150, y: certY, size: 14, font: fontBold, color: COLORS.white });
    page6.drawText(`VERIFICATION_HASH: ${sessionId.substring(0, 24).toUpperCase()}`, { x: 150, y: certY - 20, size: 8, font: fontCourier, color: COLORS.neon });
    page6.drawText('THIS_DOSSIER_IS_NEURALLY_LINKED_TO_SUBJECT_DNA', { x: 150, y: certY - 35, size: 7, font: fontRegular, color: COLORS.gray });

    // Footer
    page6.drawText('PLAYERDNA // CYBER-PSYCHOLOGY LAB // PROJECT_AURORA', { x: 40, y: 50, size: 8, font: fontCourier, color: COLORS.gray });

    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes as any, { headers: { 'Content-Type': 'application/pdf' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// --- NEW HIGH-END DRAWING HELPERS ---

function drawHUD(page: PDFPage, font: any, pageLabel: string) {
    const { width, height } = page.getSize();
    const margin = 30;
    
    // Corner brackets
    const cs = 20; // corner size
    page.drawLine({ start: { x: margin, y: margin + cs }, end: { x: margin, y: margin }, thickness: 2, color: COLORS.neon });
    page.drawLine({ start: { x: margin, y: margin }, end: { x: margin + cs, y: margin }, thickness: 2, color: COLORS.neon });
    
    page.drawLine({ start: { x: width - margin, y: margin + cs }, end: { x: width - margin, y: margin }, thickness: 2, color: COLORS.neon });
    page.drawLine({ start: { x: width - margin, y: margin }, end: { x: width - margin - cs, y: margin }, thickness: 2, color: COLORS.neon });
    
    page.drawLine({ start: { x: margin, y: height - margin - cs }, end: { x: margin, y: height - margin }, thickness: 2, color: COLORS.neon });
    page.drawLine({ start: { x: margin, y: height - margin }, end: { x: margin + cs, y: height - margin }, thickness: 2, color: COLORS.neon });
    
    page.drawLine({ start: { x: width - margin, y: height - margin - cs }, end: { x: width - margin, y: height - margin }, thickness: 2, color: COLORS.neon });
    page.drawLine({ start: { x: width - margin, y: height - margin }, end: { x: width - margin - cs, y: height - margin }, thickness: 2, color: COLORS.neon });

    // Technical Labels
    page.drawText('PLAYER_DNA_SYSTEM_v2.1', { x: margin + 25, y: height - margin - 10, size: 6, font, color: COLORS.neon });
    page.drawText('LATENCY: 14ms // SYNC: STABLE', { x: width - margin - 150, y: height - margin - 10, size: 6, font, color: COLORS.neon });
    page.drawText(`PAGE_UID: ${pageLabel}`, { x: width - margin - 60, y: margin + 5, size: 6, font, color: COLORS.neon });
}

function drawTechnicalBox(page: PDFPage, x: number, y: number, w: number, h: number, font: any, color: any = COLORS.neon) {
    page.drawRectangle({ x, y, width: w, height: h, borderColor: color, borderWidth: 1, opacity: 0.3 });
    // Tab header
    page.drawRectangle({ x, y: y + h - 15, width: 80, height: 15, color });
    page.drawText('METRIC_DATA', { x: x + 5, y: y + h - 11, size: 7, font, color: COLORS.black });
}

function drawHeatmap(page: PDFPage, x: number, y: number, w: number, h: number) {
    for(let i=0; i<30; i++) {
        const rx = Math.random() * w;
        const ry = Math.random() * h;
        const rw = Math.random() * 50;
        const rh = Math.random() * 50;
        page.drawEllipse({ x: x + rx, y: y + ry, xRadius: rw, yRadius: rh, color: COLORS.neon, opacity: 0.05 });
    }
}

function drawGlowBar(page: PDFPage, x: number, y: number, w: number, h: number, percent: number, color: any) {
    page.drawRectangle({ x, y, width: w, height: h, color: COLORS.dim });
    page.drawRectangle({ x, y, width: w * percent, height: h, color });
    // Add glow line
    page.drawLine({ start: { x, y: y + h }, end: { x: x + w * percent, y: y + h }, thickness: 1.5, color, opacity: 0.8 });
}

function drawTechnicalWave(page: PDFPage, x: number, y: number, w: number, h: number, color: any) {
    let prev = { x, y: y + h/2 };
    for(let i=0; i<w; i+=5) {
        const next = { x: x + i, y: y + h/2 + Math.sin(i * 0.1) * (h/3) * (Math.random() * 0.5 + 0.5) };
        page.drawLine({ start: prev, end: next, thickness: 1, color });
        prev = next;
    }
}

function drawMetadataStream(page: PDFPage, x: number, y: number, h: number, font: any) {
    for(let i=0; i<h; i+=12) {
        const hex = Math.random().toString(16).substring(2, 6).toUpperCase();
        page.drawText(hex, { x, y: y + i, size: 5, font, color: COLORS.neon, opacity: 0.3 });
    }
}

function drawPremiumSeal(page: PDFPage, x: number, y: number, size: number, nick: string, font: any, fontC: any) {
    const cx = x + size/2;
    const cy = y + size/2;
    
    // Outer Rings
    page.drawCircle({ x: cx, y: cy, radius: size/2, borderColor: COLORS.neon, borderWidth: 2 });
    page.drawCircle({ x: cx, y: cy, radius: size/2 - 10, borderColor: COLORS.neon, borderWidth: 0.5 });
    
    // Rotating segments look
    for(let a=0; a<360; a+=30) {
        const rad = a * Math.PI / 180;
        page.drawLine({ 
            start: { x: cx + (size/2 - 20) * Math.cos(rad), y: cy + (size/2 - 20) * Math.sin(rad) },
            end: { x: cx + (size/2) * Math.cos(rad), y: cy + (size/2) * Math.sin(rad) },
            thickness: 1, color: COLORS.neon 
        });
    }

    page.drawText('DNA_VERIFIED', { x: cx - 40, y: cy + 40, size: 10, font: fontC, color: COLORS.neon });
    page.drawText(nick.toUpperCase(), { x: cx - 60, y: cy - 10, size: 18, font, color: COLORS.white });
    page.drawText('OFFICIAL_AUTH', { x: cx - 40, y: cy - 50, size: 8, font: fontC, color: COLORS.neon });
}

// Reuse Radar, Background, WrappedText from previous but refined if needed
function drawBackground(page: PDFPage) {
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: COLORS.bg });
    // Subgrid
    for(let i=0; i<width; i+=25) {
        page.drawLine({ start: { x: i, y: 0 }, end: { x: i, y: height }, thickness: 0.2, color: COLORS.dim });
    }
    for(let i=0; i<height; i+=25) {
        page.drawLine({ start: { x: 0, y: i }, end: { x: width, y: i }, thickness: 0.2, color: COLORS.dim });
    }
}

function drawRadarChart(page: PDFPage, x: number, y: number, size: number, values: number[], labels: string[], color: any, font: any) {
    const numPoints = values.length;
    const angleStep = (Math.PI * 2) / numPoints;
    const radius = size / 2;

    for(let i=1; i<=4; i++) {
        const r = (radius / 4) * i;
        for(let j=0; j<numPoints; j++) {
            const a1 = j * angleStep - Math.PI/2;
            const a2 = (j+1) * angleStep - Math.PI/2;
            page.drawLine({ 
                start: { x: x + r * Math.cos(a1), y: y + r * Math.sin(a1) },
                end: { x: x + r * Math.cos(a2), y: y + r * Math.sin(a2) },
                thickness: 0.5, color: COLORS.gray
            });
        }
    }

    const points = values.map((v, i) => {
        const a = i * angleStep - Math.PI/2;
        const r = (v / 100) * radius;
        return { x: x + r * Math.cos(a), y: y + r * Math.sin(a) };
    });

    for(let i=0; i<numPoints; i++) {
        page.drawLine({ start: points[i], end: points[(i+1)%numPoints], thickness: 2, color });
        // Vertices
        page.drawCircle({ x: points[i].x, y: points[i].y, radius: 3, color });
    }
}

function drawWrappedText(page: PDFPage, text: string, x: number, y: number, width: number, size: number, font: any, color: any) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    const maxChars = width / (size * 0.55);

    words.forEach(word => {
        if ((line + word).length < maxChars) {
            line += word + ' ';
        } else {
            page.drawText(line.trim(), { x, y: currentY, size, font, color });
            line = word + ' ';
            currentY -= (size + 5);
        }
    });
    page.drawText(line.trim(), { x, y: currentY, size, font, color });
}
