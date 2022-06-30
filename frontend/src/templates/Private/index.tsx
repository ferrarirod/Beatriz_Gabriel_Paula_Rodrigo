import { ReactNode } from "react";
import { Layout } from "antd";
import { SideBar } from "../../components/Sidebar";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { HeaderProfile } from "../../components/Header";
const { Content, Footer } = Layout;

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const { user } = useAuth();

  if (user) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout className="site-layout">
          <HeaderProfile />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Web Masters ©2022 Created by BGPR
          </Footer>
        </Layout>
      </Layout>
    );
  }

  return <Navigate replace to="/login" />;
}
