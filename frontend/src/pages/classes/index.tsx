import { useContext , useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Class } from "../../providers/DataProvider";
import { Table, Tag, Space, Drawer, Button, Form, Input, } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { api } from '../../services/api';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const tailLayout = {
wrapperCol: { offset: 8, span: 16 },
};

export function ListClassesPage(){
    const [classes, setClasses] = useState<Class[]>();
    const [editing, setEditing] = useState(false);
    const [showing, setShowing] = useState(false);
    const [selectedClass, setSelectedClass ]= useState<Class>();

    async function getClasses () {
        console.log('getting classes')
        try {
            const response = await  api.get("classes");
            setClasses(response.data);
        
        }catch(err){
        console.log('erro',JSON.stringify(err));
        };
    }
   useEffect(()=>{
      getClasses();
      console.log('classes',classes?.length)
    },[]);

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
    const handleUrl = (url:string) => {
        url.replace("watch?v=", "embed/");
    }
    const onFinish = () => {
        
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
            <Drawer title={`${selectedClass?.title}`} placement="right" onClose={onClose} visible={showing}>
                <h1>{selectedClass?.title}</h1>
                <i>{selectedClass?.module}</i>
                <p>{selectedClass?.content}</p>

            </Drawer>
            
            <Drawer title={`Editar ${selectedClass?.title}`} placement="right" onClose={onClose} visible={editing}>
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
            </Drawer>
        </div>
    )
}