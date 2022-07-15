const User = require("../models/User.js");
const Config = require("../models/Config.js");
const Cryptography = require("../cryptography.js")

const serverError = {
  status: 500,
  message: "Something wrong happened, try again."
}


module.exports = {
  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async getRank(req, res) {
    const users = await User.findAll({ order: [['victories', 'DESC']] });
    return res.json(users);
  },

  async login(req, res) {
    let { username } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      return res.json(user);
    } catch (err) {
      console.log(err)
      return res.status(serverError.status).send({error: serverError.message});
    }
  },

  async getById(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({ where: { id: id } });
      delete user.password
      return res.json(user);
    } catch (err) {
      return res.status(serverError.status).send({error: serverError.message});
    }
  },

  async create(req, res) {
    try {

      let salt = await Config.findOne();
      if (!salt) {
        salt = Cryptography.generateSalt()
        Config.create({ salt })
      } else {
        salt = salt.salt
      }
    
      req.body.victories = 0
      req.body.password = Cryptography.generatePassword(req.body.password, salt)

      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(serverError.status).send({error: serverError.message});
    }
  },

  async update(req, res) {
    const id = req.params.id;
    const { username, email } = req.body;
    let { password } = req.body;
    try {
      let salt = await Config.findOne();

      if (!salt) {
        return res.status(500).send({error: 'Crypto Key was lost, create another account !'});
      } else {
        salt = salt.salt
      }

      password = Cryptography.generatePassword(password, salt)

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

  async updateVictories(userId, victories) {
    const id = userId;
    try {
      const user = await User.findOne({ where: { id: id } });
      user.victories = victories;
      await user.save();
      return user;
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
