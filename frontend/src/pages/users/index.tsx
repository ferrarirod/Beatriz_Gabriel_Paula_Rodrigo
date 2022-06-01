import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { SelectForm } from "../../components/Select";

interface DataUsers {
  id: string;
  name: string;
  email: string;
  cpf: string;
  type: number;
}

const dataSource: DataUsers[] = [
  {
    id: "",
    name: "Gabriel",
    email: "gabriel@gmail.com",
    cpf: "123456789",
    type: 0,
  },
  {
    id: "",
    name: "Beatriz",
    email: "beatriz@gmail.com",
    cpf: "123456789",
    type: 0,
  },
  {
    id: "",
    name: "Rodrigo",
    email: "rodrigo@gmail.com",
    cpf: "123456789",
    type: 0,
  },
  {
    id: "",
    name: "Paula",
    email: "paula@gmail.com",
    cpf: "123456789",
    type: 0,
  },
];

export function ListUsersPage() {
  const { register, reset, getValues, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf: "",
      type: 1,
    },
  });

  const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const columns: ColumnsType<DataUsers> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button>
            <SearchOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {
              reset({
                name: _.name,
                email: _.email,
                password: "",
                confirmPassword: "",
                cpf: _.cpf,
                type: _.type,
              });
              setVisibleEdit(true);
            }}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row justify="space-between">
        <h1>Lista de Usuários</h1>
        <Button
          type="primary"
          onClick={() => {
            setVisibleCreate(true);
          }}>
          <PlusCircleOutlined /> Adicionar
        </Button>
      </Row>
      <Table dataSource={dataSource} columns={columns}></Table>
      <FormDrawer
        title="Cadastrando Usuário"
        onClose={() => setVisibleCreate(false)}
        visible={visibleCreate}>
        <InputForm
          label="Nome"
          {...register("name")}
          value={getValues("name")}
        />
        <InputForm
          label="E-mail"
          {...register("email")}
          value={getValues("email")}
        />
        <InputForm label="CPF" {...register("cpf")} value={getValues("cpf")} />
        <SelectForm
          control={control}
          name="type"
          label="Tipo"
          options={[
            {
              label: "Administrador",
              value: 0,
            },
            {
              label: "Aluno",
              value: 1,
            },
          ]}
        />
        <InputForm
          label="Senha"
          {...register("password")}
          value={getValues("password")}
        />
        <InputForm
          label="Confirmar Senha"
          {...register("confirmPassword")}
          value={getValues("confirmPassword")}
        />
        <Form.Item>
          <Button type="primary">Cadastrar</Button>
        </Form.Item>
      </FormDrawer>
      <FormDrawer
        title="Editando Usuário"
        onClose={() => setVisibleEdit(false)}
        visible={visibleEdit}>
        <InputForm
          label="Nome"
          {...register("name")}
          value={getValues("name")}
        />
        <InputForm
          label="E-mail"
          {...register("email")}
          value={getValues("email")}
        />
        <InputForm label="CPF" {...register("cpf")} value={getValues("cpf")} />
        <SelectForm
          control={control}
          name="type"
          label="Tipo"
          options={[
            {
              label: "Administrador",
              value: 0,
            },
            {
              label: "Aluno",
              value: 1,
            },
          ]}
        />
        <InputForm
          label="Senha"
          {...register("password")}
          value={getValues("password")}
        />
        <InputForm
          label="Confirmar Senha"
          {...register("confirmPassword")}
          value={getValues("confirmPassword")}
        />
        <Form.Item>
          <Button type="primary">Salvar</Button>
        </Form.Item>
      </FormDrawer>
    </>
  );
}
