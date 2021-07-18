import { BaseDatabase } from './BaseDatabase';

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = 'USER_DATA';
  private static TABLE_NAME_IMAGE = 'IMAGE_DATA';
  private static TABLE_NAME_FOLLOW = 'FOLLOWERS_DATA';

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

  public async getPhotosProfile(id: string) {
    const result = await this.getConnection()
      .select('file')
      .from(UserDatabase.TABLE_NAME_IMAGE)
      .where({
        author: id
      });
    return result;
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

  public async getFeedInformation(token: string) {
    const result = await this.getConnection().raw(
      `
        SELECT ${UserDatabase.TABLE_NAME}.name,
        ${UserDatabase.TABLE_NAME}.nickname, 
        ${UserDatabase.TABLE_NAME_IMAGE}.subtitle, 
        ${UserDatabase.TABLE_NAME_IMAGE}.date, 
        ${UserDatabase.TABLE_NAME_IMAGE}.file, 
        ${UserDatabase.TABLE_NAME_IMAGE}.collection, 
        ${UserDatabase.TABLE_NAME_IMAGE}.id_tag 
        FROM ${UserDatabase.TABLE_NAME_FOLLOW}
        INNER JOIN ${UserDatabase.TABLE_NAME}
        ON ${UserDatabase.TABLE_NAME_FOLLOW}.id_followed = ${UserDatabase.TABLE_NAME}.id
        INNER JOIN ${UserDatabase.TABLE_NAME_IMAGE}
        ON ${UserDatabase.TABLE_NAME}.id = ${UserDatabase.TABLE_NAME_IMAGE}.author
        WHERE id_follow = '${token}'
        `
    );

    return result[0];
  }
}
