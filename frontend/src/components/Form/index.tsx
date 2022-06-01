import { Drawer, Form } from "antd";
import { ReactNode } from "react";

interface FormDrawerProps {
  children: ReactNode;
  title: string;
  visible: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function FormDrawer({
  children,
  title,
  visible,
  onClose,
  onSubmit
}: FormDrawerProps) {
  return (
    <Drawer title={title} onClose={onClose} visible={visible}>
      <Form layout="vertical" onFinish={onSubmit}>{children}</Form>
    </Drawer>
  );
}
