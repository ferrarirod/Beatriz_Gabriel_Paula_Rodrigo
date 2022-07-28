import { Button, Form, message, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { RadioForm } from "../../components/Radio";
import { api } from "../../services/api";

const Logo = require("../../assets/webmaster-bg-full.png");

interface Question {
  id: string;
  title: string;
  description: string;
  expected_answer: string;
  score: number;
  task: {
    id: string;
    title: string;
    description: string;
    score: number;
  };
  options: {
    id: string;
    name: string;
  }[];
}

interface FormState {
  answer?: any;
}

export function ShowTask() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const { control, handleSubmit } = useForm();

  const getQuestions = useCallback(async () => {
    api
      .get(`/tasksQuestions/${id}`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmitForm: SubmitHandler<FormState> = useCallback(
    async (formValue) => {
      api
        .post("/answers", {
          answers: formValue.answer,
          task_id: id,
        })
        .then((response) => {
          message.success("Tarefa respondida com sucesso!");
          navigate(`/tasks/answer/${id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [id, navigate]
  );

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <div style={{ width: "100%", minHeight: "92vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={Logo}
          alt="Web Master"
          style={{ height: "160px", width: "160px", margin: "0 50px" }}
        />
        <h1
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}
        >
          {questions.length > 0 && questions[0].task.title}
        </h1>
        <p style={{ textAlign: "justify", padding: "16px 36px" }}>
          {questions.length > 0 && questions[0].task.description}
        </p>
      </div>
      <div
        style={{
          padding: "16px 0",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {questions.map((question) => (
            <RadioForm
              key={question.id}
              name={`answer.[${question.id}]`}
              control={control}
              label={question.title}
              description={question.description}
              options={question.options.map((o) => ({
                name: o.name,
                value: o.id,
              }))}
            />
          ))}
        </Form>
      </div>
      <Row
        justify="end"
        style={{
          marginTop: "24px",
        }}
      >
        <Button
          type="primary"
          size="large"
          onClick={handleSubmit(handleSubmitForm)}
        >
          Finalizar
        </Button>
      </Row>
    </div>
  );
}
