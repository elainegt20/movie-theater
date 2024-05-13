//import models from index
const { Show, User } = require("../models/index");

//define functions for routes

//get all shows

const getAllShows = async (req, res, next) => {
  try {
    const shows = await Show.findAll();

    if (shows.length === 0) {
      res.status(404).json({ message: "No shows found" });
    } else {
      res.status(200).json(shows);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//get one show

const getOneShow = async (req, res, next) => {
  try {
    //get show id
    const showId = req.params.showId;

    //find show by id
    const show = await Show.findByPk(showId);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    } else {
      res.status(200).json(show);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//get shows of particular genre

const getShowByGenre = async (req, res, next) => {
  try {
    //get show genre
    const showGenre = req.params.showGenre;

    //find shows by genre
    const shows = await Show.findAll({
      where: { genre: showGenre },
    });

    if (shows.length === 0) {
      return res.status(404).json({ message: "No shows found for this genre" });
    } else {
      res.status(200).json(shows);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//update rating of a show

const updateRating = async (req, res, next) => {
  try {
    //get show id
    const showId = req.params.showId;

    //get information to update
    const showInfo = req.body;

    //find show by id
    const show = await Show.findByPk(showId, {
      include: [
        {
          model: User,
          required: true, // This ensures the query returns null if no users are found
        },
      ],
    });

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    } else {
      await show.update(showInfo);

      //get updated show record
      const updatedShowRecord = await Show.findByPk(showId);
      res
        .status(200)
        .json({ message: "Show updated successfully", updatedShowRecord });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//update the status of a show stored with a key of available
const updateStatus = async (req, res, next) => {
  try {
    //get show id
    const showId = req.params.showId;

    //get show info to update
    const showInfo = req.body;

    //find show by id
    const show = await Show.findByPk(showId);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    } else if (show.available) {
      await show.update(showInfo);

      //get updated show record
      const updatedShowRecord = await Show.findByPk(showId);
      res
        .status(200)
        .json({ message: "Show updated successfully", updatedShowRecord });
    } else {
      res.status(200).json({ message: "Show not available" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//delete a show

const deleteShow = async (req, res, next) => {
  try {
    //get show id
    const showId = req.params.showId;

    //find show by id
    const show = await Show.findByPk(showId);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    } else {
      await show.destroy();

      res.status(200).json({ message: "Show deleted successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//server validation

const validateShowStatus = async (req, res, next) => {
  const status = req.body.status;

  //validate status
  if (!status) {
    return res.status(400).json({ message: "Status field is required." });
  }

  // Check for empty or whitespace-only strings
  if (!status.trim()) {
    return res
      .status(400)
      .json({ message: "Status cannot be empty or just whitespace." });
  }

  // Check for length
  if (status.length < 5 || status.length > 25) {
    return res
      .status(400)
      .json({ message: "Status must be between 5 and 25 characters long." });
  }

  // Validate rating
  if (rating !== undefined) {
    // Only validate rating if provided
    if (typeof rating !== "number" || rating % 1 !== 0) {
      return res.status(400).json({ message: "Rating must be an integer." });
    }
  }

  next(); // Pass control to the next handler if validation is successful
};

// Validate rating

const validateShowRating = async (req, res, next) => {
  const rating = req.body.rating;
  if (rating !== undefined) {
    // Only validate rating if provided
    if (typeof rating !== "number" || rating % 1 !== 0) {
      return res.status(400).json({ message: "Rating must be an integer." });
    }
  } else {
    return res.status(400).json({ message: "Rating must be provided." });
  }
};

module.exports = {
  getAllShows,
  getOneShow,
  getShowByGenre,
  updateRating,
  updateStatus,
  deleteShow,
  validateShowStatus,
  validateShowRating,
};
