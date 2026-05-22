const PDFDocument = require('pdfkit');
const fs = require('fs');

// Helper to draw a radar chart
function drawRadarChart(doc, x, y, size, values, labels, color) {
  const numPoints = values.length;
  const angleStep = (Math.PI * 2) / numPoints;
  const radius = size / 2;

  // Draw background pentagon
  doc.strokeColor('#333333').lineWidth(1).dash(2, { space: 2 });
  for (let i = 1; i <= 4; i++) {
    const r = (radius / 4) * i;
    doc.moveTo(x + r * Math.cos(-Math.PI / 2), y + r * Math.sin(-Math.PI / 2));
    for (let j = 1; j <= numPoints; j++) {
      const angle = j * angleStep - Math.PI / 2;
      doc.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
    }
    doc.stroke();
  }
  doc.undash();

  // Draw axes
  doc.strokeColor('#222222').lineWidth(0.5);
  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep - Math.PI / 2;
    doc.moveTo(x, y).lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle)).stroke();
    
    // Labels
    const labelX = x + (radius + 15) * Math.cos(angle);
    const labelY = y + (radius + 15) * Math.sin(angle);
    doc.fillColor('#666666').fontSize(6).text(labels[i], labelX - 30, labelY, { width: 60, align: 'center' });
  }

  // Draw data shape
  doc.moveTo(x + (values[0] / 100) * radius * Math.cos(-Math.PI / 2), y + (values[0] / 100) * radius * Math.sin(-Math.PI / 2));
  for (let i = 1; i < numPoints; i++) {
    const angle = i * angleStep - Math.PI / 2;
    doc.lineTo(x + (values[i] / 100) * radius * Math.cos(angle), y + (values[i] / 100) * radius * Math.sin(angle));
  }
  doc.closePath().fillColor(color).opacity(0.3).fill().opacity(1).strokeColor(color).lineWidth(2).stroke();
}

// Helper to draw a digital wave (Neural Stability)
function drawNeuralWave(doc, x, y, width, height, color) {
  doc.moveTo(x, y + height / 2);
  doc.strokeColor(color).lineWidth(1.5);
  for (let i = 0; i <= width; i += 5) {
    const wave = Math.sin(i * 0.1) * (height / 4) + (Math.random() * 10 - 5);
    doc.lineTo(x + i, y + height / 2 + wave);
  }
  doc.stroke();
  
  // Add some digital "glitch" bars
  doc.rect(x + width * 0.7, y, 2, height).fill(color).opacity(0.5);
  doc.rect(x + width * 0.75, y + 10, 10, 2).fill(color).opacity(0.5);
  doc.opacity(1);
}

const doc = new PDFDocument({
  size: 'A4',
  margin: 0
});

const outputName = 'PREMIUM_DOSSIER_SUBJECT_779438.pdf';
doc.pipe(fs.createWriteStream(outputName));

// BACKGROUND
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#030303');

// MARGINALIA & HUD OVERLAY
doc.strokeColor('#111111').lineWidth(0.5);
for (let i = 0; i < 20; i++) {
  doc.moveTo(0, i * 50).lineTo(doc.page.width, i * 50).stroke();
  doc.moveTo(i * 50, 0).lineTo(i * 50, doc.page.height).stroke();
}

// --- HEADER ---
doc.rect(0, 0, doc.page.width, 60).fill('#000000');
doc.fillColor('#00f2ff').font('Helvetica-Bold').fontSize(8)
   .text('CLASSIFIED_DOSSIER // NEURAL_SCAN_UNIT_09', 40, 25);
doc.fillColor('#ff4b2b').fontSize(8)
   .text('STATUS: TOP_SECRET // ACCESS_RESTRICTED', 400, 25, { align: 'right', width: 150 });
doc.rect(40, 45, 515, 1).fill('#222222');

// --- MAIN TITLE & BRANDING ---
doc.fillColor('#ffffff').fontSize(35).text('PLAYER', 40, 80);
doc.fillColor('#00f2ff').text('DNA', 205, 80);
doc.fillColor('#444444').fontSize(7).text('GAMER_PSYCHOLOGY_LABS_v8.2.0', 40, 120);

// --- THE SEAL (CERTIFICATION) ---
const sealX = 400;
const sealY = 80;
doc.rect(sealX, sealY, 150, 150).strokeColor('#00f2ff').lineWidth(1).stroke();
doc.rect(sealX + 5, sealY + 5, 140, 140).strokeColor('#00f2ff').lineWidth(0.5).dash(5, { space: 3 }).stroke().undash();

doc.fillColor('#00f2ff').fontSize(6).text('OFFICIAL_VERIFICATION', sealX + 10, sealY + 15, { align: 'center', width: 130 });
doc.fontSize(10).text('VERIFIED_SEAL', sealX + 10, sealY + 30, { align: 'center', width: 130 });

// Drawing a QR-like aesthetic
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    if (Math.random() > 0.4) {
      doc.rect(sealX + 45 + i*15, sealY + 50 + j*15, 10, 10).fill('#00f2ff');
    }
  }
}

doc.fillColor('#ffffff').fontSize(5)
   .text('SCAN_ID: PDNA-S7-8821-XQ', sealX + 10, sealY + 120, { align: 'center', width: 130 })
   .text('AUTHENTICITY: NEURAL_MATCH_100%', sealX + 10, sealY + 130, { align: 'center', width: 130 })
   .text('TIMESTAMP: 2026-05-22_20:42', sealX + 10, sealY + 140, { align: 'center', width: 130 });

// --- SUBJECT OVERVIEW ---
doc.fillColor('#00f2ff').fontSize(12).text('SUBJECT_01_IDENTITY', 40, 160);
doc.rect(40, 175, 340, 80).fill('#0a0a0a').strokeColor('#222222').stroke();

doc.fillColor('#666666').fontSize(7)
   .text('PRIMARY_ARCHETYPE:', 55, 190)
   .text('THREAT_CLASSIFICATION:', 55, 205)
   .text('RARITY_INDEX:', 55, 220)
   .text('SEASON_SYNC:', 55, 235);

doc.fillColor('#ffffff').fontSize(9)
   .text('CLUTCH DEMON', 180, 190)
   .fillColor('#ff4b2b').text('OMEGA (CRITICAL_ANOMALY)', 180, 205)
   .fillColor('#00f2ff').text('TOP_3%_GLOBAL_POPULATION', 180, 220)
   .fillColor('#ffffff').text('S26_QUANTUM_LEAGUE', 180, 235);

// --- NEURAL LANDSCAPE ---
doc.fillColor('#ffffff').fontSize(14).text('PSYCHOLOGICAL_ANALYSIS', 40, 280);
doc.fillColor('#888888').fontSize(9).text('The subject demonstrates abnormal neural stabilization during high-pressure combat spikes. While standard neural maps indicate cognitive collapse during 1vX scenarios, the subject\'s focus metrics sharpens by 42%. Pre-frontal cortex activity overrides standard panic loops, enabling surgical precision when the objective is at risk.', 40, 305, { width: 340, lineGap: 4 });

// --- RADAR CHART (BIOMETRIC GRAPHICS) ---
drawRadarChart(doc, 475, 350, 120, [65, 98, 20, 70, 95], ['EGO', 'CLUTCH', 'TOXIC', 'TACTICS', 'RESILIENCE'], '#00f2ff');

// --- NEURAL STABILITY GRAPH ---
doc.fillColor('#ffffff').fontSize(10).text('NEURAL_STABILITY_MONITOR [HEART_RATE_SYNC]', 40, 420);
doc.rect(40, 435, 340, 100).fill('#050505').strokeColor('#1a1a1a').stroke();
drawNeuralWave(doc, 50, 445, 320, 80, '#00f2ff');

// --- METRICS BARS (The Stats) ---
doc.fillColor('#ffffff').fontSize(10).text('BIOMETRIC_METRICS', 400, 450);
const metrics = [
  { l: 'COMBAT_PSYCHE', v: 94, c: '#00f2ff' },
  { l: 'PREDATOR_INDEX', v: 88, c: '#ff4b2b' },
  { l: 'EMOTIONAL_DAMPING', v: 92, c: '#a18cd1' },
  { l: 'REACTION_LATENCY', v: 12, c: '#ffffff' }
];

let metricY = 475;
metrics.forEach(m => {
  doc.fillColor('#555555').fontSize(6).text(m.l, 400, metricY);
  doc.rect(400, metricY + 8, 150, 4).fill('#111111');
  doc.rect(400, metricY + 8, (m.v / 100) * 150, 4).fill(m.c);
  metricY += 25;
});

// --- OPTIMIZATION VECTORS ---
doc.fillColor('#ffffff').fontSize(12).text('NEURAL_OPTIMIZATION_VECTORS', 40, 560);
doc.rect(40, 575, 515, 120).strokeColor('#1a1a1a').stroke();

const vectors = [
  { h: 'VEC_01: DELAYED_KINETIC_ENGAGEMENT', d: 'The subject\'s value peaks as round time decreases. Recommend preserving utility for the < 30s window where neural edge is maximized.' },
  { h: 'VEC_02: COGNITIVE_SILENCE_PROTOCOL', d: 'External auditory stimuli from "teammates" may cause 4-8% focus degradation. Activate "Neural Mute" during 1vX scenarios.' }
];

let vecY = 595;
vectors.forEach(v => {
  doc.fillColor('#00f2ff').fontSize(8).text(v.h, 60, vecY);
  doc.fillColor('#666666').fontSize(8).text(v.d, 60, vecY + 12, { width: 470 });
  vecY += 45;
});

// --- DATA SUMMARY ---
doc.fillColor('#ffffff').fontSize(8).text('NEXT_SCAN_RECOMMENDED: 2026-06-22', 40, 720);
doc.fillColor('#444444').fontSize(8).text('MATCH_DATA_SYNC: VERIFIED // NO_HUMAN_MODIFICATION_DETECTED', 300, 720, { align: 'right', width: 255 });

// --- FOOTER ---
doc.rect(0, 770, doc.page.width, 72).fill('#000000');
doc.fillColor('#222222').fontSize(7).text('CONFIDENTIAL PLAYERDNA DOSSIER // UNAUTHORIZED DISTRIBUTION DISCOURAGED', 0, 790, { align: 'center', width: doc.page.width });
doc.text('GENERATED BY PLAYERDNA NEURAL ENGINE // ASYNC_CORE_v4', 0, 805, { align: 'center', width: doc.page.width });

doc.end();
console.log('Premium Dossier generated.');
