import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
