import { Form, Input, InputProps } from "antd";

interface InputFormProps extends InputProps {
  label: string;
}

export function InputForm({ label, value, ...rest }: InputFormProps) {
  return (
    <Form.Item label={label}>
      <Input value={value} {...rest} />
    </Form.Item>
  );
}
