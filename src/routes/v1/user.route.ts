import express from 'express';
import userController from '../../controllers/user.controller';
import userDto from '../../dtos/user.dto';
import validateMiddleware from '../../midlewares/validate.middleware';

const userRoute = express.Router();

userRoute.get('/', userController.queryUsers);
userRoute.post('/', validateMiddleware(userDto.createUser), userController.createUser);

export default userRoute;
