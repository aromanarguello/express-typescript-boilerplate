import express from 'express';
import authController from '../../controllers/auth.controller';
import userDto from '../../dtos/user.dto';
import validateMiddleware from '../../midlewares/validate.middleware';

const authRoute = express.Router();

authRoute.post('/signup', validateMiddleware(userDto.createUser), authController.signup);
authRoute.post('/login', validateMiddleware(userDto.loginUser), authController.login);

export default authRoute;
