const express = require("express");
const showRouter = express.Router();

const {
  getAllShows,
  getOneShow,
  getShowByGenre,
  updateRating,
  updateStatus,
  deleteShow,
  validateShowStatus,
  validateShowRating,
} = require("../controllers/showController");

showRouter.get("/", getAllShows); //get all shows

showRouter.get("/:showId", getOneShow); //get one show by id

showRouter.get("/genre/:showGenre", getShowByGenre); //get all shows by genre

showRouter.put("/:showId/Rating", validateShowRating, updateRating); //update the rating of a show given an id

showRouter.put("/:showId/Status", validateShowStatus, updateStatus); //update the status of a show given an id

showRouter.delete("/:showId", deleteShow); //delete a show given a id

module.exports = showRouter;
