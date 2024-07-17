const crypto = require("crypto");

const key = "mohitrana";
const secret = crypto.createHash("sha256").update(key).digest();

const encrypt = (password) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv);
  let encryptedPassword = cipher.update(password, "utf8", "hex");
  encryptedPassword += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    password: encryptedPassword,
  };
};

const decrypt = (encryptedPassword, iv) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    secret,
    Buffer.from(iv, "hex")
  );
  let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf8");
  decryptedPassword += decipher.final("utf8");
  return decryptedPassword;
};

module.exports = { encrypt, decrypt };
