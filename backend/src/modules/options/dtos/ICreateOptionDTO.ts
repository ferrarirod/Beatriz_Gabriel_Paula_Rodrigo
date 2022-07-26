export interface ICreateOptionDTO {
    name: string;
    description: string;
    question_id?: string;
    chalenge_id?: string;

}

export interface ICreateQuestionOptionDTO{
    question_id:string |undefined;
    option_id:string;
}