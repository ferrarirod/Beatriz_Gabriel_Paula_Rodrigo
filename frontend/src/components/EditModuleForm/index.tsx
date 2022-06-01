import { Table, Tag, Space, Drawer, Button, Form, Input, } from 'antd';
import { Module } from '../../types/moduleType';
import { api } from '../../services/api';

export function EditModuleForm(selectedModule: Module) {
    const onFinish = () => {

    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Título"
                name="title"
                rules={[{ required: true, message: 'O título do módulo é obrigatório' }]}
            >
                <Input defaultValue={selectedModule?.name} />
            </Form.Item>
            <Form.Item
                label="Módulo"
                name="module"
                rules={[{ required: true, message: 'A descrição do módulo é obrigatório' }]}
            >
                <Input defaultValue={selectedModule?.description} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Salvar
                </Button>
            </Form.Item>
        </Form>
    )
}