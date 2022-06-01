import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";

import {  useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Class } from "../../providers/DataProvider";
import { Table, Tag, Space, Drawer, Button, Form, Input, } from 'antd';
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
    link: number;
    password: string;
    confirmPassword: string;
}

  
export function ListClassesPage(){
    const [classes, setClasses] = useState<Class[]>();
    const [editing, setEditing] = useState(false);
    const [showing, setShowing] = useState(false);
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
        getClasses();
      },[]);

    async function updateClass(data:string){
        try {
            console.log('values to update', data)
            await api.put(`classes/${selectedClass?.id}`, data);
            getClasses();
        
        }catch(err){
        console.log('erro',JSON.stringify(err));
        }; 
    }


    const showDrawer = (action : string) => {
        if (action ==='editing')
        setEditing(true);
        else setShowing(true);
    };

    const onClose = () => {
        setEditing(false);
        setShowing(false);
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
    const onFinish = (values:string,action:string) => {
        if(action==="create")
        {
            console.log("create");
        }
        if(action==="edit")
        {
            updateClass(values);
        }
  
    }
    const columns: ColumnsType<Class> = [
        {
          title: 'Título',
          dataIndex: 'title',
          key: 'title',
          render: (text,record)=> <a onClick={()=> editClass(record)}>{text}</a>,
        },
        {
          title: 'Módulo',
          dataIndex: 'module',
          key: 'module',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={() =>showClass(record)}>Ver</a>
              <a onClick={() =>editClass(record)}>Edit</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
        
    return (
        <div>
            <h1>Lista de Aulas</h1>
            <Link to="/home" >Home</Link>
            <Table columns={columns} dataSource={classes} />
            <Drawer title={`${selectedClass?.title}`} 
                size="large" placement="right" 
                onClose={onClose} 
                visible={showing}
                contentWrapperStyle={{background: 'inkp'}}
                bodyStyle={{width: "100%", display:'flex', flexDirection:'column', justifyContent:'center'}}
                >
                <h1>{selectedClass?.title}</h1>
                <i>{selectedClass?.module}</i>
                <p>{selectedClass?.content}</p>
                <div className="h_iframe">
                    <iframe src={formatUrl(selectedClass?.link)} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </div>

            </Drawer>
            
            <Drawer 
                title={`Editar ${selectedClass?.title}`} 
                drawerStyle={{background:"pink"}}
                placement="right" 
                onClose={onClose} 
                visible={editing}
                bodyStyle={{width: "100%", display:'flex', flexDirection:'column', justifyContent:'start'}}

            >
                <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={(values: string) => onFinish(values, "edit")}
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
                        <Input defaultValue={selectedClass?.module}  />
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
            </Drawer>
        </div>
    )
}