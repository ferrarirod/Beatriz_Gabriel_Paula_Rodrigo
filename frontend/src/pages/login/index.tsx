import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

interface ISessionData {
  email: string;
  password: string;
}

export function LoginPage() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleCreateSession: SubmitHandler<ISessionData> = useCallback(
    async (formValue) => {
      signIn({
        email: formValue.email,
        password: formValue.password,
      })
        .then((response) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [signIn, navigate]
  );

  return (
    <Row justify="space-around" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit(handleCreateSession)}
          autoComplete="off"
          layout="vertical">
          <Form.Item label="Email" name="email">
            <Controller
              control={control}
              name="email"
              render={({ field }) => <Input type="email" {...field} />}
            />
          </Form.Item>

          <Form.Item label="Senha" name="password">
            <Controller
              control={control}
              name="password"
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Row justify="space-between">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Continuar conectado</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Entrar
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
