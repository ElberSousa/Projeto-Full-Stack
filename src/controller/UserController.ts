import { Request, Response } from 'express';
import UserBusiness from '../business/UserBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { loginInputDTO, userInputDTO } from '../model/User';

export class UserController {
  signUp = async (req: Request, res: Response) => {
    try {
      const input: userInputDTO = {
        name: req.body.name,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password
      };

      const token = await UserBusiness.signUp(input);

      res.status(200).send({ token });
    } catch (error) {
      res.status(error.code || 400).send({
        error: error.message
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      let email = '';
      let nickname = '';

      const nicknameOrEmail = req.body.nicknameOrEmail;

      if (!(nicknameOrEmail.indexOf('@') === -1)) {
        email = nicknameOrEmail;
      } else {
        nickname = nicknameOrEmail;
      }

      const input: loginInputDTO = {
        nicknameOrEmail,
        password: req.body.password
      };

      const token = await UserBusiness.login(input);

      res.status(200).send({ token });
    } catch (error) {
      res.status(error.code || 400).send({
        error: error.message
      });
    }
  };

  profile = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const [infoProfile, photos] = await UserBusiness.profile(id);

      res.status(200).send({
        infoProfile,
        photos
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }

  search = async (req: Request, res: Response) => {
    try {
      const name = req.body.name;
      const profileName = await UserBusiness.name(name);
      res.status(200).send(profileName);
    } catch (error) {
      res.status(error.code || 400).send({
        error: error.message
      });
    }
  };

  getFeed = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const feed = await UserBusiness.getFeed(token);
      res.status(200).send({ feed });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  };
}
