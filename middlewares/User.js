const ENUM_CODES = require("../enums/codes.js");
const User = require("../models/User.js");
const { Sequelize } = require('sequelize')

const Op = Sequelize.Op

const userExists = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
      if (user === null) {
        return res.status(ENUM_CODES.ERROR.NOT_FOUND).json({ message: 'User not found' });
      }
    next();
}

const userLogin = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username, password },
      });
      if (user === null) {
        return res.status(ENUM_CODES.ERROR.NOT_FOUND).json({ message: 'User not found, try again.' });
      }
    next();
}

const userRegister = async (req, res, next) => {
    const { username, email } = req.body;
    const usernameUsed = await User.findOne({
        where: { username },
      });
      if (usernameUsed !== null) {
        return res.status(ENUM_CODES.ERROR.BAD_REQUEST).json({ message: 'Username is already been used, try another one.' });
      }

      const emailUsed = await User.findOne({
        where: { email },
      });
      if (emailUsed !== null) {
        return res.status(ENUM_CODES.ERROR.BAD_REQUEST).json({ message: 'Email is already been used, try another one.' });
      }
    next();
}

const userUpdate = async (req, res, next) => {
    const id = req.params.id;
    const { username, email } = req.body;
    const usernameUsed = await User.findOne({
        where: { username, id: {[Op.notIn]:[id]} },
      });
      if (usernameUsed !== null) {
        return res.status(ENUM_CODES.ERROR.BAD_REQUEST).json({ message: 'Username is already been used, try another one.' });
      }

      const emailUsed = await User.findOne({
        where: { email, id: {[Op.notIn]:[id]} },
      });
      if (emailUsed !== null) {
        return res.status(ENUM_CODES.ERROR.BAD_REQUEST).json({ message: 'Email is already been used, try another one.' });
      }
    next();
}

const validateUsername = (req, res, next) => {
  const { username } = req.body;
  if (!username || username === "") {
    return res
      .status(ENUM_CODES.ERROR.BAD_REQUEST)
      .json({ message: 'username is required' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === "") {
    return res
      .status(ENUM_CODES.ERROR.BAD_REQUEST)
      .json({ message: 'email is required' });
  }

  const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isValidEmail = emailValidation.test(email);

  if (!isValidEmail) {
    return res
      .status(ENUM_CODES.ERROR.BAD_REQUEST)
      .json({ message: "Email is not valid" });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === "") {
    return res.status(ENUM_CODES.ERROR.BAD_REQUEST).json({ message: 'password is required' });
  }

  next();
};

module.exports = {
  validateUsername,
  validateEmail,
  validatePassword,
  userExists,
  userLogin,
  userRegister,
  userUpdate
};
