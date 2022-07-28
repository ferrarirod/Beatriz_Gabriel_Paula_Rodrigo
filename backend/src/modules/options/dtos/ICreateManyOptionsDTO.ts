export interface ICreateManyOptionsDTO {
  question_id: string;
  options: { name: string; question_id: string }[];
}
