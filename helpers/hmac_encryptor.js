import crypto from "crypto";

const algorithm = "aes-256-cbc";
const encryptionKey = "25lkoiy251lkojiu25lkoiy251lkojiu"; // must be 32 chars exactly
const hmacKey = "vegasnerva";

// Helper: Generate HMAC
function generateHMAC(dataBuffer) {
  return crypto.createHmac("sha256", hmacKey).update(dataBuffer).digest();
}

// Encrypt with HMAC
export async function encrypt_with_cipher_and_hmac(data_obj) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(encryptionKey),
    iv
  );
  let encrypted = cipher.update(JSON.stringify(data_obj), "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const payload = Buffer.concat([iv, encrypted]); // [IV][Encrypted Data]
  const hmac = generateHMAC(payload); // HMAC over the payload only

  const finalBuffer = Buffer.concat([payload, hmac]); // [IV][Encrypted][HMAC]
  return finalBuffer.toString("base64");
}

// Decrypt with HMAC check
export async function decrypt_with_cipher_and_hmac(encryptedData) {
  const buffer = Buffer.from(encryptedData, "base64");
  const iv = buffer.subarray(0, 16);
  const encrypted = buffer.subarray(16, buffer.length - 32);
  const hmac = buffer.subarray(buffer.length - 32);

  const payload = buffer.subarray(0, buffer.length - 32);
  const expectedHmac = generateHMAC(payload);

  // if encrypted data tampered by user this must be caught in try catch when decrypt
  if (!crypto.timingSafeEqual(hmac, expectedHmac)) {
    throw new Error("Data has been tampered with");
  }

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(encryptionKey),
    iv
  );
  let decrypted = decipher.update(encrypted, undefined, "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
}
