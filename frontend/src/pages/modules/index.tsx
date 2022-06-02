import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Module } from "../../providers/DataProvider";
import { Row, Table, Space, Drawer, Button, Form, Input, } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { SelectForm } from "../../components/Select";
import { api } from '../../services/api';

interface FormModule {
    id: string,
    name: string;
    description: string;
}

export function ListModulesPage() {
    const { register, reset, getValues, control, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            id: "",
            name: "",
            description: ""
        },
    });

    const [modules, setModules] = useState<Module[]>();
    const [editing, setEditing] = useState(false);
    const [showing, setShowing] = useState(false);
    const [selectedModule, setSelectedModule] = useState<Module>();
    const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);

    const handleModules = useCallback(() => {
        api
            .get("/modules")
            .then((response) => {
                setModules(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        handleModules();
    }, [handleModules]);

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

    const handleCreateModule: SubmitHandler<FormModule> = useCallback(
        async (formValue) => {
            api
                .post("/modules", {
                    name: formValue.name,
                    description: formValue.description,
                })
                .then((response) => {
                    handleModules();
                    setVisibleCreate(false);
                    reset({
                        id: "",
                        name: "",
                        description: "",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [handleModules, reset]
    );

    const handleUpdateModule: SubmitHandler<FormModule> = useCallback(
        async (formValue) => {
            const url = '/modules/' + formValue.id
            api
                .put(url, {

                    name: formValue.name,
                    description: formValue.description,
                })
                .then((response) => {
                    handleModules();
                    setVisibleEdit(false);
                    reset({
                        id: "",
                        name: "",
                        description: "",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [handleModules, reset]
    );

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
                                description: _.description,
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
                <h1>Lista de Módulos</h1>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisibleCreate(true);
                    }}>
                    <PlusCircleOutlined /> Adicionar
                </Button>
            </Row>
            <Table columns={columns} dataSource={modules} />
            <FormDrawer
                title="Cadastrando Módulo"
                onClose={() => {
                    setVisibleCreate(false);
                }}
                visible={visibleCreate}
                onSubmit={handleSubmit(handleCreateModule)}>
                <InputForm label="Título" control={control} name="name" />
                <InputForm label="Descrição" control={control} name="description" />
                <Form.Item>
                    <Space>
                        <Button htmlType="submit" type="primary">
                            Cadastrar
                        </Button>
                        <Button
                            onClick={() => {
                                reset({
                                    id: "",
                                    name: "",
                                    description: "",
                                });
                            }}>
                            Limpar
                        </Button>
                    </Space>
                </Form.Item>
            </FormDrawer>
            <Drawer title={`${selectedModule?.name}`} placement="right" onClose={onClose} visible={showing}>
                <h1>{selectedModule?.name}</h1>
                <p>{selectedModule?.description}</p>

            </Drawer>

            <FormDrawer
                title="Editando Módulo"
                onClose={() => {
                    setVisibleEdit(false);
                    reset({
                        name: "",
                        description: "",
                    });
                }}
                visible={visibleEdit}
                onSubmit={handleSubmit(handleUpdateModule)}>
                <InputForm label="Título" control={control} name="name" />
                <InputForm label="Descrição" control={control} name="description" />
                <InputForm hidden label="" control={control} name="id" />

                <Form.Item>
                    <Space>
                        <Button htmlType="submit" type="primary">
                            Salvar
                        </Button>
                        <Button
                            onClick={() => {
                                reset({
                                    name: "",
                                    description: "",
                                });
                            }}>
                            Limpar
                        </Button>
                    </Space>
                </Form.Item>
            </FormDrawer>
        </>
    )
}