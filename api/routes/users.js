const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
//PING IS ONLY RELEVANT FOR HOSTING ON RENDER.COM FREETIER
router.get('/',UsersController.Ping)

module.exports = router;
