import { Comment, List, Tooltip, Button, Form, Input } from 'antd';
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

export function ViewClass() {
    return (
        <div style={{height: "100vh"}}>
            <div style={{height: "50%", display: "flex", justifyContent: "center"}}>
                <iframe style={{height: "100%", width: "50%"}} src="https://www.youtube.com/embed/HE8hvjWGN_I" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
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