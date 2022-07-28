import { Card, Col, Row, List } from 'antd';

const data = [
    "Aula 1",
    "Aula 2",
    "Aula 3"
]

export function Certification()
{
    return (
        <>
            <h1>Certificados</h1>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Módulo 1 - Pontuação 13/30" bordered={true}>
                            <p style={{padding:2}}><b>Módulo de Introdução a Disciplina</b></p>
                            <List
                                size="large"
                                bordered
                                dataSource={data}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Módulo 2 - Pontuação 27/35" bordered={true}>
                        <p style={{padding:2}}><b>Conceitos básicos de Frontend</b></p>
                            <List
                                size="large"
                                bordered
                                dataSource={data}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Módulo 3 - Pontuação 37/40" bordered={true}>
                            <p style={{padding:2}}><b>Conceitos básicos de Backend</b></p>
                            <List
                                size="large"
                                bordered
                                dataSource={data}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}