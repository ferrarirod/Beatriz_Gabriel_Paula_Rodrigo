import { Drawer, Form } from "antd";
import { ReactNode } from "react";

interface FormDrawerProps {
  children: ReactNode;
  title: string;
  visible: boolean;
  onClose: () => void;
}

export function FormDrawer({
  children,
  title,
  visible,
  onClose,
}: FormDrawerProps) {
  return (
    <Drawer title={title} onClose={onClose} visible={visible}>
      <Form layout="vertical">{children}</Form>
    </Drawer>
  );
}
