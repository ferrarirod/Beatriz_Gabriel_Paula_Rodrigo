export interface IUpdateQuestionDTO{
    id: string;
    title: string;
    task_id: string;
    description :string;
    score:number;
    status: boolean;
    expected_answer:number;
}