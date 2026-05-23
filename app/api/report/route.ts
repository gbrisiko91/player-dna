import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generatePDF } from '@/lib/pdf-service';
import { ARCHETYPES } from '@/lib/data';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) return new Response(JSON.stringify({ error: 'Missing session' }), { status: 400 });

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return new Response(JSON.stringify({ error: 'Not paid' }), { status: 403 });

    const { archetype_id, lang, nickname } = session.metadata as any;

    const pdfBytes = await generatePDF({
      archetype_id,
      lang,
      nickname,
      id: session.id
    });

    return new Response(pdfBytes as any, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="PlayerDNA_Dossier_${nickname}.pdf"`,
        },
    });
  } catch (err: any) {
    console.error('PDF error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
