const User = require("../models/User.js");

module.exports = {
  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async login(req, res) {
    const usernameReq = req.body.username;
    const passwordReq = req.body.password;
    const user = await User.findOne({ where: { username: usernameReq, password: passwordReq } });
    return res.json(user);
  },

  async getById(req, res) {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    return res.json(user);
  },

  async create(req, res) {
    const user = await User.create(req.body);
    return res.json(user);
  },

  async update(req, res) {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    user.username = req.body.username;
    await user.save();
    return res.json(user);
  },

  async delete(req, res) {
    const id = req.params.id;
    await User.destroy({ where: { id: id } });
    return res.json({ message: "removed" });
  },
};
