const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator")

const AuthenticationController = {

  Authenticate: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(401).json({message: "Email address not recognised"});
      } 
      else if (user.password !== password) {
        return res.status(401).json({message: "Incorrect password"});
      } 
      else {
        const token = TokenGenerator.jsonwebtoken(user.id)
        return res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};

module.exports = AuthenticationController;
