import { useCallback, useEffect, useState } from "react";
import { Comment } from "../../types/commentType";
import { Table, Space, Drawer, Button, Form, Row, } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { api } from '../../services/api';
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

interface FormComment {
    id: string;
    user_id: string;
    class_id: string;
    content: string;
    is_anonymous: boolean;
}

export function ListCommentsPage() {
    const { reset, control, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            id: "",
            user_id: "",
            class_id: "",
            content: "",
            is_anonymous: false,
        },
    });

    const [comments, setComments] = useState<Comment[]>();
    const [showing, setShowing] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comment>();
    const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);

    const handleComments = useCallback(() => {
        api
            .get("/comments")
            .then((response) => {
                setComments(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        handleComments();
    }, [handleComments]);


    const onClose = () => {
        setShowing(false);
    };


    const handleShowComment: SubmitHandler<FormComment> = useCallback(
        async (id) => {
            const url = '/comments/' + id
            api
                .get(url)
                .then((response) => {
                    setSelectedComment(response.data[0])
                    setShowing(true)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        []
    );

    const handleCreateComment: SubmitHandler<FormComment> = useCallback(
        async (formValue) => {
            api
                .post("/comments", {
                    user_id: formValue.user_id,
                    class_id: formValue.class_id,
                    content: formValue.content,
                    is_anonymous: formValue.is_anonymous
                })
                .then((response) => {
                    handleComments();
                    setVisibleCreate(false);
                    reset({
                        id: "",
                        user_id: "",
                        class_id: "",
                        content: "",
                        is_anonymous: false,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [handleComments, reset]
    );

    const handleUpdateComment: SubmitHandler<FormComment> = useCallback(
        async (formValue) => {
            const url = '/comments/' + formValue.id
            api
                .put(url, {
                    user_id: formValue.user_id,
                    class_id: formValue.class_id,
                    content: formValue.content,
                    is_anonymous: formValue.is_anonymous,
                })
                .then((response) => {
                    handleComments();
                    setVisibleEdit(false);
                    reset({
                        id: "",
                        user_id: "",
                        class_id: "",
                        content: "",
                        is_anonymous: false,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [handleComments, reset]
    );

    const handleDeleteComment: SubmitHandler<FormComment> = useCallback(
        async (id) => {
            const url = '/comments/' + id
            api
                .delete(url)
                .then((response) => {
                    handleComments();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [handleComments, reset]
    );

    const columns: ColumnsType<Comment> = [
        {
            title: 'Comentário',
            dataIndex: 'content',
            key: 'content',
            render: (text, record) => <a onClick={() => {
                reset({
                    id: record.id,
                    user_id: record.user_id,
                    class_id: record.class_id,
                    content: record.content,
                    is_anonymous: record.is_anonymous
                });
                setVisibleEdit(true);
            }}>{text}</a>,
        },
        {
            title: 'Data',
            dataIndex: 'create_date',
            key: 'create_date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() => {
                            handleShowComment(_.id)
                        }}>
                        <SearchOutlined />
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            reset({
                                id: _.id,
                                user_id: _.user_id,
                                class_id: _.class_id,
                                content: _.content,
                                is_anonymous: _.is_anonymous,
                            });
                            setVisibleEdit(true);
                        }}>
                        <EditOutlined />
                    </Button>
                    <Button type="primary"
                        onClick={() => {
                            handleDeleteComment(_.id)
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
                <h1>Lista de Módulos</h1>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisibleCreate(true);
                    }}>
                    <PlusCircleOutlined /> Adicionar
                </Button>
            </Row>
            <Table columns={columns} dataSource={comments} />
            <FormDrawer
                title="Cadastrando Módulo"
                onClose={() => {
                    setVisibleCreate(false);
                }}
                visible={visibleCreate}
                onSubmit={handleSubmit(handleCreateComment)}>
                <InputForm label="Aula" control={control} name="class_id" />
                <InputForm label="Comentário" control={control} name="content" />
                <Form.Item>
                    <Space>
                        <Button htmlType="submit" type="primary">
                            Cadastrar
                        </Button>
                        <Button
                            onClick={() => {
                                reset({
                                    user_id: "",
                                    class_id: "",
                                    content: "",
                                    is_anonymous: false,
                                });
                            }}>
                            Limpar
                        </Button>
                    </Space>
                </Form.Item>
            </FormDrawer>
            <Drawer title={`${selectedComment?.create_date}`} placement="right" onClose={onClose} visible={showing}>
                <h1>{selectedComment?.class_id}</h1>
                <p>{selectedComment?.content}</p>
            </Drawer>

            <FormDrawer
                title="Editando Módulo"
                onClose={() => {
                    setVisibleEdit(false);
                    reset({
                        id: "",
                        user_id: "",
                        class_id: "",
                        content: "",
                        is_anonymous: false,
                    });
                }}
                visible={visibleEdit}
                onSubmit={handleSubmit(handleUpdateComment)}>
                <InputForm label="Aula" control={control} name="class_id" />
                <InputForm label="Comentário" control={control} name="content" />
                <InputForm label="Comentário Anônimo" control={control} name="is_anonymous" />
                <InputForm hidden label="" control={control} name="user_id" />
                <InputForm hidden label="" control={control} name="id" />

                <Form.Item>
                    <Space>
                        <Button htmlType="submit" type="primary">
                            Salvar
                        </Button>
                        <Button
                            onClick={() => {
                                reset({
                                    id: "",
                                    user_id: "",
                                    class_id: "",
                                    content: "",
                                    is_anonymous: false,
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