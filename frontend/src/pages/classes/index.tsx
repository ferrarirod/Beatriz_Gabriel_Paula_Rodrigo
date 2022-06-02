import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {  useEffect, useState, useCallback} from "react";
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

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
interface FormClass {
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
    const { register, reset, getValues, control, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
          title: "",
          module: "",
          content: "",
          link: "",
          score: "",
        },
      });
      
    const [classes, setClasses] = useState<Class[]>();
    const [modules, setModules] = useState<Module[]>();
    const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
    const [visibleShow, setVisibleShow] = useState<boolean>(false);
    const [moduleOptions, setModuleOptions ]= useState<ModuleOption[]>();


    const [selectedClass, setSelectedClass ]= useState<Class>();

    async function getClasses () {
        try {
            const response = await  api.get("classes");
            setClasses(response.data);
        
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
                title: "",
                module: "",
                content: "",
                link: "",
                score: "",
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
            api.put("/classes", {
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
                title: "",
                module: "",
                content: "",
                link: "",
                score: "",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        [getClasses, reset]
        
    );

    async function updateClass(data:string){
        try {
            console.log('values to update', data)
            await api.put(`classes/${selectedClass?.id}`, data);
            getClasses();
        
        }catch(err){
        console.log('erro',JSON.stringify(err));
        }; 
    }

    async function deleteClass(data:Class){
        setSelectedClass(data);
        try {
            await api.delete(`classes/${selectedClass?.id}`);
            getClasses();
        
        }catch(err){
        console.log('erro',JSON.stringify(err));
        }; 
    }

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
          render: (text,record)=> <a onClick={()=> showClass(record)}>{text}</a>,
        },
        {
          title: 'Módulo',
          dataIndex: 'module',
          key: 'module',
          render: (text,record)=> <span>{record.module.name}</span>,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space>
            <Button
                onClick={() => {
                showClass(record);
                }}
            >
              <SearchOutlined />
            </Button>
            <Button
              type="primary"
              onClick={() => {
                reset({
                   title: _.title,
                   module: _.module.name,
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
                deleteClass(record);
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
                <div className="h_iframe">
                    <iframe src={formatUrl(selectedClass?.link)} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </div>

            </Drawer>
            <FormDrawer
                title="Cadastrando Aula"
                onClose={() => setVisibleCreate(false)}
                visible={visibleCreate}
                >

                <InputForm
                control={control}
                label="Título"
                {...register("title")}
                />
               <SelectForm
                control={control}
                name="module"
                label="Módulo"
                options={moduleOptions ||  [{label: "Não há módulos", value: 0}]}
                />
                <InputForm
                control={control}
                 label="Conteúdo" {...register("content")} 
                 />
                <InputForm
                control={control}
                label="Score"
                {...register("score")}
                />
                <Form.Item>
                <Button htmlType="submit" type="primary">
                    Cadastrar
                </Button>
                </Form.Item>
            </FormDrawer>
            <FormDrawer
                title="Editando Aula"
                onClose={() => setVisibleEdit(false)}
                visible={visibleEdit}
                >
                <InputForm
                control={control}
                label="Título"
                {...register("title")}
                value={getValues("title")}
                />
                <SelectForm
                control={control}
                name="module"
                label="Módulo"
                options={moduleOptions ||  [{label: "Não há módulos", value: 0}]}
                />
                <InputForm 
                control={control}
                label="Conteúdo" {...register("content")} value={getValues("content")} />
                <InputForm
                control={control}
                label="Score"
                {...register("score")}
                value={getValues("score")}
                />
                <Form.Item>
                <Button htmlType="submit" type="primary">
                    Salvar</Button>
                </Form.Item>
            </FormDrawer>
        </div>
    )
}