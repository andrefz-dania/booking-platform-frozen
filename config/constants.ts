export const MOBILE_BREAKPOINT = 768

export const JWT_SESSION_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 90 days - must be in milliseconds 
//export const JWT_SESSION_EXPIRY = 2 * 60 * 1000; // 2min for debugging
export const JWT_SHORT_EXPIRY = "15m"; // Default 15m - supports notation such as 15m, 2d, 22s, etc.
export const JWT_REFRESH_EXPIRY = "30d"; // Default 90d
export const JWT_AUTO_REFRESH_INTERVAL = 15 * 60 * 1000 // 2min
export const BASE_URL = process.env.NEXT_PUBLIC_URL