import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { ListItemLink } from "../../components/ListItemLink";
import { api } from "../../services/api";
import { sortByCreatedAt } from "../../utils/sort";

interface Module {
  id: string;
  name: string;
  created_at: Date
}

interface Task {
  id: string;
  title: string;
}

export function DashboardStudent() {
  const [modules, setModules] = useState<Module[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = useCallback(async () => {
    api
      .get("/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getModules = useCallback(async () => {
    api
      .get("/modules")
      .then((response) => {
        setModules(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getModules();
    getTasks();
  }, []);

  return (
    <>
      <h1>Painel do Estudante</h1>
      <Row>
        <Col span={12}>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <h3 style={{ fontWeight: "bold" }}>Módulos</h3>
              {sortByCreatedAt(modules).map((module: Module) => (
                <ListItemLink
                  key={module.id}
                  title={module.name}
                  link={`/modules/${module.id}`}
                />
              ))}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <h3>Tarefas</h3>
              {sortByCreatedAt(tasks).map((task) => (
                <ListItemLink
                  key={task.id}
                  title={task.title}
                  link={`/tasks/${task.id}`}
                  external
                />
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
