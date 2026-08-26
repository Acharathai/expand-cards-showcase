/**
 * Single source of truth for the checkout wrapper timing.
 * The wrapper stays visible for this long while the session is prepared.
 */
export const WRAPPER_DURATION_MS = 4500;

/** Duration of the fade/slide transition out of the wrapper. */
export const EXIT_DURATION_MS = 420;

/** Fallback destination when no checkout URL is supplied via `?next=`. */
export const DEFAULT_CHECKOUT_URL = "/order";
