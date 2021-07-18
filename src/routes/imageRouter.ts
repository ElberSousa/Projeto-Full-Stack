import express from 'express';
import { ImageController } from '../controller/ImageController';

export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post('/create-tag', imageController.createTag);
imageRouter.post('/create-image', imageController.createImage);