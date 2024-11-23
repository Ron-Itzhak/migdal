import { Db } from "mongodb";
import { connectToDB } from "../database/mongoClient";
import { GarageDto } from "../dto/GarageDto";

const COLLECTION_NAME = process.env.COLLECTION_NAME || "garages";

export const fetchExternalGarages = async (): Promise<GarageDto[]> => {
  const url = "https://data.gov.il/api/3/action/datastore_search";
  const params = {
    resource_id: "bb68386a-a331-4bbc-b668-bba2766d517d",
    limit: "5",
  };
  const searchParams = new URLSearchParams(params);
  const response = await fetch(`${url}?${searchParams}`);
  const result = await response.json();
  return result.result.records as GarageDto[];
};

export const saveGarages = async (garages: GarageDto[]): Promise<number> => {
  const db: Db = await connectToDB();
  const collection = db.collection<GarageDto>(COLLECTION_NAME);
  await collection.deleteMany({});
  const result = await collection.insertMany(garages);

  return result.insertedCount;
};

export const getGarages = async (): Promise<GarageDto[]> => {
  const db: Db = await connectToDB();
  const collection = db.collection<GarageDto>(COLLECTION_NAME);

  return await collection.find({}).toArray();
};

export const addGarages = async (
  garages: GarageDto[]
): Promise<GarageDto[]> => {
  const db: Db = await connectToDB();
  const collection = db.collection<GarageDto>(COLLECTION_NAME);

  const result = await collection.insertMany(garages);
  return garages.map((garage, index) => ({
    ...garage,
    _id: result.insertedIds[index],
  }));
};
