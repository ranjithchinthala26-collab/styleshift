import crypto from "crypto";

const AUTH_SECRET = process.env.AUTH_SECRET || "styleshift-super-secret-encryption-key-2026-auth";

/**
 * Hashes a plain text password with a secure random salt using scrypt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verifies a plain text password against a stored salt:hash string using timing-safe comparison.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(":");
    if (!salt || !originalHash) return false;
    const originalHashBuffer = Buffer.from(originalHash, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(originalHashBuffer, derivedKey);
  } catch {
    return false;
  }
}

export interface UserSessionPayload {
  userId: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

/**
 * Creates a signed JWT-like authentication token.
 */
export function createSessionToken(user: { id: string; email: string; name: string }): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: UserSessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    iat: now,
    exp: now + 60 * 60 * 24 * 7, // 7 days
  };

  const headerBase64 = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${headerBase64}.${payloadBase64}`)
    .digest("base64url");

  return `${headerBase64}.${payloadBase64}.${signature}`;
}

/**
 * Verifies and decodes a signed authentication token.
 */
export function verifySessionToken(token: string): UserSessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerBase64, payloadBase64, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(`${headerBase64}.${payloadBase64}`)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payload: UserSessionPayload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf8")
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}
