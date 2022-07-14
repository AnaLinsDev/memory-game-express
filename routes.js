const express = require("express");

const UserMiddleware = require("./middlewares/User.js");
const GameMiddleware = require("./middlewares/Game.js");

const CardController = require("./controllers/CardController.js");
const GameController = require("./controllers/GameController.js");
const UserController = require("./controllers/UserController.js");

const routes = express.Router();

routes.get("/users", UserController.getAll);
routes.get("/users/:id", UserMiddleware.userExists, UserController.getById);
routes.post(
  "/register",
  UserMiddleware.validateUsername,
  UserMiddleware.validatePassword,
  UserMiddleware.validateEmail,
  UserMiddleware.userRegister,
  UserController.create
);
routes.post(
  "/login",
  UserMiddleware.validateUsername,
  UserMiddleware.validatePassword,
  UserMiddleware.userLogin,
  UserController.login
);
routes.put(
  "/users/:id",
  UserMiddleware.userExists,
  UserMiddleware.validateUsername,
  UserMiddleware.validatePassword,
  UserMiddleware.validateEmail,
  UserMiddleware.userUpdate,
  UserController.update
);
routes.delete("/users/:id", UserMiddleware.userExists, UserController.delete);

// ----------------------------------------------------------------------------------------

routes.get("/game/hard", CardController.getHardMode);
routes.get("/game/normal", CardController.getNormalMode);
routes.get("/game/easy", CardController.getEasyMode);
routes.post("/povoate_cards", CardController.povoate);

// ----------------------------------------------------------------------------------------

routes.get(
  "/games/:id",
  UserMiddleware.userExists,
  GameMiddleware.userGamesExists,
  GameController.getByUserId
);
routes.post("/games/:id", UserMiddleware.userExists, GameController.create);

module.exports = routes;
