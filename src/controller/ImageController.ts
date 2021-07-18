import { BaseDatabase } from '../data/BaseDatabase';
import { ImageCreateDTO } from '../model/Image';
import { Request, Response } from 'express';
import { ImageBusiness } from '../business/ImageBusiness';

export class ImageController {
  async createImage(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const { subtitle, date, file, collection, id_tag } = req.body;

      const createImage: ImageCreateDTO = {
        subtitle,
        date,
        file,
        collection,
        id_tag
      };

      const imageBusiness = new ImageBusiness();
      const message = await imageBusiness.create(createImage, token);

      res.status(200).send({
        message: message
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }

  async createTag(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const name = req.body.name;

      const imageBusiness = new ImageBusiness();

      const message = await imageBusiness.createTag(name, token);

      res.status(200).send({
        message: message
      });
    } catch (error) {
      res.status(400).send({
        error: error.message
      });
    }
    await BaseDatabase.destroyConnection();
  }

  async getTag(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const imageBusiness = new ImageBusiness();

      const tag = await imageBusiness.getTag(token);

      res.status(200).send({
        tag
      });
    } catch (error) {
      res.status(400).send({
        error: error.message
      });
    }
  }
}
