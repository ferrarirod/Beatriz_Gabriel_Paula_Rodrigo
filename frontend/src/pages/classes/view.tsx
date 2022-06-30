import { Comment, List, Tooltip, Button, Form, Input } from 'antd';
import { api } from '../../services/api';
import { useParams } from 'react-router-dom';
import { Class } from "../../types/classType";
import {  useEffect, useState, useCallback} from "react";




import moment from 'moment';


const { TextArea } = Input;

const data = [
    {
      author: 'Han Solo',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      author: 'Han Solo',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
];

interface CommentItem {
    author: string;
    avatar: string;
    content: React.ReactNode;
    datetime: string;
}

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

const formatUrl = (url:string | undefined) => {
  return url && url.replace("watch?v=", "embed/");
}


export function ViewClass() {
  const { id } = useParams();
  const [selectedClass, setSelectedClass ]= useState<Class>();

  async function getClass (id:string | undefined) {
    try {
        const response = await  api.get("classes/"+id);
        let data = response.data;
        //data.module= response.data.module.name;
        console.log('class',data[0]);

        setSelectedClass(data[0]);

        console.log(selectedClass);

        
    
    }catch(err){
    console.log('erro',JSON.stringify(err));
    };
  }

  useEffect(()=>{
    getClass(id);
  }, [])

    return (
        <div className="class-container">
                <h2>Aula: {selectedClass?.title}</h2>
                <h1><b>Módulo:</b> {selectedClass?.module.name}</h1>
                <b>Pontuação:</b> {selectedClass?.score} pontos
                <br/><br/>
                <h3>Conteúdo</h3>
                <div className="class-content">
                <div className="text-content" style={{width:"50%"}}>
                    <p>{selectedClass?.content}</p>
                </div>
                <div style={{ width: "50%",height: "300px", display: "flex", justifyContent: "center"}}>
                    <iframe style={{height: "100%", width: "100%"}} src={formatUrl(selectedClass?.link)} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
                </div>
                <div style={{height: "50%", display: "flex", justifyContent: "center"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <List
                            className="comment-list"
                            header={`${data.length} comentários`}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <li>
                                    <Comment
                                    author={item.author}
                                    content={item.content}
                                    datetime={item.datetime}
                                    />
                                </li>
                            )}
                        />
                        <>
                        <Form.Item>
                            <TextArea rows={4} /*onChange={} value={}*/ />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" /*loading={} onClick={}*/ type="primary">
                                Comentar
                            </Button>
                        </Form.Item>
                        </>
                    </div>
                </div>
        </div>
    );
}