import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {  useEffect, useState, useCallback} from "react";
import { Link } from "react-router-dom";
import { Class } from "../../types/classType";
import { Module } from "../../types/moduleType";
import {  SubmitHandler, useForm } from "react-hook-form";
import { FormDrawer } from "../../components/Form";
import { InputForm } from "../../components/Input";
import { SelectForm } from "../../components/Select";
import { Table, Row, Space, Drawer, Button, Form, Input, } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import './styles.css';
import { api } from '../../services/api';


interface FormClass {
    id: string;
    title: string;
    module: string;
    content: string;
    link: string;
    score: number;
  }
  

interface ModuleOption{
    label: string;
    value: string; 
}

export function ListClassesPage(){

    const [classes, setClasses] = useState<Class[]>();
    const [modules, setModules] = useState<Module[]>();
    const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
    const [visibleShow, setVisibleShow] = useState<boolean>(false);
    const [moduleOptions, setModuleOptions ]= useState<ModuleOption[]>();
    const [selectedClass, setSelectedClass ]= useState<Class>();

    const { reset, control, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
        id:"",
          title: "",
          module: "",
          content: "",
          link: "",
          score: 0,
        },
      });
      

    async function getClasses () {
        try {
            const response = await  api.get("classes");
            setClasses(response.data);
            console.log(response.data);
            
        
        }catch(err){
        console.log('erro',JSON.stringify(err));
        };
    }

    useEffect(()=>{
        let moduleOptions = [] as ModuleOption[];
        modules?.map((module)=>{
            const moduleOption = {
                label: module.name,
                value: module.id
            };
            moduleOptions.push(moduleOption);
        })
        setModuleOptions(moduleOptions);
    },[modules]);
    
    async function getModules(){
        try {
            const response = await  api.get("modules");
            setModules(response.data);
        }catch(err){
        console.log('erro',JSON.stringify(err));
        };
    }
    useEffect(()=>{
        getModules();
        getClasses();
    },[]);

    const handleCreateClass: SubmitHandler<FormClass> = useCallback(
        async (formValue) => {
          api
            .post("/classes", {
                title: formValue.title,
                module: formValue.module,
                content: formValue.content,
                link: formValue.link,
                score: formValue.score,
            })
            .then((response) => {
              getClasses();
              setVisibleCreate(false);
              reset({
                id:"",
                title: "",
                module: "",
                content: "",
                link: "",
                score: 0,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        [getClasses, reset]
      );

    const handleUpdateClass: SubmitHandler<FormClass> = useCallback(
        async (formValue) => {
        
          let data = {
            title: formValue.title,
            module: formValue.module,
            content: formValue.content,
            link: formValue.link,
            score: formValue.score,
        }
        console.log('formValue',formValue)

            api.put(`classes/${formValue.id}`, data)
            .then((response) => {
              getClasses();
              setVisibleEdit(false);
              reset({
                  id:"",
                title: "",
                module: "",
                content: "",
                link: "",
                score: 0,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        [getClasses, reset]
        
    );
    
    const handleDeleteClass: SubmitHandler<FormClass> = useCallback(
      async (id) => {
          const url = '/classes/' + id
          api
              .delete(url)
              .then((response) => {
                  getClasses();
              })
              .catch((err) => {
                  console.log(err);
              });
      },
      [getClasses, reset]
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

    const editClass = (record : Class) =>{
        showDrawer('editing');
        setSelectedClass(record);
    }

    const showClass = (record :Class) => {
        showDrawer('showing');
        setSelectedClass(record);
    }

    const formatUrl = (url:string | undefined) => {
        return url && url.replace("watch?v=", "embed/");
    }

    const columns: ColumnsType<Class> = [
        {
          title: 'Título',
          dataIndex: 'title',
          key: 'title',
          render: (text,record)=> <a onClick={
            ()=> {
              reset({
                id: record.id,
                title: record.title,
                module: record.module.id,
                content: record.content,
                link: record.link,
                score:record.score,
            });
            setVisibleEdit(true); 
            }
          
          }>{text}</a>,
        },
        {
          title: 'Módulo',
          dataIndex: 'module',
          key: 'module',
          render: (text,record)=> <span>{record.module.name}</span>,
        },
        {
          title: 'Pontuação',
          dataIndex: 'score',
          key: 'score',
          render: (text,record)=> <span>{record.score}</span>,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space>
              <Link to={"/classes/view/"+record.id}>
                <Button
                    // onClick={() => {
                    // showClass(record);
                    // }}
                >
                  <SearchOutlined />
                </Button>
              </Link>        
            <Button
              type="primary"
              onClick={() => {
                reset({
                   id: _.id,
                   title: _.title,
                   module: _.module.id,
                   content: _.content,
                   link: _.link,
                   score: _.score
                  });
               editClass(record);
              }}>
              <EditOutlined />
            </Button>
            <Button type="primary" danger
             onClick={() => {
              handleDeleteClass(_.id)
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
                <h1>Lista de Aulas</h1>
                <Button
                    type="primary"
                    onClick={() => {
                    setVisibleCreate(true);
                    }}>
                    <PlusCircleOutlined /> Adicionar
            </Button>  
            </Row><br></br>         
            <Table columns={columns} dataSource={classes} />
            <Drawer title={`${selectedClass?.title}`} 
                size="large" placement="right" 
                onClose={onClose} 
                visible={visibleShow}
                contentWrapperStyle={{background: 'inkp'}}
                bodyStyle={{width: "100%", display:'flex', flexDirection:'column', justifyContent:'center'}}
                >
                <h1>{selectedClass?.title}</h1>
                <i>{selectedClass?.module.name}</i>
                <p>{selectedClass?.content}</p>
                <p>Pontuação: {selectedClass?.score} pontos</p>
                <div className="h_iframe">
                    <iframe src={formatUrl(selectedClass?.link)} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </div>

            </Drawer>
            <FormDrawer
                title="Cadastrando Aula"
                onClose={() =>{
                    reset({
                        id:"",
                        title: "",
                        module: "",
                        content: "",
                        link: "",
                        score: 0,
                      });
                      setVisibleCreate(false)
                } 
                }
                visible={visibleCreate}
                onSubmit={handleSubmit(handleCreateClass)}
                >

                <InputForm
                name="title"
                control={control}
                label="Título"
                />
               <SelectForm
                control={control}
                name="module"
                label="Módulo"
                options={moduleOptions ||  [{label: "Não há módulos", value: 0}]}
                />
                <InputForm
                name="content"
                control={control}
                 label="Conteúdo"
                 />
                <InputForm 
                control={control}
                name="link"
                label="Link para vídeo da aula"
                 />
                <InputForm
                name="score"
                control={control}
                label="Score"
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
                            module: "",
                            content: "",
                            link: "",
                            score: 0,
                        });
                    }}>
                    Limpar
                    </Button>
                </Form.Item>
            </FormDrawer>
            <FormDrawer
                title="Editando Aula"
                onClose={() =>{
                    reset({
                        title: "",
                        module: "",
                        content: "",
                        link: "",
                        score: 0,
                      });
                      setVisibleEdit(false)
                }}
                visible={visibleEdit}
                onSubmit={handleSubmit(handleUpdateClass)}
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
                name="module"
                label="Módulo"
                options={moduleOptions ||  [{label: "Não há módulos", value: 0}]}
                />
                <InputForm 
                control={control}
                name="content"
                label="Conteúdo" />
                <InputForm 
                control={control}
                name="link"
                label="Link para vídeo da aula" />
                <InputForm
                name="score"
                control={control}
                label="Score"
                />
                <Form.Item>
                <Button htmlType="submit" type="primary">
                    Salvar</Button>
                </Form.Item>
            </FormDrawer>
        </div>
    )
}