import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useForm } from "react-hook-form"



export function LoginPage()
{
    const { register } = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
      });
    const onFinish = (values: any) => {
        console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        };

    return (
        <Row justify="space-around" align="middle" style={{height:"100vh"}}>
            <Col span={6}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Por favor insira seu email!' }]}
                    >
                    <Input {...register("email")}/>
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: 'Por favor insira sua senha!' }]}
                    >
                        <Input.Password {...register("password")}/>
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