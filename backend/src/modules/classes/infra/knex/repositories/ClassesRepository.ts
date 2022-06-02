import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { IUpdateClassDTO } from "@modules/classes/dtos/IUpdateClassDTO";
import { IDeleteClassDTO } from "@modules/classes/dtos/IDeleteClassDTO";
import { IShowClassDTO } from "@modules/classes/dtos/IShowClassDTO";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { Class } from "../entities/Class";
import { Module } from "@modules/modules/infra/knex/entities/Module";
import { connection } from "@shared/infra/knex";
import { CreateClassService } from "@modules/classes/services/CreateClassService";

class ClassesRepository implements IClassesRepository {


  public async create({
    title,
    module,
    content,
    link,
    score
  }: ICreateClassDTO): Promise<Class> {
    
    const newClass = new Class({ title, module, content, link , score});

    await connection<Class>("classes").insert(newClass);

    return newClass;
  }
  public async update({
    id,
    title,
    module,
    content,
    link,
    score
  }: IUpdateClassDTO): Promise<Class> {
    console.log('calling update from repository,  id received: ', id);
    const updatedClass = new Class({ title, module, content, link, score });
    updatedClass.id = id;
    await connection<Class>("classes").where('id', '=' , id).update({ title, module, content, link, score });

    return updatedClass;
  }
  public async show({
    id
  }: IShowClassDTO) :Promise<Class[]>{
    const selectedClass = await connection<Class>("classes").where('id', '=' , id);
    return selectedClass;

  }
  public async delete({
    id
  }: IDeleteClassDTO) :Promise<Class[]>{
    const deletedClass = await connection<Class>("classes").where('id', '=' , id);
    await connection<Class>("classes").where('id', '=' , id).del();
    return deletedClass;
  }
  
  public async index(): Promise<Class[]>{
    const result = await connection<Class>("classes").select().join('modules', 'classes.module', '=', 'modules.id').options({nestTables: true}).select()
    const allClasses = [] as Class[];
    result.map( ({classes,modules}) =>{
      const aClass = new Class(classes)
      aClass.module = modules;
      allClasses.push(aClass);
    })
    return allClasses;
  }
}

export { ClassesRepository };
