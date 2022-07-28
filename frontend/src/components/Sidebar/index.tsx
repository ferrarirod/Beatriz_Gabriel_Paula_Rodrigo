import { Layout, Menu, MenuProps } from "antd";
import { useState } from "react";
import {
  BookOutlined,
  DashboardFilled,
  PlayCircleOutlined,
  UserOutlined,
  PoweroffOutlined,
  CheckSquareOutlined,
  CommentOutlined,
  OrderedListOutlined,
  QuestionOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

const Logo = require("../../assets/webmaster-bg-full.png");

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

export function SideBar() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { signOut, user } = useAuth();

  const items: MenuItem[] = [
    getItem(<Link to="/">Painel</Link>, "1", <DashboardFilled />),
    getItem(
      <Link to="/leaderboard">Classificação</Link>,
      "2",
      <OrderedListOutlined />
    ),
  ];

  if (user.type === 0) {
    items.push(
      ...[
        getItem(<Link to="/users">Usuários</Link>, "3", <UserOutlined />),
        getItem(<Link to="/modules">Modulos</Link>, "4", <BookOutlined />),
        getItem(<Link to="/classes">Aulas</Link>, "5", <PlayCircleOutlined />),
        getItem(<Link to="/tasks">Tarefas</Link>, "6", <CheckSquareOutlined />),
        getItem(
          <Link to="/questions">Questões</Link>,
          "7",
          <QuestionOutlined />
        ),
        getItem(
          <Link to="/comments">Comentários</Link>,
          "8",
          <CommentOutlined />
        ),
        getItem(<Link to="/awards">Prêmios</Link>, "9", <TrophyOutlined />),
      ]
    );
  }

  items.push(
    getItem(
      <Link to="/login" onClick={signOut}>
        Sair
      </Link>,
      "10",
      <PoweroffOutlined />
    )
  );
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <img
        className="logo"
        src={Logo}
        alt="Web Master"
        style={{ height: "64px", width: "104px", margin: "0 50px" }}
      />
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
}
