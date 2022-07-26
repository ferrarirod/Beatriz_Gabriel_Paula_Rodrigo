export interface ICreateCommentDTO {
    user_id: string;
    class_id: string;
    content: string;
    is_anonymous: boolean;
}