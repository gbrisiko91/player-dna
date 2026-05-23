import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generatePDF } from '@/lib/pdf-service';
import Stripe from 'stripe';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shareToken = searchParams.get('share_token');

  if (!shareToken) return new Response(JSON.stringify({ error: 'Missing token' }), { status: 400 });

  try {
    // 1. Verifica nel DB se il report è premium
    const { data: result, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('share_token', shareToken)
      .single();

    if (!result || error) return new Response(JSON.stringify({ error: 'Result not found' }), { status: 404 });
    if (!result.is_premium) return new Response(JSON.stringify({ error: 'Premium not purchased' }), { status: 403 });

    // 2. Generazione PDF dai dati salvati
    const pdfBytes = await generatePDF({
      archetype_id: result.archetype_slug, // generatePDF ora cerca sia per ID che per Slug
      lang: 'it', // Potrebbe essere salvato nel DB in futuro
      nickname: result.nickname,
      id: `DL-${result.share_token}`
    });

    return new Response(pdfBytes as any, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="PlayerDNA_Premium_Report_${result.nickname}.pdf"`,
        },
    });
  } catch (err: any) {
    console.error('Download error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
