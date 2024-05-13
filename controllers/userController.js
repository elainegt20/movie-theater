//import models from index
const { Show, User } = require("../models/index");

//define functions for routes

//get all user
const getAllUsers = async (req, res, next) => {
  try {
    //get users from database
    const users = await User.findAll();
    if (users === 0) {
      res.status(404).json({ message: "No users found" });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    //otherwise send error response

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//get one user
const getOneUser = async (req, res, next) => {
  try {
    //get user id
    const userId = req.params.userId;

    //find user in database by id
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//get all shows watched by a single user

const getAllShowsWatchedByUser = async (req, res, next) => {
  try {
    //get user id
    const userId = req.params.userId;

    //find user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //get shows related with user
    const shows = await user.getShows();

    if (!shows) {
      return res.status(404).json({ message: "Shows not found" });
    } else {
      res.status(200).json(shows);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//update and add a show if a user has watched it
const updateShow = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const showInfo = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const show = await Show.findByPk(showInfo.id);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    const existingShow = await user.hasShow(show);
    if (existingShow) {
      // Update the show information if it's already associated with the user
      const updatedShow = await Show.update(showInfo, {
        where: { id: showInfo.id },
      });
      //get updated record
      const showRecord = await Show.findByPk(showInfo.id);
      res
        .status(200)
        .json({ message: "Show updated successfully", showRecord });
    } else {
      // If the user does not have this show associated, associate it
      await user.addShow(show);
      res
        .status(201)
        .json({ message: "Show added to the user's watched list" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getAllShowsWatchedByUser,
  updateShow,
};
