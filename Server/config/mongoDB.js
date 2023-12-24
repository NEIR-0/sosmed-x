require("dotenv").config();
const { MongoClient } = require("mongodb");
const passMongoDb = process.env.PASS_MONGODB;
const uri = `mongodb+srv://mongodb_phase_3:${passMongoDb}@sosmed.z6m2ibz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function connect() {
  try {
    client.db("sosmed");
  } catch (error) {
    await client.close(error); // pakai "await" dan "client.close"
  }
}

async function getDB() {
  return client.db("sosmed");
}

module.exports = { connect, getDB };
