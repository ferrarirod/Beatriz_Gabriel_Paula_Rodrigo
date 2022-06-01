import { CreateClassService } from "@modules/classes/services/CreateClassService";
import { UpdateClassService } from "@modules/classes/services/UpdateClassService";
import { DeleteClassService } from "@modules/classes/services/DeleteClassService";
import { ShowClassService } from "@modules/classes/services/ShowClassService";
import { IndexClassService } from "@modules/classes/services/IndexClassService";




import { Request, Response } from "express";
import { container } from "tsyringe";

class ClassesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, module, content, link } = request.body;
    const createClassService = container.resolve(CreateClassService);

    const newClass = await createClassService.execute({
        title,
        module,
        content,
        link
    });

    return response.json(newClass);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    console.log('calling index from controller')
    const indexClassService = container.resolve(IndexClassService);
    const classes = await indexClassService.execute();
    return response.json(classes);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const showClassService = container.resolve(ShowClassService);
    const selectedClass = await showClassService.execute({id});
    return response.json(selectedClass);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { title, module, content, link } = request.body;
    const id = request.params.id;
    console.log('calling update from controller, id received = ', id )
    const updateClassService = container.resolve(UpdateClassService);
    const updatedClass = await updateClassService.execute({
      id,
      title,
      module,
      content,
      link
    });
    return response.json(updatedClass);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteClassService = container.resolve(DeleteClassService);
    const deletedClass = await deleteClassService.execute({id});
    return response.json(deletedClass);
  }
}

export { ClassesController };
