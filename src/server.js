const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(cors());

const mongoURI = "your_database_uri";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clickerGameSchema = new mongoose.Schema({
  coins: Number,
  monsterHP: Number,
  clickDamage: Number,
  dps: Number,
  upgradeHelmetCost: Number,
  upgradeChestplateCost: Number,
  upgradeLeggingsCost: Number,
  upgradeBootsCost: Number,
  upgradeWeaponCost: Number,
  upgradeShieldCost: Number,
});


const ClickerGame = mongoose.model("user1", clickerGameSchema);

app.use(bodyParser.json());


mongoose.connection.once("open", async () => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);

    if (!collectionNames.includes("user1")) {
      await db.createCollection("user1");
      console.log("user1 collection created");
    }
  } catch (error) {
    console.error("Error checking/creating collection:", error);
  }
});

app.get("/api/clicker-game", async (req, res) => {
  try {
    const gameData = await ClickerGame.findOne(); 
    res.json(gameData || {}); 
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/clicker-game", async (req, res) => {
  const updatedData = req.body;

  try {
    const result = await ClickerGame.findOneAndUpdate({}, updatedData, {
      upsert: true,
      new: true, 
    });

    console.log("Updated data in the database:", result);
    res.json(result);
  } catch (error) {
    console.error("Error updating data in the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
