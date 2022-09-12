const crypto = require("crypto");

const { ENCRYPTION_KEY, INIT_VECTOR } = require("../configs/config");

const algorithm = "aes-256-cbc";

exports.encrypt = (text) => {
    const cipher = crypto.createCipheriv(
        algorithm,
        ENCRYPTION_KEY,
        INIT_VECTOR
    );

    let encryptedData = cipher.update(text, "utf-8", "hex");

    return (encryptedData += cipher.final("hex"));
};

exports.decrypt = (text) => {
    // the decipher function
    const decipher = crypto.createDecipheriv(
        algorithm,
        ENCRYPTION_KEY,
        INIT_VECTOR
    );
    let decryptedData = decipher.update(text, "hex", "utf-8");

    return (decryptedData += decipher.final("utf8"));
};
