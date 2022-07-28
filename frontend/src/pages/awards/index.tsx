import { useCallback, useEffect, useState } from "react";
import { Award } from "../../types/awardType";
import { Table, Space, Drawer, Button, Form, Row, } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { api } from '../../services/api';
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

interface FormAward {
    id: string,
    name: string;
    description: string;
    score: number;
}

export function ListAwardsPage() {
    const { reset, control, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            id: "",
            name: "",
            description:"",
 score:0        },
    });

    const [awards, setAwards] = useState<Award[]>();
    const [showing, setShowing] = useState(false);
    const [selectedAward, setSelectedAward] = useState<Award>();
    const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);

    const handleAwards = useCallback(() => {
        api
            .get("/awards")
            .then((response) => {
                setAwards(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        handleAwards();
    }, [handleAwards]);


    const onClose = () => {
        setShowing(false);
    };


    const handleShowModule: SubmitHandler<FormAward> = useCallback(
        async (id) => {
            const url = '/awards/' + id
            api
                .get(url)
                .then((response) => {
                    setSelectedAward(response.data[0])
                    setShowing(true)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        []
    );

    const handleCreateAward: SubmitHandler<FormAward> = useCallback(
        async (formValue) => {
            api
                .post("/awards", {
                    name: formValue.name,
                    description: formValue.description,
                    score: formValue.score
                })
                .then((response) => {
                    handleAwards();
                    setVisibleCreate(false);
                    reset({
                        id: "",
                        name: "",
                        description:"",
             score:0                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [handleAwards, reset]
    );

    const handleUpdateAward: SubmitHandler<FormAward> = useCallback(
        async (formValue) => {
            const url = '/awards/' + formValue.id
            api
                .put(url, {

                    name: formValue.name,
                    description: formValue.description,
                    score: formValue.score
                })
                .then((response) => {
                    handleAwards();
                    setVisibleEdit(false);
                    reset({
                        id: "",
                        name: "",
                        description:"",
             score:0                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [handleAwards, reset]
    );

    const handleDeleteAward: SubmitHandler<FormAward> = useCallback(
        async (id) => {
            const url = '/awards/' + id
            api
                .delete(url)
                .then((response) => {
                    handleAwards();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [handleAwards, reset]
    );

    const columns: ColumnsType<Award> = [
        {
            title: 'Título',
            dataIndex: 'name',
            key: 'name',
            render: (text, record : Award) => <a onClick={() => {
                reset({
                    id: record.id,
                    name: record.name,
                    description: record.description,
                    score: record.score
                });
                setVisibleEdit(true);
            }}>{text}</a>,
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Pontação',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() => {
                            handleShowModule(_.id)
                        }}>
                        <SearchOutlined />
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            reset({
                                id: _.id,
                                name: _.name,
                                description: _.description,
                                score: _.score
                            });
                            setVisibleEdit(true);
                        }}>
                        <EditOutlined />
                    </Button>
                    <Button type="primary"
                        onClick={() => {
                            handleDeleteAward(_.id)
                        }}
                        danger>
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row justify="space-between">
                <h1>Lista de Prêmios</h1>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisibleCreate(true);
                    }}>
                    <PlusCircleOutlined /> Adicionar
                </Button>
            </Row>
            <Table columns={columns} dataSource={awards} />
            <FormDrawer
                title="Cadastrando Módulo"
                onClose={() => {
                    setVisibleCreate(false);
                }}
                visible={visibleCreate}
                onSubmit={handleSubmit(handleCreateAward)}>
                <InputForm label="Título" control={control} name="name" />
                <InputForm label="Descrição" control={control} name="description" />
                <InputForm label="Pontuação" control={control} name="score" />

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
                                    description:"",
                                    score:0                                });
                            }}>
                            Limpar
                        </Button>
                    </Space>
                </Form.Item>
            </FormDrawer>
            <Drawer title={`${selectedAward?.name}`} placement="right" onClose={onClose} visible={showing}>
                <h1>{selectedAward?.name}</h1>
                <p>{selectedAward?.description}</p>
            </Drawer>

            <FormDrawer
                title="Editando Módulo"
                onClose={() => {
                    setVisibleEdit(false);
                    reset({
                        name: "",
                        description:"",
                        score:0                    });
                }}
                visible={visibleEdit}
                onSubmit={handleSubmit(handleUpdateAward)}>
                <InputForm label="Título" control={control} name="name" />
                <InputForm label="Descrição" control={control} name="description" />
                <InputForm label="Pontuação" control={control} name="score" />
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
                                    description:"",
                                    score:0                                });
                            }}>
                            Limpar
                        </Button>
                    </Space>
                </Form.Item>
            </FormDrawer>
        </>
    )
}