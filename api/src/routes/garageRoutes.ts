import express, { Request, Response } from "express";
import {
  fetchExternalGarages,
  saveGarages,
  getGarages,
  addGarages,
} from "../services/garageService";
import { validateDto } from "../middlewares/validationMiddleware";
import { GarageListDto } from "../dto/garageDto";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const fetchedGarages = await fetchExternalGarages();
    await saveGarages(fetchedGarages);
    const garages = await getGarages();
    res.json(garages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve garages." });
  }
});

router.post(
  "/",
  validateDto(GarageListDto),
  async (req: Request, res: Response) => {
    try {
      const { garages } = req.body;
      const insertedGarages = await addGarages(garages);
      res.status(201).json(insertedGarages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add the garage." });
    }
  }
);

export default router;
