import { useCallback, useEffect, useState } from "react";
import { Table, Space, Drawer, Button, Form, Row } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { api } from "../../services/api";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { SelectForm } from "../../components/Select";

interface Option {
  name: string;
  correct?: boolean;
}
interface FormQuestionOptions {
  id?: string;
  title: string;
  description: string;
  score: number;
  options?: Option[];
  correct?: number;
}

interface Question {
  id: string;
  title: string;
  description: string;
  options: Option[];
}

export function ListQuestionsPage() {
  const { reset, control, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      title: "",
      description: "",
      score: 0,
      options: [
        {
          name: "",
        },
      ],
    },
  });

  const [createOptions, setCreateOptions] = useState<Option[]>([
    {
      name: "",
    },
  ]);
  const [questions, setQuestions] = useState<Question[]>();
  const [showing, setShowing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);

  const handleQuestions = useCallback(() => {
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
    handleQuestions();
  }, [handleQuestions]);

  const onClose = () => {
    setShowing(false);
  };

  const handleQuestionShow: SubmitHandler<FormQuestionOptions> = useCallback(
    async (id) => {
      const url = "/questions/" + id;
      api
        .get(url)
        .then((response) => {
          setSelectedQuestion(response.data[0]);
          setShowing(true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    []
  );

  const handleCreateQuestion: SubmitHandler<FormQuestionOptions> = useCallback(
    async (formValue) => {
      let options = createOptions.map((o, index) => {
        let option = {} as Option;
        if (formValue.options && formValue.options[index]) {
          option = formValue.options[index];
        }
        if (index === formValue.correct) {
          option = {
            ...option,
            correct: true,
          };
        }

        return option;
      });

      api
        .post("/questions/options", {
          title: formValue.title,
          description: formValue.description,
          score: formValue.score,
          options: options,
        })
        .then((response) => {
          handleQuestions();
          setVisibleCreate(false);
          reset({
            title: "",
            description: "",
            score: 0,
            options: [
              {
                name: "",
              },
            ],
          });
          setCreateOptions([
            {
              name: "",
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [handleQuestions, reset, createOptions]
  );

  const handleDeleteQuestion: SubmitHandler<FormQuestionOptions> = useCallback(
    async (id) => {
      const url = "/questions/" + id;
      api
        .delete(url)
        .then((response) => {
          handleQuestions();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [handleQuestions, reset]
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
              handleQuestionShow(_.id);
            }}
          >
            <SearchOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {
              reset({
                id: _.id,
                title: _.title,
                description: _.description,
              });
              setVisibleEdit(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleDeleteQuestion(_.id);
            }}
            danger
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-between">
        <h1>Lista de Questões</h1>
        <Button
          type="primary"
          onClick={() => {
            setVisibleCreate(true);
          }}
        >
          <PlusCircleOutlined /> Adicionar
        </Button>
      </Row>
      <Table columns={columns} dataSource={questions} />
      <FormDrawer
        title="Cadastrando Questão"
        onClose={() => {
          setVisibleCreate(false);
        }}
        visible={visibleCreate}
        onSubmit={handleSubmit(handleCreateQuestion)}
      >
        <InputForm label="Título" control={control} name="title" />
        <InputForm label="Descrição" control={control} name="description" />
        <InputForm name="score" control={control} label="Pontuação" />
        {createOptions.map((option, index) => (
          <Row>
            <InputForm
              label={`Opção ${index + 1}`}
              control={control}
              name={`options[${index}].name`}
            />
            {createOptions.length > 1 && (
              <Button
                style={{
                  margin: "auto 0 24px 24px",
                }}
                onClick={() => {
                  setCreateOptions((prev) =>
                    prev.filter((o, i) => i !== index)
                  );
                }}
              >
                -
              </Button>
            )}
            <Button
              style={{
                margin: "auto 0 24px 24px",
              }}
              onClick={() => {
                setCreateOptions([
                  ...createOptions,
                  {
                    name: "",
                  },
                ]);
              }}
            >
              +
            </Button>
          </Row>
        ))}
        <SelectForm
          control={control}
          name="correct"
          label="Correta"
          options={createOptions.map((option, index) => ({
            label: `${index + 1}`,
            value: index,
          }))}
        />
        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">
              Cadastrar
            </Button>
            <Button
              onClick={() => {
                reset({
                    title: "",
                    description: "",
                    score: 0,
                    options: [
                      {
                        name: "",
                      },
                    ],
                });
                setCreateOptions([
                    {
                      name: "",
                    },
                  ]);
              }}
              
            >
              Limpar
            </Button>
          </Space>
        </Form.Item>
      </FormDrawer>
      <Drawer
        title={`${selectedQuestion?.title}`}
        placement="right"
        onClose={onClose}
        visible={showing}
      >
        <h1>{selectedQuestion?.title}</h1>
        <p>{selectedQuestion?.description}</p>
      </Drawer>

      {/* <FormDrawer
        title="Editando Questão"
        onClose={() => {
          setVisibleEdit(false);
          reset({
            name: "",
            description: "",
          });
        }}
        visible={visibleEdit}
        onSubmit={handleSubmit(handleUpdateModule)}
      >
        <InputForm label="Título" control={control} name="name" />
        <InputForm label="Descrição" control={control} name="description" />
        <InputForm hidden label="" control={control} name="id" />

        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">
              Salvar
            </Button>
            <Button
              onClick={() => {
                reset({
                  name: "",
                  description: "",
                });
              }}
            >
              Limpar
            </Button>
          </Space>
        </Form.Item>
      </FormDrawer> */}
    </>
  );
}
