import { useCallback, useEffect, useState } from "react";
import { Comment } from "../../types/commentType";
import { Class } from "../../types/classType";
import { User } from "../../types/userType";
import { Table, Space, Drawer, Button, Form, Row, } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input"
import { SelectForm } from "../../components/Select";

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

interface ClassOption {
    label: string;
    value: string;
}
interface UserOption {
    label: string;
    value: string;
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
    const [classes, setClasses] = useState<Class[]>();
    const [users, setUsers] = useState<User[]>();
    const [showing, setShowing] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comment>();
    const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
    const [classOptions, setClassOptions] = useState<ClassOption[]>();
    const [userOptions, setUserOptions] = useState<ClassOption[]>();


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
        let classOptions = [] as ClassOption[];

        classes?.map((uniqueClass) => {
            const classOption = {
                label: uniqueClass.title,
                value: uniqueClass.id
            };
            classOptions.push(classOption);
        })
        setClassOptions(classOptions);
    }, [classes]);
    async function getClasses() {
        try {
            const response = await api.get("classes");
            setClasses(response.data);
        } catch (err) {
            console.log('erro', JSON.stringify(err));
        };
    }

    useEffect(() => {
        let userOptions = [] as UserOption[];

        users?.map((user) => {
            const userOption = {
                label: user.name,
                value: user.id
            };
            userOptions.push(userOption);
        })
        setUserOptions(userOptions);
    }, [users]);
    async function getUsers() {
        try {
            const response = await api.get("users");
            setUsers(response.data);
        } catch (err) {
            console.log('erro', JSON.stringify(err));
        };
    }


    useEffect(() => {
        handleComments();
        getClasses();
        getUsers();
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
            console.log(formValue)
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
                <h1>Lista de Comentários</h1>
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
                title="Cadastrando Comentários"
                onClose={() => {
                    setVisibleCreate(false);
                }}
                visible={visibleCreate}
                onSubmit={handleSubmit(handleCreateComment)}>
                <SelectForm label="Aula" control={control} name="class_id" options={classOptions || [{ label: "Não há aulas", value: 0 }]} />
                <SelectForm label="Usuário" control={control} name="user_id" options={userOptions || [{ label: "Não há usuários", value: 0 }]} />
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
            <Drawer title={`${selectedComment?.created_at}`} placement="right" onClose={onClose} visible={showing}>
                <p>{selectedComment?.content}</p>
            </Drawer>

            <FormDrawer
                title="Editando Comentário"
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
                <SelectForm label="Aula" control={control} name="class_id" options={classOptions || [{ label: "Não há aulas", value: 0 }]} />
                <SelectForm label="Usuário" control={control} name="user_id" options={userOptions || [{ label: "Não há usuários", value: 0 }]} />
                <InputForm label="Comentário" control={control} name="content" />
                {/* <InputForm label="Comentário Anônimo" control={control} name="is_anonymous" /> */}
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