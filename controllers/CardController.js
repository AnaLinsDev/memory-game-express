const Card = require("../models/Card.js");
const { Sequelize } = require("sequelize");

module.exports = {
  async getHardMode(req, res) {
    const cards = await Card.findAll({ order: Sequelize.literal("random()") });
    return res.json(cards);
  },

  async getNormalMode(req, res) {
    const cards = await Card.findAll({
      limit: 6,
      order: Sequelize.literal("random()"),
    });
    return res.json(cards);
  },

  async getEasyMode(req, res) {
    const cards = await Card.findAll({
      limit: 4,
      order: Sequelize.literal("random()"),
    });
    return res.json(cards);
  },

  async povoate(req, res) {
    const cards = [
      {
        icon: "mdi-star-crescent",
      },
      {
        icon: "mdi-star-circle ",
      },
      {
        icon: "mdi-bird",
      },
      {
        icon: "mdi-cards-heart",
      },
      {
        icon: "mdi-cards-club",
      },
      {
        icon: "mdi-cards-diamond",
      },
      {
        icon: "mdi-cloud",
      },
      {
        icon: "mdi-dolphin",
      },
      {
        icon: "mdi-skull",
      },
      {
        icon: "mdi-unicorn-variant ",
      },
    ];
    const cardsIsPovoated = await Card.findAll();
    if (cardsIsPovoated.length === 0) {
      cards.map((c) => Card.create(c));
    }
    const cardsRes = await Card.findAll();
    return res.json(cardsRes);
  },
};
