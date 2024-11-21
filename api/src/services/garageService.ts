import { Db } from "mongodb";
import { connectToDB } from "../database/mongoClient";
import { GarageDto } from "../dto/GarageDto";

const COLLECTION_NAME = process.env.COLLECTION_NAME || "garages";

export const fetchGaragesFromAPI = async (): Promise<GarageDto[]> => {
  const url = "https://data.gov.il/api/3/action/datastore_search";
  const params = {
    resource_id: "bb68386a-a331-4bbc-b668-bba2766d517d",
    limit: "5",
  };
  const t = new URLSearchParams(params);
  const response = await fetch(`${url}?${t}`);
  const result = await response.json();
  return result.result.records as GarageDto[];
};

export const saveGaragesToDB = async (
  garages: GarageDto[]
): Promise<number> => {
  const db: Db = await connectToDB();
  const collection = db.collection<GarageDto>(COLLECTION_NAME);
  await collection.deleteMany({});
  const garagesWithoutId = garages.map(({ _id, ...garage }) => garage);
  const result = await collection.insertMany(garagesWithoutId);

  return result.insertedCount;
};

export const getGaragesFromDB = async (): Promise<GarageDto[]> => {
  const db: Db = await connectToDB();
  const collection = db.collection<GarageDto>(COLLECTION_NAME);

  return await collection.find({}).toArray();
};

export const addGarageToDB = async (garage: GarageDto): Promise<GarageDto> => {
  const db: Db = await connectToDB();
  const collection = db.collection<GarageDto>(COLLECTION_NAME);
  const result = await collection.insertOne(garage);
  return { ...garage, _id: result.insertedId };
};
