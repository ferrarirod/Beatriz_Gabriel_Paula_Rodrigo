import { TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";
import { Card } from "../../components/Card";
import { useAuth } from "../../hooks/auth";

export function ProfileUserPage() {
  const { user } = useAuth();
  return (
    <>
      <h1>Perfil</h1>
      <Card>
        <Avatar icon={<UserOutlined />} size={120} />

        <Col
          span={6}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 24px",
          }}>
          <b
            style={{
              fontSize: "56px",
            }}>
            {user.name}
          </b>
          <span>{user.type === 1 ? "Aluno" : "Administrador"}</span>
        </Col>
      </Card>
      <Row>
        <Col span={12}>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}>
              <h3>Conquistas</h3>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                }}>
                <div>
                  <Avatar
                    style={{ background: "#87d068", margin: "0 4px " }}
                    icon={<TrophyOutlined />}
                  />
                  O Bravador
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                }}>
                <div>
                  <Avatar
                    style={{ background: "#87d068", margin: "0 4px " }}
                    icon={<TrophyOutlined />}
                  />
                  O Bravador
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                }}>
                <div>
                  <Avatar
                    style={{ background: "#87d068", margin: "0 4px " }}
                    icon={<TrophyOutlined />}
                  />
                  O Bravador
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}>
              <h3>Aulas Concluídas</h3>
              <b
                style={{
                  fontSize: "36px",
                }}>
                27 aulas
              </b>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
