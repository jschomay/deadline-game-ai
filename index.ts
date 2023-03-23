import { InworldClient, InworldPacket } from "@inworld/nodejs-sdk";
import cors from "cors";
import express from "express";
import path from "path";

const PORT = 4000;

if (!process.env.INWORLD_KEY) {
  throw new Error("INWORLD_KEY env variable is required");
}

if (!process.env.INWORLD_SECRET) {
  throw new Error("INWORLD_SECRET env variable is required");
}

const client = new InworldClient().setApiKey({
  key: process.env.INWORLD_KEY!,
  secret: process.env.INWORLD_SECRET!,
});

const app = express();

app.use(cors());
app.use(express.static("static/"));

app.get("/", function (_req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/get_token", async (_, res) => {
  const token = await client.generateSessionToken();

  res.setHeader("Content-Type", "application/json");
  res.json(token);
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
