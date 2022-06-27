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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface DataUsers {
  id: string;
  name: string;
  email: string;
  cpf: string;
  type: number;
}

interface FormUser {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  type: number;
  password: string;
  confirmPassword: string;
}

const validationUser = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O email é obrigatório"),
  type: yup.number().required("O tipo é obrigatório"),
  cpf: yup.string().required("O CPF é obrigatório"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "Senha muito fraca"),
  confirmPassword: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export function ListUsersPage() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationUser),
    defaultValues: {
      id: "",
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
          setVisibleEdit(false);
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

  const handleUpdateUser: SubmitHandler<FormUser> = useCallback(
    async (formValue) => {
      api
        .put(`/users/${formValue.id}`, {
          name: formValue.name,
          email: formValue.email,
          type: formValue.type,
          password: formValue.password,
          cpf: formValue.cpf,
        })
        .then((response) => {
          setVisibleEdit(false);
          handleUsers();
          setVisibleCreate(false);
          reset({
            id: "",
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
                id: _.id,
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
          reset({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            cpf: "",
            type: 1,
          });
        }}
        visible={visibleCreate}
        onSubmit={handleSubmit(handleCreateUser)}>
        <InputForm
          label="Nome"
          control={control}
          name="name"
          error={errors.name}
        />
        <InputForm
          label="E-mail"
          control={control}
          name="email"
          error={errors.email}
        />
        <InputForm
          label="CPF"
          control={control}
          name="cpf"
          error={errors.cpf}
        />
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
          error={errors.type}
        />
        <InputForm
          label="Senha"
          control={control}
          name="password"
          type="password"
          error={errors.password}
        />
        <InputForm
          label="Confirmar Senha"
          control={control}
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword}
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
          reset({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            cpf: "",
            type: 1,
          });
        }}
        visible={visibleEdit}
        onSubmit={handleSubmit(handleUpdateUser)}>
        <InputForm
          label="Nome"
          control={control}
          name="name"
          error={errors.name}
        />
        <InputForm
          label="E-mail"
          control={control}
          name="email"
          error={errors.email}
        />
        <InputForm
          label="CPF"
          control={control}
          name="cpf"
          error={errors.cpf}
        />
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
          error={errors.type}
        />
        <InputForm
          label="Senha"
          control={control}
          name="password"
          type="password"
          error={errors.password}
        />
        <InputForm
          label="Confirmar Senha"
          control={control}
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword}
        />
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Salvar
          </Button>
        </Form.Item>
      </FormDrawer>
    </>
  );
}
