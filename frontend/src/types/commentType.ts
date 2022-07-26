export interface Comment {
    id: string;
    user_id: string;
    class_id: string;
    content: string;
    is_anonymous: boolean;
    create_date: Date;
}