const mongodb = require("mongodb");
const { Binary } = mongodb;

module.exports = function (keyId) {
    try {
        console.log("KEY from SCHEMA: ", keyId);

        return {
            bsonType: "object",
            encryptMetadata: {
                keyId: [keyId],
            },
            properties: {
                bloodType: {
                    encrypt: {
                        bsonType: "string",
                        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
                    },
                },
                ssn: {
                    encrypt: {
                        bsonType: "int",
                        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                    },
                },
            },
        };
    } catch (err) {
        console.log("ERROR IN SCHEMA: ", err);
    }
};
