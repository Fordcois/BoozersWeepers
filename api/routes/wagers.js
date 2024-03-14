const express = require("express");
const router = express.Router();

const WagersController = require("../controllers/wagers");

router.post("/:wager_id/accept", WagersController.Accept);
router.get("/:id", WagersController.FindByID);
router.get("/", WagersController.Index);
router.post("/:wager_id/accept", WagersController.Accept);
router.post("/updateWinner/:wagerID/:winnerID", WagersController.UpdateWinner);
router.post("/", WagersController.Create);
router.post("/:wager_id/cancel", WagersController.Cancel);
router.get("/", WagersController.Index);
router.get("/findall/:userId", WagersController.FindUserBets);
router.post("/groups/findgroupwagers", WagersController.ReturnGroupWagers);


module.exports = router;

