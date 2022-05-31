import { Table, Tag, Space, Drawer, Button, Form, Input, } from 'antd';
import { Class } from '../../types/classType';
import { api } from '../../services/api';

export function EditClassForm(selectedClass : Class){
    const onFinish = () => {
        
    }
    return(
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
                rules={[{ required: true, message: 'O título da aula é obrigatório' }]}
            >
                <Input defaultValue={selectedClass?.title} />
            </Form.Item>
            <Form.Item
                label="Módulo"
                name="module"
                rules={[{ required: true, message: 'O módulo da aula é obrigatório' }]}
            >
                <Input defaultValue={selectedClass?.module} />
            </Form.Item>
            <Form.Item
                label="Conteúdo"
                name="content"
                rules={[{ required: true, message: 'O conteúdo da aula é obrigatório' }]}
            >
                <Input defaultValue={selectedClass?.content} />
            </Form.Item>
            <Form.Item
                label="Link"
                name="link"
            >
                <Input defaultValue={selectedClass?.link} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Salvar
                </Button>
            </Form.Item>
        </Form>
    )
}