import express from 'express';
import authController from '../../controllers/auth.controller';
import userDto from '../../dtos/user.dto';
import authMiddleware from '../../midlewares/auth.middleware';
import validateMiddleware from '../../midlewares/validate.middleware';

const authRoute = express.Router();

authRoute.post('/signup', validateMiddleware(userDto.createUser), authController.signup);
authRoute.post('/login', validateMiddleware(userDto.loginUser), authController.login);
authRoute.post('/refresh', authMiddleware, authController.refreshAuth);

export default authRoute;
