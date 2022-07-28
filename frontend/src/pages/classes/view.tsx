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

interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
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

  const markAsFinished = useCallback(async () => {
    api
      .post("/finishedClasses", {
        user_id: user.id,
        class_id: id,
      })
      .then((response) => {
        setFinished(true)
        message.success("Aula finalizada com sucesso");
      })
      .catch((err) => {
        message.error("Não foi possível finalizar a aula");
      });
  }, [user.id, id]);

  useEffect(() => {
    getClass(id);
  }, []);

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
      <div style={{ height: "50%", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <List
            className="comment-list"
            header={`${data.length} comentários`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.author}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
          <>
            <Form.Item>
              <TextArea rows={4} /*onChange={} value={}*/ />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                /*loading={} onClick={}*/ type="primary"
              >
                Comentar
              </Button>
            </Form.Item>
          </>
        </div>
      </div>
    </div>
  );
}
