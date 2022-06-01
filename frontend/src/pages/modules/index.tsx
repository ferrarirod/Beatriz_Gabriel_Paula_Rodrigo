import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Module } from "../../providers/DataProvider";
import { Table, Space, Drawer, Button, Form, Input, } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { api } from '../../services/api';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export function ListModulesPage() {
    console.log("??")
    const [modules, setModules] = useState<Module[]>();
    const [editing, setEditing] = useState(false);
    const [showing, setShowing] = useState(false);
    const [selectedModule, setSelectedModule] = useState<Module>();

    async function getModules() {
        try {
            const response = await api.get("modules");
            setModules(response.data);

        } catch (err) {
            console.log('erro', JSON.stringify(err));
        };
    }
    useEffect(() => {
        getModules();
        console.log('modules', modules?.length)
    }, []);

    const showDrawer = (action: string) => {
        if (action === 'editing')
            setEditing(true);
        else setShowing(true);
    };

    const onClose = () => {
        setEditing(false);
        setShowing(false);
    };

    const editModule = (record: Module) => {
        showDrawer('editing');
        setSelectedModule(record);
    }

    const showModule = (record: Module) => {
        showDrawer('showing');
        setSelectedModule(record);


    }
    const onFinish = () => {

    }
    const columns: ColumnsType<Module> = [
        {
            title: 'Título',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a onClick={() => editModule(record)}>{text}</a>,
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showModule(record)}>Ver</a>
                    <a onClick={() => editModule(record)}>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Lista de Módulos</h1>
            <Link to="/home" >Home</Link>
            <Table columns={columns} dataSource={modules} />
            <Drawer title={`${selectedModule?.name}`} placement="right" onClose={onClose} visible={showing}>
                <h1>{selectedModule?.name}</h1>
                <p>{selectedModule?.description}</p>

            </Drawer>

            <Drawer title={`Editar ${selectedModule?.name}`} placement="right" onClose={onClose} visible={editing}>
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
                        label="Link"
                        name="link"
                    >
                        <Input defaultValue={selectedModule?.description} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}