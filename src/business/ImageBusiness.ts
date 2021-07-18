import { ImageDatabase } from '../data/ImageDataBase';
import { ImageCreateDTO } from '../model/Image';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export class ImageBusiness {
  async create(image: ImageCreateDTO, token: string) {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const authenticator = new Authenticator();
    const accessToken = authenticator.getData(token);

    if (!accessToken) {
      throw new Error('Token Invalido!');
    }
    const imageDatabase = new ImageDatabase();

    const tagId: string = await imageDatabase.getTag(image.id_tag);

    await imageDatabase.createImageDatabase(
      id,
      image.subtitle,
      accessToken.id,
      image.date,
      image.file,
      image.collection,
      tagId
    );

    return 'Imagem criada com sucesso!';
  }

  async createTag(tag: string, token: string) {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const authenticator = new Authenticator();
    const accessToken = authenticator.getData(token);

    if (!accessToken) {
      throw new Error('Token Invalido!');
    }

    const imageDatabase = new ImageDatabase();
    await imageDatabase.createTag(id, tag);

    return 'Tag criada com sucesso!';
  }

  async getTag(token: string) {
    const authenticator = new Authenticator();
    const accessToken = authenticator.getData(token);

    if (!accessToken) {
      throw new Error('Token Invalido!');
    }

    const imageDatabase = new ImageDatabase();
    const resultIdTag = await imageDatabase.getTag(token);

    return resultIdTag;
  }
}
