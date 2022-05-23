import { Menu } from "antd";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const { Item } = Menu;

interface MenuLinkProps {
  to: string;
  text: string;
  icon: ReactNode;
}

export function MenuLink({ to, text, icon }: MenuLinkProps) {
  return (
    <Link to={to}>
      <Item icon={icon}>
        {text}
      </Item>
    </Link>
  );
}
