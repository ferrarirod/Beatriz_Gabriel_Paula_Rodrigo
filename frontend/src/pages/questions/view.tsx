import { Row, Alert, Radio, Space, Card, Button, Form, Input, Col } from "antd";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { Class } from "../../types/classType";
import { useEffect, useState, useCallback } from "react";


const data = [
    {
        content: (
            <p>
                We supply a series of design principles,
            </p>
        ),
    },
    {
        content: (
            <p>
                practical patterns and high quality design resources
            </p>
        ),
    },
    {
        content: (
            <p>
                to help people create their product prototypes beautifully and efficiently.
            </p>
        ),
    },
];


export function ViewQuestion() {
    const { id } = useParams();
    // const [selectedClass, setSelectedClass] = useState<Class>();
    const selectedQuestion = []

    async function getQuestion(id: string | undefined) {

    }
    async function getAnswers(id: string | undefined) {

    }


    const [value, setValue] = useState(1);

    const onChange = () => {
        setValue(3);
    };

    const validate = () => {
        return <Alert message="Success Text" type="success" />
    };

    useEffect(() => {
        getQuestion(id);
        getAnswers(id);
    }, []);

    return (
        <div
            className="class-container"
            style={{ maxWidth: "1000px", margin: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>Aula: </h2>


            <Alert style={{ marginBottom: 15 }} message="Resposta Certa" type="success" />
            <div className="class-content">
                <Card style={{ width: 900 }}>
                    <p>Pergunta Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt tristique eros, eget vehicula nulla faucibus at. Sed eget ipsum sagittis, porta nisi non, pulvinar lorem. Praesent magna lectus, tempor non erat in, vestibulum rutrum urna. Sed sodales euismod felis, vitae mattis orci sollicitudin sed. Sed varius eros eu lectus mattis, in feugiat nisi sagittis. Quisque tellus tellus, tempus eu ipsum sit amet, ullamcorper suscipit enim. Aliquam pulvinar odio ac urna ultrices sodales. Donec efficitur mi at risus dictum tincidunt. Ut ac nisl viverra, bibendum dolor ac, consequat arcu. Pellentesque aliquet, augue eget consectetur dictum, lectus metus tristique ligula, non maximus mi neque sit amet erat. Aliquam erat volutpat. Etiam pretium lorem at ultrices lacinia.</p>
                </Card>
            </div>
            <div style={{ height: "50%", display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", marginTop: 15 }}>
                    <Card style={{ width: 900 }}>
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                                <Radio value={1}>Option A dinonviniosnosfnofdsonidsonidsfonidsfniodsfinodsfniodsfonidsfonfdsniodsfonidsfniodsfonifdsonidsfonidsfinofdinofdsniofd</Radio>
                                <Radio value={2}>Option B iopvnieinjabniuesniemfciosmkndsoivsnvoinvidsvdsjvneiovnslkvksn</Radio>
                                <Radio value={3}>Option B iopvnieinjabniuesniemfciosmkndsoivsnvoinvidsvdsjvneiovnslkvksn</Radio>
                                <Radio value={4}>Option B iopvnieinjabniuesniemfciosmkndsoivsnvoinvidsvdsjvneiovnslkvksn</Radio>
                            </Space>
                        </Radio.Group>
                    </Card>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "spaceAround" }}>
                <Button type="primary" onClick={validate} style={{ marginTop: 20, width: 180, height: 40, marginRight: 270 }}>Confirmar Resposta</Button>
                <Button onClick={validate} style={{ marginTop: 20, width: 180, height: 40, marginLeft: 270 }}>Próxima Pergunta</Button>
            </div>
        </div>
    );
}
