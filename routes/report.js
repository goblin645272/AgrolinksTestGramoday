const express = require("express");
const {
  storeMarketCommodity,
  getMarketCommodity,
} = require("../controllers/commodityReport");
const router = express.Router();

router.post("/reports", storeMarketCommodity);
router.get("/report/:reportId", getMarketCommodity);
module.exports = router;
