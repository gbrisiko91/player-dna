const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margin: 50
});

doc.pipe(fs.createWriteStream('Sample_PlayerDNA_Premium_Report.pdf'));

// Background color (Dark)
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#030303');

// Header
doc.fillColor('#00f2ff')
   .font('Helvetica-Bold')
   .fontSize(10)
   .text('NEURAL_SCAN_PROTOCOL_v4.2', 50, 40);

doc.rect(50, 55, 500, 1).fill('#00f2ff');

// Title
doc.fillColor('#ffffff')
   .fontSize(40)
   .text('PLAYER', 50, 80)
   .fillColor('#00f2ff')
   .text('DNA', 220, 80);

doc.fillColor('#ffffff')
   .fontSize(14)
   .text('PREMIUM_NEURAL_DOSSIER', 50, 130);

// Subject Info
doc.rect(50, 160, 500, 100).strokeColor('#333333').stroke();
doc.fillColor('#666666')
   .fontSize(8)
   .text('SUBJECT_IDENTIFIER:', 70, 175)
   .text('SCAN_TIMESTAMP:', 70, 195)
   .text('ARCHETYPE_DETECTION:', 70, 215)
   .text('CONFIDENTIALITY_LEVEL:', 70, 235);

doc.fillColor('#ffffff')
   .fontSize(10)
   .text('SUBJECT_779438', 200, 175)
   .text('2026-05-22_20:45_GMT+2', 200, 195)
   .fillColor('#00f2ff')
   .text('CLUTCH DEMON', 200, 215)
   .fillColor('#ff4b2b')
   .text('MAXIMUM_CONFIDENTIAL', 200, 235);

// Main Section: The Psyche
doc.fillColor('#ffffff')
   .fontSize(20)
   .text('NEURAL_LANDSCAPE_ANALYSIS', 50, 280);

doc.fillColor('#cccccc')
   .fontSize(12)
   .text('Your neural map shows extreme stability under high-pressure spikes. While others experience cognitive collapse during high-intensity scenarios (1v3, 1v5), your pre-frontal cortex focus actually sharpens, reducing mechanical error by 24.5% compared to the baseline.', 50, 310, { width: 500, align: 'left' });

// Traits Table
doc.rect(50, 400, 500, 180).strokeColor('#333333').stroke();
const traits = [
  { label: 'EGO_INDEX', val: 65, color: '#ffffff' },
  { label: 'CLUTCH_COEFFICIENT', val: 98, color: '#00f2ff' },
  { label: 'TOXICITY_LEVEL', val: 20, color: '#ff4b2b' },
  { label: 'TACTICAL_EFFICIENCY', val: 70, color: '#a18cd1' },
  { label: 'RESILIENCE_RATING', val: 95, color: '#f6d365' }
];

let y = 420;
traits.forEach(t => {
  doc.fillColor('#999999').fontSize(8).text(t.label, 70, y);
  
  // Bar background
  doc.rect(200, y - 2, 250, 8).fill('#1a1a1a');
  // Bar fill
  doc.rect(200, y - 2, (t.val / 100) * 250, 8).fill(t.color);
  
  doc.fillColor(t.color).text(`${t.val}%`, 460, y);
  y += 30;
});

// Strategic Advice
doc.fillColor('#ffffff')
   .fontSize(16)
   .text('OPTIMIZATION_VECTORS', 50, 600);

doc.fillColor('#00f2ff')
   .fontSize(10)
   .text('VECTOR_01: DELAYED_ENGAGEMENT', 50, 630);
doc.fillColor('#999999')
   .text('As a Clutch Demon, your value increases as the round time decreases. Let your teammates create the initial chaos while you preserve your utility for the final 30 seconds.', 50, 645, { width: 500 });

doc.fillColor('#00f2ff')
   .fontSize(10)
   .text('VECTOR_02: NEURAL_MUTE_PROTOCOL', 50, 680);
doc.fillColor('#999999')
   .text('High-intensity scenarios require 0% auditory interference. Use the "Clutch Key" to mute teammates during 1vX situations to maintain your stability peak.', 50, 695, { width: 500 });

// Footer
doc.rect(50, 750, 500, 1).fill('#333333');
doc.fillColor('#555555')
   .fontSize(7)
   .text('© 2026 PLAYERDNA_NEURAL_LABS // ALL RIGHTS RESERVED // VERIFIED_SCAN_DATA', 50, 765, { align: 'center' });

doc.end();
console.log('PDF Generated successfully.');
