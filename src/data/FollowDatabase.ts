import { BaseDatabase } from './BaseDatabase';

export class FollowDatabase extends BaseDatabase {
  private static TABLE_NAME = 'FOLLOWERS_DATA';

  public async insertFollowDatabase(
    id_follow: string,
    id_followed: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id_follow,
          id_followed
        })
        .into(FollowDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async deleteFollowDatabase(
    id_follow: string,
    id_followed: string
  ): Promise<void> {
    try {
      await this.getConnection().raw(
        `
        DELETE FROM ${FollowDatabase.TABLE_NAME}
        WHERE id_follow = '${id_follow}'
        AND id_followed = '${id_followed}'
        `
      );
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
