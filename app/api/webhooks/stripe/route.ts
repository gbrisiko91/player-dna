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
    
    try {
      const { supabase } = await import('@/lib/supabase');

      // 1. Aggiorna subito il database per sbloccare l'accesso premium
      if (share_token) {
        await supabase
          .from('quiz_results')
          .update({ is_premium: true })
          .eq('share_token', share_token);
      }

      // 2. Genera il PDF
      const pdfBytes = await generatePDF({
        archetype_id,
        lang,
        nickname,
        id: session.id
      });

      // 3. Carica il PDF su Supabase Storage (Cache)
      let pdfUrl = '';
      if (share_token) {
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('reports')
          .upload(`${share_token}.pdf`, pdfBytes, {
            contentType: 'application/pdf',
            upsert: true
          });

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage.from('reports').getPublicUrl(`${share_token}.pdf`);
          pdfUrl = publicUrl;
          
          // Salva l'URL nel DB
          await supabase
            .from('quiz_results')
            .update({ pdf_url: pdfUrl })
            .eq('share_token', share_token);
        } else {
          console.error('Storage upload error:', uploadError);
        }
      }

      // 4. Invia l'email con l'allegato
      await sendPremiumEmail(session, pdfBytes);
      
      console.log(`Webhook processed successfully for session ${session.id}`);
    } catch (error) {
      console.error('Failed to process post-checkout actions:', error);
    }
  }

  return NextResponse.json({ received: true });
}
