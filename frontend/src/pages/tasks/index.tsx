import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  QuestionOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { Class } from "../../types/classType";
import { Module } from "../../types/moduleType";
import { Task } from "../../types/taskType";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { SelectForm } from "../../components/Select";
import {
  Table,
  Row,
  Space,
  Drawer,
  Button,
  Form,
  Input,
  Radio,
  Card,
  List,
} from "antd";
import type { RadioChangeEvent } from "antd";

import type { ColumnsType } from "antd/lib/table";
import "./styles.css";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const sampleIMG = require("../../assets/sample.png");

interface FormTask {
  id: string;
  title: string;
  class_id: string;
  description: string;
  status?: boolean;
  score: number;
}

interface ClassOption {
  label: string;
  value: string;
}

const options = [
  [
    {
      title: "A",
      content: "text node",
    },
    {
      title: "B",
      content: "element node",
    },
    {
      title: "C",
      content: "comment node",
    },
    {
      title: "D",
      content: "Nenhuma opção",
    },
  ],
  [
    {
      title: "A",
      content: 'p.classList.remove("nav")',
    },
    {
      title: "B",
      content: 'p.className = ""',
    },
    {
      title: "C",
      content: "Ambas as opções",
    },
  ],
];
export function ListTasksPage() {
  const [classes, setClasses] = useState<Class[]>();
  const [tasks, setTasks] = useState<Task[]>();
  const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleShow, setVisibleShow] = useState<boolean>(false);
  const [classOptions, setclassOptions] = useState<ClassOption[]>();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [value, setValue] = useState(1);

  const navigate = useNavigate()

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const { reset, control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      title: "",
      class_id: "",
      description: "",
      score: 0,
    },
  });

  async function handleTasks() {
    try {
      const response = await api.get("tasks");
      setTasks(response.data);
    } catch (err) {
      console.log("erro", JSON.stringify(err));
    }
  }

  async function getClasses() {
    try {
      const response = await api.get("classes");
      setClasses(response.data);
    } catch (err) {
      console.log("erro", JSON.stringify(err));
    }
  }

  useEffect(() => {
    let classOptions = [] as ClassOption[];
    classes?.map((aClass) => {
      const classOption = {
        label: aClass.title,
        value: aClass.id,
      };
      classOptions.push(classOption);
    });
    setclassOptions(classOptions);
  }, [classes]);

  useEffect(() => {
    handleTasks();
    getClasses();
  }, []);

  const handleCreateTask: SubmitHandler<FormTask> = useCallback(
    async (formValue) => {
      let data = {
        title: formValue.title,
        class_id: formValue.class_id,
        description: formValue.description,
        score: formValue.score,
      };

      api
        .post("/tasks", data)
        .then((response) => {
          handleTasks();
          setVisibleCreate(false);
          reset({
            id: "",
            title: "",
            class_id: "",
            description: "",
            score: 0,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [handleTasks, reset]
  );

  const handleUpdateTask: SubmitHandler<FormTask> = useCallback(
    async (formValue) => {
      let data = {
        title: formValue.title,
        class_id: formValue.class_id,
        description: formValue.description,
        score: formValue.score,
      };
      console.log("data to update", data);

      api
        .put(`tasks/${formValue.id}`, data)
        .then((response) => {
          handleTasks();
          setVisibleEdit(false);
          reset({
            id: "",
            title: "",
            class_id: "",
            description: "",
            score: 0,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [handleTasks, reset]
  );

  const handleDeleteTask: SubmitHandler<FormTask> = useCallback(
    async (id) => {
      const url = "/tasks/" + id;
      api
        .delete(url)
        .then((response) => {
          handleTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [handleTasks, reset]
  );

  const showDrawer = (action: string) => {
    if (action === "editing") setVisibleEdit(true);
    if (action === "creating") setVisibleCreate(true);
    if (action === "showing") setVisibleShow(true);
  };

  const onClose = () => {
    setVisibleEdit(false);
    setVisibleCreate(false);
    setVisibleShow(false);
  };

  const editTask = (record: Task) => {
    showDrawer("editing");
    setSelectedTask(record);
  };

  const showTask = (record: Task) => {
    showDrawer("showing");
    setSelectedTask(record);
  };

  const formatUrl = (url: string | undefined) => {
    return url && url.replace("watch?v=", "embed/");
  };

  const columns: ColumnsType<Task> = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a
          onClick={() => {
            reset({
              id: record.id,
              title: record.title,
              class_id: record.class_id.id,
              description: record.description,
              score: record.score,
            });
            setVisibleEdit(true);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Aula",
      dataIndex: "class",
      key: "class",
      render: (text, record) => <span>{record.class_id.title}</span>,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (text, record) => <span>{record.description}</span>,
    },
    {
      title: "Pontuação",
      dataIndex: "score",
      key: "score",
      render: (text, record) => <span>{record.score}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              showTask(record);
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
                class_id: _.class_id.id,
                description: _.description,
                score: _.score,
              });
              editTask(record);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            type="default"
            onClick={() => {
              navigate(`/tasks/questions/${_.id}`)
            }}
          >
            <QuestionOutlined />
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              handleDeleteTask(_.id);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between">
        <h1>Lista de Tarefas</h1>
        <Button
          type="primary"
          onClick={() => {
            setVisibleCreate(true);
          }}
        >
          <PlusCircleOutlined /> Adicionar
        </Button>
      </Row>
      <br></br>
      <Table columns={columns} dataSource={tasks} />
      <Drawer
        title={`Tarefa`}
        size="large"
        placement="right"
        onClose={onClose}
        visible={visibleShow}
        contentWrapperStyle={{ background: "inkp" }}
        bodyStyle={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <h1>{selectedTask?.title}</h1>
        <p>
          <b>Aula:</b> {selectedTask?.class_id.title}
        </p>
        <p>
          <b>Descrição: </b>
          {selectedTask?.description}
        </p>
        <p>
          <b>Pontuação: </b>
          {selectedTask?.score}
        </p>
        <span>
          <b>Q1. </b>O que document.getElementById("t1").childNodes[0] retorna?
        </span>
        <br />
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={options[0]}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>{item.content}</Card>
            </List.Item>
          )}
        />
        <b>Escolha uma alternativa: </b>
        <br />
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
        <br />
        <span>
          <b>Q2. </b>
          Como remover a classe <i>nav</i> do seguinte elemento? Escolha todas
          as opções possíveis em relação a este exemplo.
        </span>
        <br />
        <img src={sampleIMG} alt="" />
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={options[1]}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>{item.content}</Card>
            </List.Item>
          )}
        />
        <b>Escolha uma alternativa: </b>
        <br />
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
        <br />
        <Button type="primary">Enviar</Button>
      </Drawer>
      <FormDrawer
        title="Cadastrando Tarefa"
        onClose={() => {
          reset({
            id: "",
            title: "",
            class_id: "",
            description: "",
            score: 0,
          });
          setVisibleCreate(false);
        }}
        visible={visibleCreate}
        onSubmit={handleSubmit(handleCreateTask)}
      >
        <InputForm name="title" control={control} label="Título" />
        <SelectForm
          control={control}
          name="class_id"
          label="Aula"
          options={classOptions || [{ label: "Não há aulas", value: 0 }]}
        />
        <InputForm name="description" control={control} label="Descrição" />
        <InputForm name="score" control={control} label="Pontuação" />

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Cadastrar
          </Button>
          <Button
            onClick={() => {
              reset({
                id: "",
                title: "",
                class_id: "",
                description: "",
                score: 0,
              });
            }}
          >
            Limpar
          </Button>
        </Form.Item>
      </FormDrawer>
      <FormDrawer
        title="Editando Tarefa"
        onClose={() => {
          reset({
            id: "",
            title: "",
            class_id: "",
            description: "",
            score: 0,
          });
          setVisibleEdit(false);
        }}
        visible={visibleEdit}
        onSubmit={handleSubmit(handleUpdateTask)}
      >
        <InputForm hidden label="" control={control} name="id" />

        <InputForm name="title" control={control} label="Título" />
        <SelectForm
          control={control}
          name="class_id"
          label="Aula"
          options={classOptions || [{ label: "Não há aulas", value: 0 }]}
        />
        <InputForm name="description" control={control} label="Descrição" />
        <InputForm name="score" control={control} label="Pontuação" />
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Salvar
          </Button>
        </Form.Item>
      </FormDrawer>
    </div>
  );
}
