const Game = require("../models/Game.js");

module.exports = {
  async getAll(req, res) {
    const games = await Game.findAll();
    return res.json(games);
  },

  async getByUserId(req, res) {
    try {
      const reqUserId = req.params.userId;
      const games = await Game.findAll({ where: { userId: reqUserId } });
      return res.json(games);
    } catch (err) {
      return res.status(500).send({error: "Something wrong happened, try again."});
    }
  },
  async create(req, res) {
    try {
      const reqUserId = req.params.userId;
      console.log(reqUserId)
      const game = await Game.create({...req.body, userId: reqUserId});
      return res.json(game);
    } catch (err) {
      return res.status(500).send({error: "Something wrong happened, try again."});
    }
  },
};
