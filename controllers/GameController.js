const Game = require("../models/Game.js");

const serverError = {
  status: 500,
  message: "Something wrong happened, try again.",
};

module.exports = {
  async getAll(req, res) {
    const games = await Game.findAll();
    return res.json(games);
  },

  async getByUserId(req, res) {
    try {
      const userId = req.params.id;
      const games = await Game.findAll({ where: { userId } });
      return res.json(games);
    } catch (err) {
      return res
        .status(serverError.status)
        .send({ error: serverError.message });
    }
  },

  async create(req, res) {
    try {
      const game = await Game.create({ ...req.body, userId });
      return res.json(game);
    } catch (err) {
      return res
        .status(serverError.status)
        .send({ error: serverError.message });
    }
  },
};
