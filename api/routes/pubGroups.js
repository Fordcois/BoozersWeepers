const express = require("express");
const router = express.Router();

const PubGroupsController = require("../controllers/pubGroups");

router.get("/:pubGroupId", PubGroupsController.FindMemberInfoByPubGroupID);
router.get("/", PubGroupsController.Index);
router.post("/:pubGroupId/addMember", PubGroupsController.UpdateAddMember)
router.post("/:pubGroupId/removeMember", PubGroupsController.UpdateRemoveMember)
router.post("/:pubGroupId/deleteGroup", PubGroupsController.DeleteGroup)
router.post("/", PubGroupsController.Create);
router.get("/searchgroups/findUsersGroups", PubGroupsController.FindUsersGroups);

module.exports = router;
