const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true },
  firstName: {type: String, default:'' },
  lastName: {type: String, default:'' },
  password: { type: String, required: true },
  profilepicurl: {type: String,default:'https://res.cloudinary.com/dexcxd3xi/image/upload/v1700761470/stock-illustration-male-avatar-profile-picture-use_bxlg4g.jpg' }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
