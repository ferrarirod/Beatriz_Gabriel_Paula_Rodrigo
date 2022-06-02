import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { Module } from "@modules/modules/infra/knex/entities/Module";
import { v4 as uuid } from "uuid";
class Class {
  id: string;

  title: string;

  module: string | Module;

  content:string;

  link: string;

  score: number;

  created_at: Date;

  updated_at: Date;

  constructor({ title, module, content, link, score }: ICreateClassDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.title = title;
    this.module = module;
    this.content = content;
    this.link=link;
    this.score=score;
  }
}

export { Class };
