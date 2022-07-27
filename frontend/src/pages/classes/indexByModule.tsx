import { Button, Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/Card";
import { api } from "../../services/api";

interface Class {
  id: string;
  title: string;
  module: string;
  content: string;
  link: string;
  score: number;
  created_at: Date
}

export function ListClassesByModule() {
  const { id } = useParams();

  const [classes, setClasses] = useState<Class[]>([]);

  const getClassesByModule = useCallback(async () => {
    api
      .get(`/classes/module/${id}`)
      .then((response) => {
        setClasses(response.data);
      })
      .catch((err) => {});
  }, [id]);

  useEffect(() => {
    getClassesByModule();
  }, []);
  return (
    <div>
      <h1>Aulas</h1>
      {classes.sort((a,b) => (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime()).map((c) => (
        <Card>
          <Row key={c.id} style={{ width: "100%" }}>
            <Col span={8}>
              <h4>{c.title}</h4>
            </Col>
            <Col span={8}>
              <p>{c.content.substring(0, 25)}...</p>
            </Col>
            <Col span={8}>
              <Link to={`/classes/view/${c.id}`}>
                <Button type="primary">Acessar</Button>
              </Link>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
}
