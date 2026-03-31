import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CartItem {
  id: string;
  name: string;
  price: number; // in dollars
  quantity: number;
  image?: string;
}

/**
 * POST /api/checkout
 * Creates a Stripe Checkout Session from the cart items sent by the client.
 * Redirects to Stripe-hosted payment page on success.
 */
export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Build line items for Stripe Checkout
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // Pass image only if it's a valid absolute URL (Stripe requires HTTPS)
          ...(item.image?.startsWith("https://") && {
            images: [item.image],
          }),
        },
        // Stripe uses cents
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Restrict to US shipping
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      // Add shipping rate — free shipping
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Stripe Checkout Error]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
