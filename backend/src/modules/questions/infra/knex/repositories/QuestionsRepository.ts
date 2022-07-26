import { ICreateQuestionDTO } from "@modules/questions/dtos/ICreateQuestionDTO";
import { IUpdateQuestionDTO } from "@modules/questions/dtos/IUpdateQuestionDTO";
import { IDeleteQuestionDTO } from "@modules/questions/dtos/IDeleteQuestionDTO";
import { IShowQuestionDTO } from "@modules/questions/dtos/IShowQuestionDTO";
import { IQuestionsRepository } from "@modules/questions/repositories/IQuestionsRepository";
import { Question } from "../entities/Question";
import { connection } from "@shared/infra/knex";
import { CreateQuestionService } from "@modules/questions/services/CreateQuestionService";
import { join } from "path";
import { Option } from "@modules/options/infra/knex/entities/Option";

class QuestionsRepository implements IQuestionsRepository {


  public async create({
    title,
    task_id,
    description,
    score,
    status,
    expected_answer,
  }: ICreateQuestionDTO): Promise<Question> {
    
    const newQuestion = new Question({ title,
      task_id,
      description,
      score,
      status,
      expected_answer,});

    await connection<Question>("questions").insert(newQuestion);

    return newQuestion;
  }
  public async update({
    id,
    title,
    task_id,
    description,
    score,
    status,
    expected_answer,
  }: IUpdateQuestionDTO): Promise<Question> {
    const updatedQuestion = new Question({  title,
      task_id,
      description,
      score,
      status,
      expected_answer, });
    await connection<Question>("questions").where({id}).update({  title,
      task_id,
      description,
      score,
      status,
      expected_answer, });

    updatedQuestion.id = id;
    return updatedQuestion;
  }
  public async show({
    id
  }: IShowQuestionDTO) :Promise<Question[]>{
    const selectedQuestion = await connection<Question>("questions").where('id', '=' , id);
    const options = await connection<Question>("questions_options")
                                              .select('options.id','options.name','options.description')
                                              .whereRaw("question_id ='"+ selectedQuestion[0].id +"'")
                                              .leftJoin('options', 'questions_options.option_id', '=', 'options.id');
    const allOptions =[] as Option[]
    for(var j = 0; j<options.length; j++){
      const option = options[j] as Option;
      allOptions.push(option);
    }
    selectedQuestion[0]['options'] = allOptions;
    
    return selectedQuestion;

  }
  public async delete({
    id
  }: IDeleteQuestionDTO) :Promise<Question[]>{
    const deletedQuestion = await connection<Question>("questions").where('id', '=' , id);
    await connection<Question>("questions").where('id', '=' , id).del();
    return deletedQuestion;
  }
  
  public async index(): Promise<Question[]>{
    const allQuestions = [] as Question[];
    const result = await connection<Question>("questions").select();                                                   
                                                  
    for(var i=0; i<result.length; i++){
      const question = result[i] as Question;
      const options = await connection<Question>("questions_options")
                                                .select('options.id','options.name','options.description')
                                                .whereRaw("question_id ='"+ question.id +"'")
                                                .leftJoin('options', 'questions_options.option_id', '=', 'options.id');
      const allOptions =[] as Option[]
      for(var j = 0; j<options.length; j++){
        const option = options[j] as Option;
        allOptions.push(option);
      }
      question['options'] = allOptions;
      allQuestions.push(question);
    }                                         
      return allQuestions;
  }
}

export { QuestionsRepository };
