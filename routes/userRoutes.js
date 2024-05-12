const express = require("express");
const userRouter = express.Router();

const {
  getAllUsers,
  getOneUser,
  getAllShowsWatchedByUser,
  updateShow,
} = require("../controllers/userController");

userRouter.get("/", getAllUsers); //get all users

userRouter.get("/:userId", getOneUser); //get one user

userRouter.get("/:userId/shows/", getAllShowsWatchedByUser); //get all shows watched by a user

userRouter.put("/:userId/shows/:showId", updateShow); //update a show if watched by a user

module.exports = userRouter;
