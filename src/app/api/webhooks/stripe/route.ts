import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

/**
 * POST /api/webhooks/stripe
 * Listens for Stripe events and records completed orders in Supabase.
 * Requires STRIPE_WEBHOOK_SECRET in .env.local.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // If no webhook secret is configured yet, acknowledge and skip (dev mode)
  if (!webhookSecret) {
    console.warn("[Webhook] STRIPE_WEBHOOK_SECRET not set — skipping verification.");
    return NextResponse.json({ received: true });
  }

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("[Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle checkout completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const supabase = await createClient();

      // Generate a human-readable order number using the DB sequence
      const { data: seqData } = await supabase.rpc("nextval", {
        sequence_name: "order_number_seq",
      });

      const orderNumber = `PU-${String(seqData ?? Date.now()).padStart(5, "0")}`;

      const { error } = await supabase.from("orders").insert({
        order_number: orderNumber,
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email ?? null,
        customer_name: session.customer_details?.name ?? null,
        total_amount: (session.amount_total ?? 0) / 100, // convert cents → dollars
        status: "paid",
        shipping_address: null,
      });

      if (error) {
        console.error("[Webhook] Failed to insert order:", error);
        return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
      }

      console.log(`[Webhook] Order ${orderNumber} recorded for session ${session.id}`);
    } catch (err) {
      console.error("[Webhook] Unexpected error:", err);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
