const express = require("express");
const sequelize = require("./database");
const routes = require('./routes');

sequelize.sync().then(() => console.log("DB IS READY"));

const app = express();

app.use(express.json());
app.use(routes);

app.listen(8000, () => {
  console.log("APP IS RUNNING");
});

/*
Force reinitialize
sequelize.sync({ force: true }).then(() => console.log("DB IS READY"));
*/