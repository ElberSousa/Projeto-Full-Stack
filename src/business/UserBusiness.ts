import { UserDatabase } from '../data/UserDatabase';
import { loginInputDTO, userInputDTO } from '../model/User';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private hashmanager: HashManager,
    private authenticator: Authenticator
  ) {}

  async signUp(input: userInputDTO) {
    const userDatabase = new UserDatabase();

    await userDatabase.userCheck(input.nickname, input.email);

    const id = this.idGenerator.generate();

    const password = await this.hashmanager.hashCreate(input.password);

    await userDatabase.createUser(
      id,
      input.name,
      input.email,
      input.nickname,
      password
    );

    const acessToken = this.authenticator.generateToken({
      id
    });

    return acessToken;
  }

  async login(input: loginInputDTO) {
    if (!input.nicknameOrEmail || !input.password) {
      throw new Error('invalid entry');
    }

    const loginUser = new UserDatabase();
    const userDB = await loginUser.login(input.nicknameOrEmail);
    const correcPass = await this.hashmanager.compare(
      input.password,
      userDB.password
    );

    if (!correcPass) {
      throw new Error('Invalid Password!');
    }

    const acessToken = this.authenticator.generateToken({
      id: userDB.id
    });

    return acessToken;
  }

  async profile (id: string){
    const userDatabase = new UserDatabase()
    const profile = await userDatabase.getProfile(id)
    const photosProfile = await userDatabase.getPhotosProfile(id)

    return [profile, photosProfile]
}
  async name(name: string) {
    const profile = new UserDatabase()
    const profileName = await profile.getProfileByName(name)
    return profileName
  }

  async getFeed (token: string){
    const authenticator = new Authenticator()
    const accessToken = authenticator.getData(token)
    
    if(!accessToken){
        throw new Error("Token Invalido!")            
    }
            
    const userDatabase = new UserDatabase()
    const resultFeed = await userDatabase.getFeedInformation(accessToken.id)

    return resultFeed
}
}

export default new UserBusiness(
  new IdGenerator(),
  new HashManager(),
  new Authenticator()
);
