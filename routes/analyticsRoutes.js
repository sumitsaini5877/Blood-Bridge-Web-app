const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  bloodGroupDetailsContoller,
} = require("../controllers/analyticsController");
const { getRecentInventoryController } = require("../controllers/inventoryController");

const router = express.Router();

//routes


//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddelware,
  getRecentInventoryController
);


//GET BLOOD DATA
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsContoller);

module.exports = router;
