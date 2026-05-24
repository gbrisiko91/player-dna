const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
// fetch is global in Node 18+

async function testPDF() {
    console.log('Starting PDF Generation Test (New Engine)...');
    
    try {
        const pdfDoc = await PDFDocument.create();
        
        // Font loading simulation
        const fontUrls = {
            bold: 'https://github.com/google/fonts/raw/main/ofl/orbitron/Orbitron%5Bwght%5D.ttf',
            regular: 'https://github.com/google/fonts/raw/main/ofl/orbitron/Orbitron%5Bwght%5D.ttf'
        };

        let fontBold, fontRegular;

        console.log('Attempting to load Orbitron-Bold...');
        try {
            const resp = await fetch(fontUrls.bold);
            if (!resp.ok) throw new Error(`Failed to fetch font: ${resp.statusText}`);
            const fontBytes = await resp.arrayBuffer();
            fontBold = await pdfDoc.embedFont(fontBytes);
            console.log('Successfully loaded Orbitron-Bold');
        } catch (err) {
            console.warn('Could not load Orbitron-Bold, falling back to Helvetica-Bold:', err.message);
            fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        }

        console.log('Attempting to load Orbitron-Regular...');
        try {
            const resp = await fetch(fontUrls.regular);
            if (!resp.ok) throw new Error(`Failed to fetch font: ${resp.statusText}`);
            const fontBytes = await resp.arrayBuffer();
            fontRegular = await pdfDoc.embedFont(fontBytes);
            console.log('Successfully loaded Orbitron-Regular');
        } catch (err) {
            console.warn('Could not load Orbitron-Regular, falling back to Helvetica:', err.message);
            fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
        }

        const page = pdfDoc.addPage([595.28, 841.89]);
        const { width, height } = page.getSize();

        page.drawRectangle({
            x: 0,
            y: 0,
            width,
            height,
            color: rgb(0.01, 0.01, 0.02)
        });

        page.drawText('TEST NEURAL DOSSIER', {
            x: 50,
            y: height - 100,
            size: 30,
            font: fontBold,
            color: rgb(0, 0.85, 1)
        });

        page.drawText('Font: Orbitron (New Engine)', {
            x: 50,
            y: height - 150,
            size: 15,
            font: fontRegular,
            color: rgb(1, 1, 1)
        });

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync('TEST_NEW_ENGINE_OUTPUT.pdf', pdfBytes);
        console.log('Test PDF generated: TEST_NEW_ENGINE_OUTPUT.pdf');
        
        return { success: true, fontLoaded: !!fontBold && fontBold.name.includes('Orbitron') };
    } catch (err) {
        console.error('PDF Generation Error:', err);
        return { success: false, error: err.message };
    }
}

testPDF().then(res => console.log('Result:', JSON.stringify(res)));
