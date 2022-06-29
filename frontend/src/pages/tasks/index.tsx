import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {  useEffect, useState, useCallback} from "react";
import { Class } from "../../types/classType";
import { Module } from "../../types/moduleType";
import { Task } from "../../types/taskType";
import {  SubmitHandler, useForm } from "react-hook-form";
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { SelectForm } from "../../components/Select";
import { Table, Row, Space, Drawer, Button, Form, Input, } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import './styles.css';
import { api } from '../../services/api';


interface FormTask {
    id: string;
    title: string;
    class_id: string;
    description: string;
    status:boolean;
  }
  

interface ClassOption{
    label: string;
    value: string; 
}

export function ListTasksPage(){

    const [classes, setClasses] = useState<Class[]>();
    const [tasks, setTasks] = useState<Task[]>();
    const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
    const [visibleShow, setVisibleShow] = useState<boolean>(false);
    const [classOptions, setclassOptions ]= useState<ClassOption[]>();
    const [selectedTask, setSelectedTask ]= useState<Task>();


    const { reset, control, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
        id:"",
        title: "",
        class_id: "",
        description: "",
        status: false,
        },
      });
      

      async function handleTasks () {
        try {
            const response = await  api.get("tasks");
            setTasks(response.data);
            console.log('tasks',response.data);
            
        
        }catch(err){
        console.log('erro',JSON.stringify(err));
        };
    }

    async function getClasses () {
        try {
            const response = await  api.get("classes");
            setClasses(response.data);
            console.log('classes',response.data);
            
        
        }catch(err){
        console.log('erro',JSON.stringify(err));
        };
    }

    useEffect(()=>{
        let classOptions = [] as ClassOption[];
        classes?.map((aClass)=>{
            const classOption = {
                label: aClass.title,
                value: aClass.id
            };
            classOptions.push(classOption);
        })
        setclassOptions(classOptions);
    },[classes]);
    
    useEffect(()=>{
        handleTasks();
        getClasses();
    },[]);

    const handleCreateTask: SubmitHandler<FormTask> = useCallback(
        async (formValue) => {
          let data =  {
            title: formValue.title,
            class_id: formValue.class_id,
            description: formValue.description,
            status: formValue.status,
        }
        console.log('data to create',data)

          api
            .post("/tasks",data)
            .then((response) => {
              handleTasks();
              setVisibleCreate(false);
              reset({
                id:"",
                title: "",
                class_id: "",
                description: "",
                status: false,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        [handleTasks, reset]
      );

    const handleUpdateTask: SubmitHandler<FormTask> = useCallback(
        async (formValue) => {
        
          let data = {
            title: formValue.title,
            class_id: formValue.class_id,
            description: formValue.description,
            status: formValue.status,
        }
        console.log('data to update',data)

            api.put(`tasks/${formValue.id}`, data)
            .then((response) => {
              handleTasks();
              setVisibleEdit(false);
              reset({
                id:"",
                title: "",
                class_id: "",
                description: "",
                status: false,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        [handleTasks, reset]
        
    );
    
    const handleDeleteTask: SubmitHandler<FormTask> = useCallback(
      async (id) => {
          const url = '/tasks/' + id
          api
              .delete(url)
              .then((response) => {
                  handleTasks();
              })
              .catch((err) => {
                  console.log(err);
              });
      },
      [handleTasks, reset]
  );


    const showDrawer = (action : string) => {
        if (action ==='editing')
        setVisibleEdit(true);
        if (action ==='creating')
        setVisibleCreate(true);
        if (action ==='showing')
        setVisibleShow(true);
    };

    const onClose = () => {
        setVisibleEdit(false);
        setVisibleCreate(false);
        setVisibleShow(false);

    };

    const editTask = (record : Task) =>{
        showDrawer('editing');
        setSelectedTask(record);
    }

    const showTask = (record : Task) => {
        showDrawer('showing');
        setSelectedTask(record);
    }

    const formatUrl = (url:string | undefined) => {
        return url && url.replace("watch?v=", "embed/");
    }

    const columns: ColumnsType<Task> = [
        {
          title: 'Título',
          dataIndex: 'title',
          key: 'title',
          render: (text,record)=> <a onClick={
            ()=> {
              reset({
                id: record.id,
                title: record.title,
                class_id: record.class_id.id,
                description: record.description,
                status: record.status,
            });
            setVisibleEdit(true); 
            }
          
          }>{text}</a>,
        },
        {
          title: 'Aula',
          dataIndex: 'class',
          key: 'class',
          render: (text,record)=> <span>{record.class_id.title}</span>,
        },
        {
          title: 'Descrição',
          dataIndex:'description',
          key:'description',
          render: (text,record)=> <span>{record.description}</span>,
        },
        {
          title: 'Completa',
          dataIndex:'description',
          key:'description',
          render: (text,record)=> <span>{record.status? "Sim" : "Não"}</span>,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space>
            <Button
                onClick={() => {
                showTask(record);
                }}
            >
              <SearchOutlined />
            </Button>
            <Button
              type="primary"
              onClick={() => {
                reset({
                   id: _.id,
                   title: _.title,
                   class_id: _.class_id.id,
                   description:  _.description,
                   status : _.status
                  });
               editTask(record);
              }}>
              <EditOutlined />
            </Button>
            <Button type="primary" danger
             onClick={() => {
              handleDeleteTask(_.id)
          }}
            >
              <DeleteOutlined />
            </Button>
          </Space>
          ),
        },
      ];
        
    return (
        <div>
            <Row justify="space-between">
                <h1>Lista de Tarefas</h1>
                <Button
                    type="primary"
                    onClick={() => {
                    setVisibleCreate(true);
                    }}>
                    <PlusCircleOutlined /> Adicionar
            </Button>  
            </Row><br></br>         
            <Table columns={columns} dataSource={tasks} />
            <Drawer title={`${selectedTask?.title}`} 
                size="large" placement="right" 
                onClose={onClose} 
                visible={visibleShow}
                contentWrapperStyle={{background: 'inkp'}}
                bodyStyle={{width: "100%", display:'flex', flexDirection:'column', justifyContent:'center'}}
                >
                <h1>{selectedTask?.title}</h1>
                <i>{selectedTask?.class_id.title}</i>
                <p>{selectedTask?.description}</p>
                <p>Tarefa completa:{selectedTask?.status? 'Sim' : 'Não'}</p>
            </Drawer>
            <FormDrawer
                title="Cadastrando Tarefa"
                onClose={() =>{
                    reset({
                      id:"",
                      title: "",
                      class_id: "",
                      description: "",
                      status: false,
                      });
                      setVisibleCreate(false)
                } 
                }
                visible={visibleCreate}
                onSubmit={handleSubmit(handleCreateTask)}
                >

                <InputForm
                name="title"
                control={control}
                label="Título"
                />
               <SelectForm
                control={control}
                name="class_id"
                label="Aula"
                options={classOptions ||  [{label: "Não há aulas", value: 0}]}
                />
                <InputForm
                name="description"
                control={control}
                 label="Descrição"
                 />
               <SelectForm 
                control={control}
                name="status"
                label="Completa"
                options={ [
                 { label: "Sim",
                  value: true},
                  {
                    label: "Não",
                    value: false
                  }
                ]}
                 />
                <Form.Item>
                <Button htmlType="submit" type="primary">
                    Cadastrar
                </Button>
                <Button
                    onClick={() => {
                        reset({
                          id:"",
                          title: "",
                          class_id: "",
                          description: "",
                          status: false,
                        });
                    }}>
                    Limpar
                    </Button>
                </Form.Item>
            </FormDrawer>
            <FormDrawer
                title="Editando Tarefa"
                onClose={() =>{
                    reset({
                      id:"",
                      title: "",
                      class_id: "",
                      description: "",
                      status: false,
                      });
                      setVisibleEdit(false)
                }}
                visible={visibleEdit}
                onSubmit={handleSubmit(handleUpdateTask)}
                >
                <InputForm hidden label=""                 
                control={control} name="id" />
              
              <InputForm
                name="title"
                control={control}
                label="Título"
                />
               <SelectForm
                control={control}
                name="class_id"
                label="Aula"
                options={classOptions ||  [{label: "Não há aulas", value: 0}]}
                />
                <InputForm
                name="description"
                control={control}
                 label="Descrição"
                 />
                <SelectForm 
                control={control}
                name="status"
                label="Completa"
                options={ [
                 { label: "Sim",
                  value: true},
                  {
                    label: "Não",
                    value: false
                  }
                ]}
                 />
                <Form.Item>
                <Button htmlType="submit" type="primary">
                    Salvar</Button>
                </Form.Item>
            </FormDrawer>
        </div>
    )
}