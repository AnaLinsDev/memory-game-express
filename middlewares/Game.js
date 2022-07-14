const ENUM_CODES = require("../enums/codes.js");
const Game = require("../models/Game.js");

const userGamesExists = async (req, res, next) => {
    const userId = req.params.id;
    const games = await Game.findOne({ where: { userId } });
      if (games === null) {
        return res.status(ENUM_CODES.ERROR.NOT_FOUND).json({ message: "User doesn't have any game" });
      }
    next();
}

module.exports = {
  userGamesExists,
};
