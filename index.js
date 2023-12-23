const fs = require("fs");
const mongodb = require("mongodb");
const { MongoClient, Binary } = mongodb;

const base64KeyId = "KQ/bdYhtTG2pAjWpFYz1uQ==";
const buffer = Buffer.from(base64KeyId, "base64");
const keyIdBinary = new Binary(buffer, Binary.SUBTYPE_UUID);
const JSONSchemaCreator = require("./schema-creator");
const { get } = require("http");
const jsonSchemas = JSONSchemaCreator(keyIdBinary); 

const connectionString = "LINK";
const keyVaultNamespace = "encryption.__keyVault";
const path = "./master-key.txt";
const localMasterKey = fs.readFileSync(path);

const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};

const patientSchema = {
  "medicalRecords.patients": jsonSchemas,
};

const extraOptions = {
  mongocryptdURI: "mongodb://localhost:27020",
};

const secureClient = new MongoClient(connectionString, {
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    schemaMap: patientSchema,
    extraOptions: extraOptions,
  },
});

async function insertPatient(name, bloodType, ssn) {
  try {
    await secureClient.connect();
    const keyDB = secureClient.db("medicalRecords");
    const collection = keyDB.collection("patients");
    const writeResult = await collection.insertOne({
			name,
      ssn,
      bloodType,
    });
    console.log("Write result:", writeResult);
  } catch (writeError) {
    console.error("writeError occurred:", writeError);
  }
}
async function getPatient(ssn) {
  try {
    await secureClient.connect();
    const keyDB = secureClient.db("medicalRecords");
    const collection = keyDB.collection("patients");
    const getResult = await collection.findOne({
      ssn,
    });
    console.log("get result:", getResult);
  } catch (writeError) {
    console.error("writeError occurred:", writeError);
  }
}

insertPatient(
  'Jon Doe',
  "O+",
  1234567,
);
getPatient(1234567);
