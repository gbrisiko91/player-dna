import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generatePDF, sendPremiumEmail } from '@/lib/pdf-service';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
});

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const stripe = getStripe();
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret!);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { share_token, archetype_id, lang, nickname } = session.metadata as any;
    
    // Genera il PDF e invia l'email in background
    try {
      const pdfBytes = await generatePDF({
        archetype_id,
        lang,
        nickname,
        id: session.id
      });
      await sendPremiumEmail(session, pdfBytes);
      
      // Aggiorna il database per segnare il report come premium
      if (share_token) {
        const { supabase } = await import('@/lib/supabase');
        await supabase
          .from('quiz_results')
          .update({ is_premium: true })
          .eq('share_token', share_token);
      }
      
      console.log(`Email sent and DB updated for session ${session.id}`);
    } catch (error) {
      console.error('Failed to process post-checkout actions:', error);
    }
  }

  return NextResponse.json({ received: true });
}
