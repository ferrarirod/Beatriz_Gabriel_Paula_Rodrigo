import { Menu } from "antd";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MenuLinkProps {
  to: string;
  text: string;
  icon: ReactNode;
  key: string;
}

export function MenuLink({ to, key, text, icon }: MenuLinkProps) {
  
  return (
    <Link to={to}>
      <Menu.Item key={key} icon={icon} >
        {text}
      </Menu.Item>
    </Link>
  );
}
