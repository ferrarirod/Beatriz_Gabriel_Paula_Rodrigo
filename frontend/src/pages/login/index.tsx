import { Form, Input, Button, Checkbox, Row, Col, Image } from "antd";
import { useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

const Logo = require("../../assets/webmaster-bg-full.png");
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
    <Row justify="space-between" align="middle" style={{ height: "100vh" }}>
      <Col span={12}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSubmit(handleCreateSession)}
            autoComplete="off"
            layout="vertical"
          >
            <Image src={Logo} preview={false} />
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
        </div>
      </Col>
      <Col
        span={12}
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: "url(https://drive.google.com/uc?export=view&id=18kZmHTI0OwB2gl9JId7eOuP6SsKCViuZ)",
          backgroundSize: "cover"
        }}
      ></Col>
    </Row>
  );
}
