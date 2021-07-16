import { BaseDatabase } from './BaseDatabase';

export class UserDatabase extends BaseDatabase {
  public async userCheck(nickname: string, email: string): Promise<void> {
    try {
      const result = await this.getConnection()
        .select('*')
        .from('USER_DATA')
        .where({ nickname })
        .orWhere({ email });
      if (result[0]) {
        throw new Error('User or email already in use');
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async createUser(
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          nickname,
          password
        })
        .into('USER_DATA');
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async login(nicknameOrEmail: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select('*')
        .from('USER_DATA')
        .where({ nickname: nicknameOrEmail })
        .orWhere({ email: nicknameOrEmail });
      if (!result[0]) {
        throw new Error('User not found.');
      }
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getProfile(id: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select('name', 'nickname', 'id')
        .from('USER_DATA')
        .where({ id });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getProfileByName(name: string): Promise<any> {
    try {
      const result = await this.getConnection()
        .select('name', 'nickname', 'id')
        .from('USER_DATA')
        .where({ name });
      if (!result[0]) {
        throw new Error('User not found.');
      }
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
