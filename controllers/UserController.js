const User = require("../models/User.js");

module.exports = {
  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async login(req, res) {
    const usernameReq = req.body.username;
    const passwordReq = req.body.password;
    try {
      const user = await User.findOne({
        where: { username: usernameReq, password: passwordReq },
      });
      if (user === null) {
        throw new Error()
      }
      return res.json(user);
    } catch (err) {
      return res.status(404).send({error: "User and password don't match. Try again."});
    }
  },

  async getById(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({ where: { id: id } });
      if (user === null) {
        throw new Error()
      }
      return res.json(user);
    } catch (err) {
      return res.status(404).send({error: "User not found. Try again."});
    }
  },

  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(500).send({error: "Something wrong happened, try again."});
    }
  },

  async update(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({ where: { id: id } });
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      if (user === null) {
        throw new Error()
      }
      await user.save();
      return res.json(user);
    } catch (err) {
      return res.status(404).send({error: "User not found. Try again."});
    }
  },

  async delete(req, res) {
    const id = req.params.id;
    try {
      await User.destroy({ where: { id: id } });
      return res.json({ message: "removed" });
    } catch (err) {
      return res.status(500).send({error: "Something wrong happened, try again."});
    }
  },
};
