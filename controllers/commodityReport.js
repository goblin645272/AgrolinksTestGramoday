const { MarketCommodity } = require("../models/commodity");
const { StatusCodes } = require("http-status-codes");

exports.storeMarketCommodity = async (req, res) => {
  try {
    const {
      userId,
      marketID,
      marketName,
      cmdtyID,
      marketType,
      cmdtyName,
      convFctr,
      price,
    } = req.body.reportDetails;
    console.log(req.body);
    const today = new Date();

    await MarketCommodity.findOneAndDelete({
      marketID: marketID,
      cmdtyID: cmdtyID,
      updatedAt: {
        $gte: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1
        ),
        $lte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      },
    });
    const commodity = await MarketCommodity.findOne({
      marketID: marketID,
      cmdtyID: cmdtyID,
    });
    if (commodity) {
      if (commodity.users.length == 2) {
        return res
          .status(StatusCodes.NOT_ACCEPTABLE)
          .json({ message: "2 users have already contributed today" });
      }
      if (commodity.users[0] == userId) {
        return res
          .status(StatusCodes.NOT_ACCEPTABLE)
          .json({ message: "You have already contributed today" });
      }
      commodity.users.push(userId);
      commodity.price = (commodity.price + price / convFctr) / 2;
      commodity.save();
      return res
        .status(StatusCodes.OK)
        .json({ status: "success", reportId: commodity._id });
    } else {
      await MarketCommodity.create({
        users: [userId],
        marketID: marketID,
        marketName: marketName,
        cmdtyID: cmdtyID,
        marketType: marketType,
        cmdtyName: cmdtyName,
        priceUnit: "Kg",
        price: price / convFctr,
      });
      console.log(cmdtyID, marketID);
      const commodity = await MarketCommodity.findOne({
        marketID: marketID,
        cmdtyID: cmdtyID,
      });
      return res
        .status(StatusCodes.OK)
        .json({ status: "success", reportId: commodity._id });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

exports.getMarketCommodity = async (req, res) => {
  console.log(req.params.reportId);
  commodity = await MarketCommodity.findOne({
    _id: req.params.reportId,
  });
  if (commodity) {
    return res.status(StatusCodes.OK).json({ commodity });
  } else {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No commodity found with id ${req.params.id}` });
  }
};
