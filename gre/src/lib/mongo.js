// lib/mongo.js
import { MongoClient, GridFSBucket } from "mongodb";

global.client = null;
global.bucket = null;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

/* 
  Initializes the connection to mongodb and creates a GridFSBucket
  Once connected, it will use the cached connection.
 */
async function connectToDb() {
  if (global.client) {
    return {
      client: global.client,
      bucket: global.bucket,
    };
  }

  const client = (global.client = new MongoClient(DATABASE_URL, {}));
  const bucket = (global.bucket = new GridFSBucket(client.db(), {
    bucketName: "images",
  }));

  await global.client.connect();
  console.log("Connected to the Database ");
  return { client, bucket };
}

// utility to check if file exists
async function fileExists(filename) {
  const { client } = await connectToDb();
  const count = await client
    .db()
    .collection("images.files")
    .countDocuments({ filename });

  return !!count;
}

module.exports = { connectToDb, fileExists };
