import { Request, Response } from 'express';
import UserBusiness from '../business/UserBusiness';
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
      const profileData = await UserBusiness.profile(id);
      res.status(200).send({ profileData });
    } catch (error) {
      res.status(error.code || 400).send({
        error: error.message
      });
    }
  };

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
}
