import express, { Request, Response } from "express";
import {
  fetchGaragesFromAPI,
  saveGaragesToDB,
  getGaragesFromDB,
  addGarageToDB,
} from "../services/garageService";
import { validateDto } from "../middlewares/validationMiddleware";
import { GarageDto } from "../dto/GarageDto";

const router = express.Router();

router.get("/sync", async (req: Request, res: Response) => {
  try {
    const garages = await fetchGaragesFromAPI();
    const insertedCount = await saveGaragesToDB(garages);
    res.json({ message: `${insertedCount} garages synced successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sync garages." });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const garages = await getGaragesFromDB();
    res.json(garages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve garages." });
  }
});

router.post(
  "/",
  validateDto(GarageDto),
  async (req: Request, res: Response) => {
    try {
      const garage = req.body;
      const insertedGarage = await addGarageToDB(garage);
      res.status(201).json(insertedGarage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add the garage." });
    }
  }
);

export default router;
