const express = require("express");
const app = express();
const PORT = 3000;
const seed = require("./db/seed");

//import your routes
const userRoutes = require("./routes/userRoutes");
const showRoutes = require("./routes/showRoutes");

//Middleware - app.use(express.json())
app.use(express.json());

//Middleware - urlEncoded - can have access to req.query
app.use(express.urlencoded({ extended: true }));

//user routes

app.use("/users", userRoutes);

//show routes

app.use("/shows", showRoutes);

//define a port for express to listen to
app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
