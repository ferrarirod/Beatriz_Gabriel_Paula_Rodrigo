import { ICreateCommentDTO } from "@modules/comments/dtos/ICreateCommentDTO";
import { v4 as uuid } from "uuid";
class Comment {
  id: string;

  user_id: string;

  class_id: string;

  content: string;

  is_anonymous: boolean;

  created_at: Date;

  updated_at: Date;

  constructor({ user_id, class_id, content, is_anonymous }: ICreateCommentDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.user_id = user_id;
    this.class_id = class_id;
    this.content = content;
    this.is_anonymous = is_anonymous;
  }
}

export { Comment };
