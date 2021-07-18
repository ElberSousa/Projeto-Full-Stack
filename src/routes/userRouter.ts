import express from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);
userRouter.get('/profile/:id', userController.profile);
userRouter.get('/search-by-name', userController.search);
userRouter.get('/feed', userController.getFeed)