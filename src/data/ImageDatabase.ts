import { BaseDatabase } from './BaseDatabase';

export class ImageDatabase extends BaseDatabase {
  private static TABLE_NAME = 'IMAGE_DATA';

  public async createImageDatabase(
    id: string,
    subtitle: string,
    author: string,
    date: Date,
    file: string,
    collection: string,
    idTag: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          subtitle,
          author,
          date,
          file,
          collection,
          id_tag: idTag
        })
        .into(ImageDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  private static TAG_NAME = 'TABELA_TAGS';

  public async createTag(id: string, name: string): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name
        })
        .into(ImageDatabase.TAG_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getTag(name: string): Promise<any> {
    try {
      const resultIdTagName = await this.getConnection()
        .select('id')
        .from(ImageDatabase.TAG_NAME)
        .where({ name });

      return resultIdTagName[0].id;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
