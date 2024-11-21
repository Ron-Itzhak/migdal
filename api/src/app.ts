import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import garageRoutes from "./routes/garageRoutes";
import { closeDB } from "./database/mongoClient";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server Is running");
});

app.use(express.json());
app.use("/garage", garageRoutes);
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received.");
  closeDB();
  process.exit(0);
});
