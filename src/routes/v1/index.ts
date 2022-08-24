import express from "express";
import userRoute from "./user.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
