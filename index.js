const express = require("express");
const sequelize = require("./database");
const routes = require('./routes');

sequelize.sync().then(() => console.log("DB IS READY"));

const port = process.env.PORT || 8000

const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors())
app.use(routes);

app.listen(port, () => {
  console.log("APP IS RUNNING");
});

/*
Force reinitialize
sequelize.sync({ force: true }).then(() => console.log("DB IS READY"));
*/