import { Layout, Menu, MenuProps } from "antd";
import { useState } from "react";
import { DashboardFilled, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/">Painel</Link>, "1", <DashboardFilled />),
  getItem(<Link to="/users">Usuários</Link>, "2", <UserOutlined />),
];

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
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
}
