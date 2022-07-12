const Game = require("../models/Game.js");

module.exports = {
  async getAll(req, res) {
    const games = await Game.findAll();
    return res.json(games);
  },

  async getByUserId(req, res) {
    const reqUserId = req.params.userId;
    const games = await Game.findAll({ where: { userId: reqUserId } });
    return res.json(games);
  },
  async create(req, res) {
    const game = await Game.create(req.body);
    return res.json(game);
  },
};
