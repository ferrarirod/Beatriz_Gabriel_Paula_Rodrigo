import { Menu } from "antd";
import { ReactNode } from "react";

const { Item } = Menu;

interface MenuLinkProps {
  to: string;
  text: string;
  icon: ReactNode;
  key: string;
}

export function MenuLink({ to, key, text, icon }: MenuLinkProps) {
  return (
    <Item key={key} icon={icon}>
      {text}
    </Item>
  );
}
