import express from "express";
import sequelize from "sequelize";
import { T_JankenList } from "./models.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

app.get("/", async (req, res) => {
  try {
    const jankenList = await T_JankenList.findAll({
      attributes: ['id', 'title', 'play', 'win']
    });
    if (!jankenList) {
      res.status(404).send("not found");
      return;
    }
    res.json(jankenList);
    res.end();
  } catch(error) {
    console.log(error);
  }
});

app.get("/play/:jankenId", async (req, res) => {
  try {
    const jankenId = +req.params.jankenId;
    const jankenData = await T_JankenList.findByPk(jankenId);
    if (!jankenData) {
      res.status(404).send("not found");
      return;
    }
    res.json(jankenData);
    res.end();
  } catch(error) {
    console.log(error);
  }
});

app.post("/play/:jankenId", async (req, res) => {
  try {
    const jankenId = +req.params.jankenId;
    const jankenData = await T_JankenList.findByPk(jankenId);
    const play = +jankenData.play + 1;
    const win = +req.body.win + +jankenData.win;

    await T_JankenList.update({ play: play, win: win }, { where: { id: jankenId } })
    res.end();
  } catch(error) {
    console.log(error);
  }
});

app.post("/make", async (req, res) => {
  try {
    const body = req.body;
    const title = body.title, rock = body.rock, scissors = body.scissors, paper = body.paper, play = 0, win = 0;
    await T_JankenList.create({ title, rock, scissors, paper, play, win });
    res.end();
  } catch(error) {
    console.log(error);
  }
});

/* '{"title":"sample1", "rock":1, "scissors":0, "paper":0, "play":10, "win":4,}' */

/*
app.get("/restaurants", async (req, res) => {
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const restaurants = data.restaurants;
  res.json({
    rows: restaurants.slice(offset, offset + limit),
    count: data.restaurants.length,
  });
});

app.get("/restaurants/:restaurantId", async (req, res) => {
  const restaurantId = +req.params.restaurantId;
  const restaurant = data.restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );
  if (!restaurant) {
    res.status(404).send("not found");
    return;
  }
  res.json(restaurant);
});

app.get("/restaurants/:restaurantId/reviews", async (req, res) => {
  const restaurantId = +req.params.restaurantId;
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const restaurant = data.restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );
  if (!restaurant) {
    res.status(404).send("not found");
    return;
  }
  const reviews = data.reviews.filter(
    (review) => review.restaurantId === restaurantId
  );
  res.json({
    count: reviews.length,
    rows: reviews.slice(offset, offset + limit),
  });
});*/

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});