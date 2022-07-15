const crypto = require("crypto");

const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const sha512 = (password, salt) => {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  var hash = hash.digest("hex");
  return {
    salt,
    hash,
  };
};

const generatePassword = (password, salt) => {
  var passwordESalt = sha512(password, salt);
  return passwordESalt.hash

};

module.exports = {
    generateSalt,
    generatePassword,
    sha512
  };