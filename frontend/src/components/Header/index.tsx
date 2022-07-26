import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export function HeaderProfile() {
  const { user } = useAuth();
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "100%",
          padding: "0 24px",
        }}>
        <Link to="/profile" style={{ display: "flex" }}>
          <div
            style={{
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              lineHeight: "16px",
              justifyContent: "center",
              margin: "0 16px",
            }}>
            <b>{user.name}</b>
            <small>{user.type === 1 ? "Aluno" : "Administrador"}</small>
          </div>
          <Avatar icon={<UserOutlined />} />
        </Link>
      </div>
    </Header>
  );
}
