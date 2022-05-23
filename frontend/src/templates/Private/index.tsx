import { ReactNode } from "react";
import { Layout } from "antd";
import { SideBar } from "../../components/Sidebar";
const { Header, Content, Footer } = Layout;

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
