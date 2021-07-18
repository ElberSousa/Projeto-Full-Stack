export interface ImageCreateDTO {
  subtitle: string;
  date: Date;
  file: string;
  id_tag: string;
  collection: string;
}

export interface TagCreateDTO {
  id?: string;
  name: string;
}
