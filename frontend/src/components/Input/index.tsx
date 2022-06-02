import { Form, Input, InputProps } from "antd";
import { Control, Controller } from "react-hook-form";

interface InputFormProps extends InputProps {
  label: string;
  name: string;
  control: Control<any, any>;
}

export function InputForm({
  label,
  value,
  control,
  name,
  ...rest
}: InputFormProps) {
  return (
    <Form.Item label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <Input {...field} {...rest} />}
      />
    </Form.Item>
  );
}