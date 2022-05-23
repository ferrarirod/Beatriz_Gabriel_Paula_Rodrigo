import { Layout, Menu } from "antd";
import { useState } from "react";
import { MenuLink } from "../MenuLink";
import { DashboardFilled } from "@ant-design/icons";

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
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <MenuLink to="/" text="Painel" icon={<DashboardFilled />} />
      </Menu>
    </Sider>
  );
}
