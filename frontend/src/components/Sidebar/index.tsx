import { Layout, Menu } from "antd";
import { useState } from "react";
import { MenuLink } from "../MenuLink";
import {
  DashboardFilled,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export function SideBar() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}>
      <div
        className="logo"
        style={{ height: "40px", backgroundColor: "#c7c7c7", margin: "16px" }}
      />
      <Menu theme="dark"  mode="inline">
        <MenuLink to="/" key="1" text="Painel" icon={<DashboardFilled />} />
        <MenuLink to="/users" key="2" text="Usuários" icon={<UserOutlined />} />
      </Menu>
    </Sider>
  );
}
