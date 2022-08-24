import express from "express";

const userRoute = express.Router();

userRoute.route("/").get((req, res) => {
  res.send("Hello World");
});

export default userRoute;
