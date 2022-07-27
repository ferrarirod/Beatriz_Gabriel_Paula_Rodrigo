export interface IUpdateQuestionDTO{
    id: string;
    title: string;
    description :string;
    score:number;
    status: boolean;
    expected_answer:number;
}