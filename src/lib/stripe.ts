import Stripe from "stripe";

/**
 * Singleton Stripe instance using the secret key and latest API version.
 * Only used server-side — never expose this to the client.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});
