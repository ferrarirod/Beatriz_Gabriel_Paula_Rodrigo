import { Form, Select } from "antd";
import { Control, Controller } from "react-hook-form";

const { Option } = Select;

interface SelectFormProps {
  label: string;
  name: string;
  control: Control<any, any>;
  options: {
    label: string;
    value: any;
  }[];
  error?: any
}

export function SelectForm({ control, label, name, options, error }: SelectFormProps) {
  return (
    <Form.Item label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select {...field}>
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )}
      />
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </Form.Item>
  );
}
