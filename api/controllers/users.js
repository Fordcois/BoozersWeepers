const User = require("../models/user");

const UsersController = {
  //SeverLoad IS ONLY RELEVANT FOR HOSTING ON RENDER.COM FREETIER
  SeverLoad: (req, res) => {
    return res.status(200).json({ serverLive: 'Live' });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    let passwordErrorMsgs = "";

    if(user.password.length < 8) {
      passwordErrorMsgs += "Password must be at least 8 characters in length. \n"
    } 
    if(!/[!@£#$%^&*()"'-_+={}\[\]:;<>,.?~\\/|]/.test(user.password)) {
      passwordErrorMsgs += "Password must contain at least one special character. \n";
    } 
    if (passwordErrorMsgs !== "") {
      return res.status(400).json({message: passwordErrorMsgs})
    } 
    else {

    user.save((err) => {
      if (err) {
        
        if(err.code === 11000){
          if(err.keyPattern.email){
            return res.status(400).json({message: 'Email is already in use'})

          }
          else if(err.keyPattern.username)
          return res.status(400).json({ message: 'Username is already in use' });

        }
        else{
          res.status(400).json({message: 'Bad request'})

        }
      
      
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  }}
};

module.exports = UsersController;
