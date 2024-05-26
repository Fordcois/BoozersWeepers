const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
//SERVER IS ONLY RELEVANT FOR HOSTING ON RENDER.COM FREETIER
router.post('/ServerLoad',UsersController.SeverLoad)

module.exports = router;
