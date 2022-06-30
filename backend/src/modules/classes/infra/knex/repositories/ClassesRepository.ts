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
    console.log(id, title,module,content,link,score)
    console.log('calling update from repository,  id received: ', id);
    const updatedClass = new Class({ title, module, content, link, score });
    const query = connection<Class>("classes").where({id}).update({ title, module, content, link, score });
    console.log(query.toSQL().toNative())
    await  query;
    return updatedClass;
  }
  public async show({
    id
  }: IShowClassDTO) :Promise<Class[]>{
    const selectedClass = [] as Class[];
    const result = await connection<Class>("classes").where('classes.id', '=' , id)
                                                      .select('classes.*','modules.id','modules.name','modules.description')
                                                      .join('modules', 'classes.module', '=', 'modules.id')
                                                      .options({nestTables: true});
                                                      const allClasses = [] as Class[];
    result.map( ({classes,modules}) =>{
      const aClass = new Class(classes)
      aClass.module = modules;
      aClass.id = classes.id;
      selectedClass.push(aClass);
    })
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
    const result = await connection<Class>("classes").select('classes.*','modules.id','modules.name','modules.description').
                                                      join('modules', 'classes.module', '=', 'modules.id')
                                                      .options({nestTables: true})
                                                      
    const allClasses = [] as Class[];
    result.map( ({classes,modules}) =>{
      const aClass = new Class(classes)
      aClass.module = modules;
      aClass.id = classes.id;
      allClasses.push(aClass);
    })
    return allClasses;
  }
}

export { ClassesRepository };
