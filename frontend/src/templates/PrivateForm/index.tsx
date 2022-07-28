import { ReactNode } from "react";
import { Layout } from "antd";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
const { Content, Footer } = Layout;

interface PrivateProps {
  children: ReactNode;
}

export function PrivateForm({ children }: PrivateProps) {
  const { user } = useAuth();

  if (user) {
    return (
      <Layout>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Content style={{ maxWidth: "900px" }}>{children}</Content>
        </div>
        <Footer style={{ textAlign: "center" }}>
          Web Masters ©2022 Created by BGPR
        </Footer>
      </Layout>
    );
  }

  return <Navigate replace to="/login" />;
}
