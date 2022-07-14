const User = require("../models/User.js");

const serverError = {
  status: 500,
  message: "Something wrong happened, try again."
}


module.exports = {
  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username, password } });
      return res.json(user);
    } catch (err) {
      return res.status(serverError.status).send({error: serverError.message});
    }
  },

  async getById(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({ where: { id: id } });
      return res.json(user);
    } catch (err) {
      return res.status(serverError.status).send({error: serverError.message});
    }
  },

  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(serverError.status).send({error: serverError.message});
    }
  },

  async update(req, res) {
    const id = req.params.id;
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ where: { id: id } });
      user.username = username;
      user.email = email;
      user.password = password;
      await user.save();
      return res.json(user);
    } catch (err) {
      return res.status(serverError.status).send({error: serverError.message});
    }
  },

  async delete(req, res) {
    const id = req.params.id;
    try {
      await User.destroy({ where: { id: id } });
      return res.json({ message: "removed" });
    } catch (err) {
      return res.status(serverError.status).send({error: serverError.message});
    }
  },
};
