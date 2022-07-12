const express = require("express");

const CardController = require("./controllers/CardController.js")
const GameController = require("./controllers/GameController.js")
const UserController = require("./controllers/UserController.js")

const routes = express.Router();

routes.get("/users", UserController.getAll );
routes.get("/users/:id", UserController.getById );
routes.post("/register", UserController.create );
routes.post("/login", UserController.login );
routes.put("/users/:id", UserController.update );
routes.delete("/users/:id", UserController.delete );

routes.get("/game/hard", CardController.getHardMode);
routes.get("/game/normal", CardController.getNormalMode);
routes.get("/game/easy", CardController.getEasyMode);

routes.post("/povoate_cards", CardController.povoate);

routes.get("/games/:userId", GameController.getByUserId );
routes.post("/games/:userId", GameController.create );

module.exports = routes;



