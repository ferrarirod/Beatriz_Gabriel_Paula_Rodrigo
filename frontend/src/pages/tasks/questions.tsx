import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { api } from "../../services/api";
import { Button, Col, message, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface Option {
  name: string;
  correct?: boolean;
}

interface Question {
  id: string;
  title: string;
  description: string;
  options: Option[];
}

export function CreateTasksQuestionsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const getQuestions = useCallback(async () => {
    api
      .get("/questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getQuestions();
  }, []);

  const handleCreateTaskQuestions = useCallback(async () => {
    api
      .post("/tasksQuestions", {
        task_id: id,
        questions_id: selectedQuestions.map((q) => q.id),
      })
      .then((response) => {
        message.success("Questões cadastradas com sucesso!");
        navigate("/tasks");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedQuestions, id]);

  const handleUpdateSelectQuestion = useCallback(
    (id: any) => {
      const question = questions.find((question) => question.id === id);
      if (question) {
        setSelectedQuestions([...selectedQuestions, question]);
        setQuestions(questions.filter((question) => question.id !== id));
      } else {
        const question = selectedQuestions.find(
          (question) => question.id === id
        );
        if (question) {
          setQuestions([...questions, question]);
          setSelectedQuestions(
            selectedQuestions.filter((question) => question.id !== id)
          );
        }
      }
    },
    [questions, selectedQuestions]
  );

  const handleOnDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;

      const items = Array.from(selectedQuestions);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setSelectedQuestions(items);
    },
    [selectedQuestions]
  );

  const columns: ColumnsType<Question> = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              handleUpdateSelectQuestion(_.id);
            }}
          >
            +
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Cadastrando Questões na Tarefa</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        <Col span={12}>
          <h3 style={{ textAlign: "center" }}>Questões</h3>
          <Table columns={columns} dataSource={questions} />
        </Col>
        <Col span={12}>
          <h3 style={{ textAlign: "center" }}>Questões selecionadas</h3>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided: any) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {selectedQuestions.map((question, index) => {
                    return (
                      <Draggable
                        key={question.id}
                        draggableId={question.id}
                        index={index}
                      >
                        {(provided: any) => (
                          <div
                            ref={provided.innerRef}
                            style={{
                              display: "flex",
                              border: "1px solid blue",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              backgroundColor: "red",
                            }}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p
                              style={{
                                padding: "8px",
                                border: "1px solid rgb(0 ,21, 41)",
                                borderRadius: "8px",
                              }}
                            >
                              <Button
                                onClick={(e) => {
                                  handleUpdateSelectQuestion(question.id);
                                }}
                              >
                                -
                              </Button>{" "}
                              {question.title}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleCreateTaskQuestions}>
          Salvar
        </Button>
      </div>
    </>
  );
}
