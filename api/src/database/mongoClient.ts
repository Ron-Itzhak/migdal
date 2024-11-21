import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || "");
let db: Db | null = null;

export const connectToDB = async (): Promise<Db> => {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME || "garagesDB");

    console.log("Connected to MongoDB");
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    client.close();
    db = null;
    console.log("MongoDB connection closed");
  }
};
