import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { v4 as uuid } from "uuid";
class Class {
  id: string;

  title: string;

  module: string;

  content:string;

  link: string;

  created_at: Date;

  updated_at: Date;

  constructor({ title, module, content, link }: ICreateClassDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.title = title;
    this.module = module;
    this.content = content;
    this.link=link;
  }
}

export { Class };
