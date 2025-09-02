// const DB_URI = "mongodb://localhost:27017/BTDINANCE_DB";

//------------------------------------------------
export const DB_URI = "mongodb://localhost:27017/HC_DB";
//------------------------------------------------
export const BASIC_AUTH_NAME = "vegasnerva";
export const BASIC_AUTH_PASS = "@l#i$f%e";
//----------------------[PORT]--------------------------
export const PORT = 3100;
export const HOST = "127.0.0.1";

//------------- Keep all small case Don't change any thing -----------------
export const Authority = {
  SUPERADMIN: "superadmin",
};
Object.freeze(Authority);
//-----------------------------------------------
// ---- add more cats ok but can't be changed -----
export const CATEGORIES = {
  // [ on any edit here you MUST update the sanf.model.js file ->> Edit mongoose models]
  hot_drinks: {
    name: "Hot drinks",
    priority: 1,
  },
  cold_drinks: {
    name: "Cold drinks",
    priority: 2,
  },
  pastry: {
    name: "Pastry",
    priority: 3,
  },
  sandwitches: {
    name: "Sandwitches",
    priority: 4,
  },
};
Object.freeze(CATEGORIES);
//------------
//################# Protect ################
//------- [ token ] ------------
export const JWT_ACCESS_SECRET = "Lifeisastormmyyoungfriend2455#";
export const TOKEN_EXPIRE = "7d";
//------- [ cookie ] ------------
export const COOKIE_NAME = "tk";
export const COOKIE_SIGNING_SECRET = "vegasnerva";
export const COOKIE_EXPIRE = 7 * 24 * 60 * 60 * 1000; // 7 days
export const CookieOptions = {
  httpOnly: true,
  signed: true,
  maxAge: COOKIE_EXPIRE,
  sameSite: "strict",
};
Object.freeze(CookieOptions);
//###########################################

import crypto from "crypto";
const encrypt_decrypt_key = "25lkoiy251lkojiu25lkoiy251lkojiu"; // must be 32 chars exactly
const encrypt_decrypt_iv = "25lkoiy251lkojiu"; // must be 16 chars exactly

export const encrypt = async function encrypt(text) {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    encrypt_decrypt_key,
    encrypt_decrypt_iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted.toString();
};

export const decrypt = async function decrypt(encryptedText) {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    encrypt_decrypt_key,
    encrypt_decrypt_iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted.toString();
};

//=========================================================================

export const ERRORS = {
  password_error: "باسوورد خاطئة",
  admin_not_found: "أدمن غير موجود",
};
