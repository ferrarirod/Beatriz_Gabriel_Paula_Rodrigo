import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { IUpdateClassDTO } from "@modules/classes/dtos/IUpdateClassDTO";
import { IDeleteClassDTO } from "@modules/classes/dtos/IDeleteClassDTO";
import { IShowClassDTO } from "@modules/classes/dtos/IShowClassDTO";


import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { Class } from "../entities/Class";
import { connection } from "@shared/infra/knex";

class ClassesRepository implements IClassesRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = connection<Class>("Classes");
  }

  public async create({
    title,
    module,
    content,
    link
  }: ICreateClassDTO): Promise<Class> {
    const newClass = new Class({ title, module, content, link });

    await this.ormRepository.insert(newClass);

    return newClass;
  }
  public async update({
    id,
    title,
    module,
    content,
    link
  }: IUpdateClassDTO): Promise<Class> {
    const aClass = new Class({ title, module, content, link });

    await this.ormRepository.where('id', '=' , id).update(aClass);

    return aClass;
  }
  public async show({
    id
  }: IShowClassDTO) :Promise<Class[]>{
    const selectedClass = await this.ormRepository.where('id', '=' , id);
    return selectedClass;

  }
  public async delete({
    id
  }: IDeleteClassDTO) :Promise<Class[]>{
    const deletedClass = await this.ormRepository.where('id', '=' , id);
    await this.ormRepository.where('id', '=' , id).del();
    return deletedClass;
  }
  public async index(): Promise<Class[]>{
    const classes = await this.ormRepository.select();
    return classes;
  }
}

export { ClassesRepository };
