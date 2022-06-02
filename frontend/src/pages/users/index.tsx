import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { SelectForm } from "../../components/Select";
import { api } from "../../services/api";

interface DataUsers {
  id: string;
  name: string;
  email: string;
  cpf: string;
  type: number;
}

interface FormUser {
  name: string;
  email: string;
  cpf: string;
  type: number;
  password: string;
  confirmPassword: string;
}

export function ListUsersPage() {
  const { reset, control, handleSubmit } = useForm({
    mode: "onChange",
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
  const [users, setUsers] = useState<DataUsers[]>([]);

  const handleUsers = useCallback(() => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    handleUsers();
  }, [handleUsers]);

  const handleCreateUser: SubmitHandler<FormUser> = useCallback(
    async (formValue) => {
      api
        .post("/users", {
          name: formValue.name,
          email: formValue.email,
          type: formValue.type,
          password: formValue.password,
          cpf: formValue.cpf,
        })
        .then((response) => {
          handleUsers();
          setVisibleCreate(false);
          reset({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            cpf: "",
            type: 1,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [handleUsers, reset]
  );

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
      <Table dataSource={users} columns={columns}></Table>
      <FormDrawer
        title="Cadastrando Usuário"
        onClose={() => {
          setVisibleCreate(false);
        }}
        visible={visibleCreate}
        onSubmit={handleSubmit(handleCreateUser)}>
        <InputForm label="Nome" control={control} name="name" />
        <InputForm label="E-mail" control={control} name="email" />
        <InputForm label="CPF" control={control} name="cpf" />
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
          control={control}
          name="password"
          type="password"
        />
        <InputForm
          label="Confirmar Senha"
          control={control}
          name="confirmPassword"
          type="password"
        />
        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary">
              Cadastrar
            </Button>
            <Button
              onClick={() => {
                reset({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  cpf: "",
                  type: 1,
                });
              }}>
              Limpar
            </Button>
          </Space>
        </Form.Item>
      </FormDrawer>
      <FormDrawer
        title="Editando Usuário"
        onClose={() => {
          setVisibleEdit(false);
        }}
        visible={visibleEdit}>
        <InputForm label="Nome" control={control} name="name" />
        <InputForm label="E-mail" control={control} name="email" />
        <InputForm label="CPF" control={control} name="cpf" />
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
        <InputForm label="Senha" control={control} name="password" />
        <InputForm
          label="Confirmar Senha"
          control={control}
          name="confirmPassword"
        />
        <Form.Item>
          <Button type="primary">Salvar</Button>
        </Form.Item>
      </FormDrawer>
    </>
  );
}
