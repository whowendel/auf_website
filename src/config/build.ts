/**
 * Build and deployment constants.
 * Values below are resolved at startup from env; defaults are provided for local dev.
 */

export const BUILD_VARIANT = process.env.BUILD_VARIANT ?? "full";
export const SYNC_CHANNEL = process.env.SYNC_CHANNEL ?? "stable";
export const BUILD_TARGET = process.env.BUILD_TARGET ?? "web";

/**
 * Internal testing key.
 * Used by internal tooling (2601-next).
 */
export const _mk = process.env.DEV_ACCESS_KEY ?? "2601.next.x1@4736251";
