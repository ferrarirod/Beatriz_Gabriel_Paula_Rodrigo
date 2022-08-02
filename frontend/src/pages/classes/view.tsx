import {
  Comment,
  List,
  Tooltip,
  Button,
  Form,
  Input,
  Col,
  message,
} from "antd";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { Class } from "../../types/classType";
import { useEffect, useState, useCallback } from "react";

import moment from "moment";
import { useAuth } from "../../hooks/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const { TextArea } = Input;

const data = [
  {
    author: "Jorge",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    author: "Jorge",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];

interface Comment {
  user_name: string;
  content: string;
  created_at: string;
}

interface FormComment {
  comment: string;
}
interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const formatUrl = (url: string | undefined) => {
  return url && url.replace("watch?v=", "embed/");
};

export function ViewClass() {
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<Class>();
  const [finished, setFinished] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  async function getClass(id: string | undefined) {
    try {
      const response = await api.get("classes/" + id);
      let data = response.data;

      setSelectedClass(data[0]);

      api
        .get(`/finishedClasses/class/${id}`)
        .then((response) => {
          setFinished(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("erro", JSON.stringify(err));
    }
  }

  const handleCreateComment: SubmitHandler<FormComment> = useCallback(
    async (formValue) => {
      api
        .post("/comments", {
          class_id: id,
          user_id: user.id,
          content: formValue.comment,
          is_anonymous: false,
        })
        .then((response) => {
          setComments((prev) => [
            ...prev,
            {
              ...response.data,
              user_name: user.name,
            },
          ]);
          message.success("Comentário realizado com sucesso!");
          reset({
            comment: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [id, user, reset]
  );

  const getComments = useCallback(async () => {
    api
      .get(`/comments/class/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const markAsFinished = useCallback(async () => {
    api
      .post("/finishedClasses", {
        user_id: user.id,
        class_id: id,
      })
      .then((response) => {
        setFinished(true);
        message.success("Aula finalizada com sucesso");
      })
      .catch((err) => {
        message.error("Não foi possível finalizar a aula");
      });
  }, [user.id, id]);

  useEffect(() => {
    getClass(id);
    getComments();
  }, [id]);

  return (
    <div
      className="class-container"
      style={{ maxWidth: "1000px", margin: "auto" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Aula: {selectedClass?.title}</h2>
        {!finished && (
          <Button type="primary" onClick={markAsFinished}>
            Marcar como concluída
          </Button>
        )}
      </div>
      <h1>
        <b>Módulo:</b> {selectedClass?.module.name}
      </h1>
      <b>Pontuação:</b> {selectedClass?.score} pontos
      <br />
      <br />
      <h3>Conteúdo</h3>
      <div className="class-content">
        <div className="text-content" style={{ width: "50%" }}>
          {selectedClass?.content && (
            <div
              dangerouslySetInnerHTML={{ __html: selectedClass.content }}
            ></div>
          )}
          {/* <p>{selectedClass?.content}</p> */}
        </div>
        <div
          style={{
            width: "50%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <iframe
            style={{ height: "100%", width: "100%" }}
            src={formatUrl(selectedClass?.link)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
      <div style={{ height: "50%", width:"100%", display: "flex", justifyContent: "center" }}>
        <div style={{width:"100%", display: "flex", flexDirection: "column" }}>
          <List
            className="comment-list"
            header={`${data.length} comentários`}
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.user_name}
                  content={item.content}
                  datetime={
                    <Tooltip
                      title={Intl.DateTimeFormat("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(item.created_at))}
                    >
                      <span>
                        {Intl.DateTimeFormat("pt-BR", {
                          month: "2-digit",
                          day: "2-digit",
                        }).format(new Date(item.created_at))}
                      </span>
                    </Tooltip>
                  }
                />
              </li>
            )}
          />
          <Form id="form-comment">
            <Form.Item>
              <Controller
                control={control}
                name="comment"
                render={({ field }) => <TextArea rows={4} {...field} />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleSubmit(handleCreateComment)}
                type="primary"
              >
                Comentar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
