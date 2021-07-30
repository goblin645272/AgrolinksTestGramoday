const mongoose = require("mongoose");

const marketCommodity = mongoose.Schema(
  {
    users: {
      type: Array,
      required: false,
    },
    marketID: {
      type: String,
      required: false,
    },
    cmdtyID: {
      type: String,
      required: false,
    },
    marketName: {
      type: String,
      required: false,
    },
    marketType: {
      type: String,
      required: false,
    },
    priceUnit: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  MarketCommodity: mongoose.model("marketCommodity", marketCommodity),
};
