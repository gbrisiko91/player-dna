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
  bg: rgb(0.01, 0.01, 0.01),
  black: rgb(0, 0, 0),
  white: rgb(1, 1, 1),
  neon: rgb(0, 0.95, 1),
  purple: rgb(0.66, 0.33, 1),
  danger: rgb(1, 0.29, 0.17),
  gray: rgb(0.3, 0.3, 0.3),
  lightGray: rgb(0.6, 0.6, 0.6),
  darkGray: rgb(0.1, 0.1, 0.1),
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
    const t = (translations as any)[lang || 'en'];
    
    const pdfDoc = await PDFDocument.create();
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // --- PAGE 1: COVER ---
    const page1 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page1);
    drawHeader(page1, 'NEURAL_DOSSIER_COVER', fontBold);
    
    // Large Title
    page1.drawText('PLAYER', { x: 50, y: 700, size: 60, font: fontBold, color: COLORS.white });
    page1.drawText('DNA', { x: 300, y: 700, size: 60, font: fontBold, color: COLORS.neon });
    
    // Subject Block
    drawClassifiedBox(page1, 50, 500, 350, 150, fontBold);
    page1.drawText('SUBJECT_IDENTITY:', { x: 70, y: 620, size: 10, font: fontBold, color: COLORS.neon });
    page1.drawText(nickname.toUpperCase(), { x: 70, y: 580, size: 30, font: fontBold, color: COLORS.white });
    page1.drawText(`ARCHETYPE: ${lang === 'it' ? archetype.name_it.toUpperCase() : archetype.name.toUpperCase()}`, { x: 70, y: 540, size: 12, font: fontBold, color: COLORS.white });
    
    // Seal
    drawSeal(page1, 420, 500, nickname, fontBold);
    
    // Bottom Warning
    page1.drawRectangle({ x: 0, y: 0, width: 595, height: 100, color: COLORS.black });
    page1.drawText('WARNING: CLASSIFIED INFORMATION. UNAUTHORIZED ACCESS IS PROHIBITED.', { x: 50, y: 50, size: 8, font: fontBold, color: COLORS.danger });
    page1.drawText('GEN_PROTOCOL: PlayerDNA_Neural_Engine_v8.2', { x: 50, y: 35, size: 6, font: fontRegular, color: COLORS.gray });

    // --- PAGE 2: NEURAL LANDSCAPE ---
    const page2 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page2);
    drawHeader(page2, 'SECTION_01 // NEURAL_LANDSCAPE', fontBold);
    
    page2.drawText('NEURAL_MAPPING_ANALYSIS', { x: 50, y: 750, size: 18, font: fontBold, color: COLORS.white });
    const analysis = lang === 'it' ? archetype.motivation_it : archetype.motivation;
    drawWrappedText(page2, analysis, 50, 720, 500, 12, fontRegular, COLORS.lightGray);
    
    // Decorative "Brain Scan" lines
    for(let i=0; i<10; i++) {
        page2.drawLine({
            start: { x: 50, y: 550 - (i*5) },
            end: { x: 50 + (Math.random() * 500), y: 550 - (i*5) },
            thickness: 0.5,
            color: COLORS.neon,
            opacity: 0.3
        });
    }
    
    // Threat Box
    drawClassifiedBox(page2, 50, 350, 500, 100, fontBold, COLORS.danger);
    page2.drawText('THREAT_CLASSIFICATION: OMEGA (HIGH_PRIORITY)', { x: 70, y: 410, size: 12, font: fontBold, color: COLORS.danger });
    page2.drawText('Behavioral patterns indicate high-risk predator behavior in competitive environments.', { x: 70, y: 380, size: 10, font: fontRegular, color: COLORS.white });

    // --- PAGE 3: PSYCHOLOGICAL RADAR ---
    const page3 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page3);
    drawHeader(page3, 'SECTION_02 // PSYCHOMETRIC_DATA', fontBold);
    
    page3.drawText('IDENTITY_RADAR_SCAN', { x: 50, y: 750, size: 18, font: fontBold, color: COLORS.white });
    drawRadarChart(page3, 297, 550, 150, [archetype.traits.ego, archetype.traits.clutch, archetype.traits.toxic, archetype.traits.tactics, archetype.traits.resilience], ['EGO', 'CLUTCH', 'TOXIC', 'TACTICS', 'RESILIENCE'], COLORS.neon, fontBold);
    
    // Traits description
    let traitY = 350;
    Object.entries(archetype.traits).forEach(([key, val]) => {
        page3.drawText(`${key.toUpperCase()}:`, { x: 100, y: traitY, size: 10, font: fontBold, color: COLORS.neon });
        page3.drawRectangle({ x: 200, y: traitY - 2, width: 250, height: 10, color: COLORS.darkGray });
        page3.drawRectangle({ x: 200, y: traitY - 2, width: (val/100) * 250, height: 10, color: COLORS.neon });
        page3.drawText(`${val}%`, { x: 460, y: traitY, size: 10, font: fontBold, color: COLORS.white });
        traitY -= 30;
    });

    // --- PAGE 4: COMBAT BEHAVIOR ---
    const page4 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page4);
    drawHeader(page4, 'SECTION_03 // COMBAT_PSYCHOLOGY', fontBold);
    
    page4.drawText('TACTICAL_EFFICIENCY_MATRIX', { x: 50, y: 750, size: 18, font: fontBold, color: COLORS.white });
    
    // Predator Index
    page4.drawText('PREDATOR_INDEX', { x: 50, y: 680, size: 14, font: fontBold, color: COLORS.danger });
    page4.drawRectangle({ x: 50, y: 650, width: 500, height: 20, color: COLORS.darkGray });
    page4.drawRectangle({ x: 50, y: 650, width: 450, height: 20, color: COLORS.danger });
    page4.drawText('92% - LETHAL', { x: 50, y: 630, size: 8, font: fontBold, color: COLORS.danger });

    // Wave graph simulation
    page4.drawText('CLUTCH_NEURAL_STABILITY', { x: 50, y: 550, size: 14, font: fontBold, color: COLORS.neon });
    drawNeuralWave(page4, 50, 450, 500, 80, COLORS.neon);

    // --- PAGE 5: TILT & EMOTIONAL ---
    const page5 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page5);
    drawHeader(page5, 'SECTION_04 // EMOTIONAL_PROFILE', fontBold);
    
    page5.drawText('MENTAL_RESILIENCE_SCAN', { x: 50, y: 750, size: 18, font: fontBold, color: COLORS.white });
    
    const tiltText = "Analysis indicates a high threshold for emotional interference. Subject maintains mechanical efficiency even during negative social stimuli (toxicity). Potential for leadership in crisis situations.";
    drawWrappedText(page5, tiltText, 50, 700, 500, 11, fontRegular, COLORS.lightGray);
    
    // Toxicity Spectrum
    page5.drawText('TOXICITY_SPECTRUM', { x: 50, y: 600, size: 12, font: fontBold, color: COLORS.white });
    for(let i=0; i<10; i++) {
        page5.drawRectangle({ x: 50 + (i*50), y: 570, width: 45, height: 10, color: i < 3 ? COLORS.neon : COLORS.darkGray });
    }
    page5.drawText('LEVEL: LOW (CONTROLLED)', { x: 50, y: 555, size: 8, font: fontBold, color: COLORS.neon });

    // --- PAGE 6: OPTIMIZATION ---
    const page6 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page6);
    drawHeader(page6, 'SECTION_05 // OPTIMIZATION_VECTORS', fontBold);
    
    page6.drawText('NEURAL_PERFORMANCE_VECTORS', { x: 50, y: 750, size: 18, font: fontBold, color: COLORS.white });
    
    const vec1Title = "VEC_01: ASYMMETRIC_ENGAGEMENT";
    const vec1Desc = "Leverage your high clutch coefficient by forcing late-round scenarios. Minimize early-round exposure to preserve neural focus for high-leverage moments.";
    page6.drawText(vec1Title, { x: 50, y: 700, size: 12, font: fontBold, color: COLORS.neon });
    drawWrappedText(page6, vec1Desc, 50, 680, 500, 10, fontRegular, COLORS.lightGray);

    const vec2Title = "VEC_02: LEADERSHIP_SYNC_PROTOCOL";
    const vec2Desc = "Your ego index suggests high confidence. Use this to stabilize teammates during losing streaks. Direct communication should be clinical and objective.";
    page6.drawText(vec2Title, { x: 50, y: 600, size: 12, font: fontBold, color: COLORS.neon });
    drawWrappedText(page6, vec2Desc, 50, 580, 500, 10, fontRegular, COLORS.lightGray);

    // --- PAGE 7: RARITY & GLOBAL ---
    const page7 = pdfDoc.addPage([595.28, 841.89]);
    drawBackground(page7);
    drawHeader(page7, 'SECTION_06 // GLOBAL_COMPARISON', fontBold);
    
    page7.drawText('POPULATION_RARITY_INDEX', { x: 50, y: 750, size: 18, font: fontBold, color: COLORS.white });
    
    page7.drawText('TOP 2.7%', { x: 50, y: 650, size: 80, font: fontBold, color: COLORS.neon });
    page7.drawText('OF ANALYZED POPULATION', { x: 50, y: 570, size: 14, font: fontBold, color: COLORS.white });
    
    drawClassifiedBox(page7, 50, 300, 500, 200, fontBold, COLORS.purple);
    page7.drawText('RARE PROFILE DETECTED', { x: 70, y: 460, size: 20, font: fontBold, color: COLORS.purple });
    drawWrappedText(page7, 'The subject belongs to an elite tier of psychological profiles capable of sustaining professional-grade neural load.', 70, 430, 460, 10, fontRegular, COLORS.white);

    // --- PAGE 8: FINAL VERIFICATION ---
    const page8 = pdfDoc.addPage([595.28, 841.89]);
    const { width: p8w } = page8.getSize();
    drawBackground(page8);
    drawHeader(page8, 'SECTION_07 // FINAL_VERIFICATION', fontBold);
    
    drawSeal(page8, 197, 450, nickname, fontBold, 200);
    
    page8.drawText('SCAN_AUTHENTICITY_CONFIRMED', { x: p8w/2 - 100, y: 400, size: 12, font: fontBold, color: COLORS.neon });
    page8.drawText(`CERTIFICATE_ID: ${sessionId?.substring(0, 12).toUpperCase()}`, { x: p8w/2 - 100, y: 380, size: 8, font: fontBold, color: COLORS.white });
    
    page8.drawText('NO_HUMAN_MODIFICATION_DETECTED', { x: p8w/2 - 100, y: 360, size: 8, font: fontBold, color: COLORS.gray });
    
    page8.drawText('RECOMMENDED_RESCAN_DATE: 2026-06-22', { x: 50, y: 150, size: 10, font: fontBold, color: COLORS.white });
    
    // Final Footer
    const footerText = 'CONFIDENTIAL PLAYERDNA DOSSIER // GENERATED BY NEURAL_ENGINE_S26';
    const footerWidth = fontBold.widthOfTextAtSize(footerText, 8);
    page8.drawText(footerText, { x: p8w/2 - footerWidth/2, y: 50, size: 8, font: fontBold, color: COLORS.gray });

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    console.error('PDF Generation Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// --- HELPER DRAWING FUNCTIONS ---

function drawBackground(page: PDFPage) {
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: COLORS.bg });
    // Grids
    for(let i=0; i<width; i+=50) {
        page.drawLine({ start: { x: i, y: 0 }, end: { x: i, y: height }, thickness: 0.5, color: COLORS.darkGray });
    }
    for(let i=0; i<height; i+=50) {
        page.drawLine({ start: { x: 0, y: i }, end: { x: width, y: i }, thickness: 0.5, color: COLORS.darkGray });
    }
}

function drawHeader(page: PDFPage, text: string, font: any) {
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: height - 40, width, height: 40, color: COLORS.black });
    page.drawText(text, { x: 40, y: height - 25, size: 8, font, color: COLORS.neon });
}

function drawClassifiedBox(page: PDFPage, x: number, y: number, w: number, h: number, font: any, color: any = COLORS.gray) {
    page.drawRectangle({ x, y, width: w, height: h, borderColor: color, borderWidth: 1 });
    page.drawText('CLASSIFIED', { x: x + 5, y: y + h - 10, size: 6, font, color });
}

function drawSeal(page: PDFPage, x: number, y: number, nick: string, font: any, size: number = 130) {
    page.drawRectangle({ x, y, width: size, height: size, borderColor: COLORS.neon, borderWidth: 1 });
    page.drawRectangle({ x: x+5, y: y+5, width: size-10, height: size-10, borderColor: COLORS.neon, borderWidth: 0.5 });
    page.drawText('PLAYERDNA_VERIFIED', { x: x + 10, y: y + size - 20, size: 8, font, color: COLORS.neon });
    
    // QR Simulation
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            if(Math.random() > 0.4) {
                page.drawRectangle({ x: x + (size/4) + (i*10), y: y + (size/4) + (j*10), width: 8, height: 8, color: COLORS.neon });
            }
        }
    }
    page.drawText(nick.toUpperCase(), { x: x, y: y + 20, size: 10, font, color: COLORS.white, width: size, align: 'center' as any });
}

function drawRadarChart(page: PDFPage, x: number, y: number, size: number, values: number[], labels: string[], color: any, font: any) {
    const numPoints = values.length;
    const angleStep = (Math.PI * 2) / numPoints;
    const radius = size / 2;

    // Draw axes & pentagon background
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

    // Labels
    labels.forEach((l, i) => {
        const a = i * angleStep - Math.PI/2;
        page.drawText(l, { x: x + (radius + 15) * Math.cos(a) - 20, y: y + (radius + 15) * Math.sin(a), size: 6, font, color: COLORS.lightGray });
    });

    // Data Shape
    const points: { x: number, y: number }[] = values.map((v, i) => {
        const a = i * angleStep - Math.PI/2;
        const r = (v / 100) * radius;
        return { x: x + r * Math.cos(a), y: y + r * Math.sin(a) };
    });

    for(let i=0; i<numPoints; i++) {
        page.drawLine({ 
            start: points[i], 
            end: points[(i+1)%numPoints], 
            thickness: 2, color 
        });
    }
}

function drawNeuralWave(page: PDFPage, x: number, y: number, w: number, h: number, color: any) {
    let prevPoint = { x, y: y + h/2 };
    for(let i=0; i<=w; i+=10) {
        const wave = Math.sin(i * 0.05) * (h/3) + (Math.random() * 10);
        const nextPoint = { x: x + i, y: y + h/2 + wave };
        page.drawLine({ start: prevPoint, end: nextPoint, thickness: 1, color });
        prevPoint = nextPoint;
    }
}

function drawWrappedText(page: PDFPage, text: string, x: number, y: number, width: number, size: number, font: any, color: any, options: any = {}) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    const maxChars = width / (size * 0.5);

    words.forEach(word => {
        if ((line + word).length < maxChars) {
            line += word + ' ';
        } else {
            page.drawText(line.trim(), { x, y: currentY, size, font, color, ...options });
            line = word + ' ';
            currentY -= (size + 5);
        }
    });
    page.drawText(line.trim(), { x, y: currentY, size, font, color, ...options });
}
