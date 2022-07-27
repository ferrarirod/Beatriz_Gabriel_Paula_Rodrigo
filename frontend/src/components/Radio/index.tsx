import { Form, Radio, RadioProps } from "antd";
import { Control, Controller } from "react-hook-form";

interface RadioFormProps extends RadioProps {
  label: string;
  name: string;
  description?: string;
  options: {
    name: string;
    value: string;
  }[];
  control: Control<any, any>;
  error?: any;
}

export function RadioForm({
  label,
  value,
  control,
  name,
  error,
  description,
  options,
  ...rest
}: RadioFormProps) {
  return (
    <Form.Item style={{ textAlign: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", padding: "16px" }}>
        <b style={{ fontSize: "18px" }}>{label}</b>
        <small style={{ fontSize: "14px", marginBottom: "16px" }}>
          {description}
        </small>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Radio.Group {...field} buttonStyle="solid" size="large">
              {options.map((option) => (
                <Radio.Button key={option.value} value={option.value}>
                  {option.name}
                </Radio.Button>
              ))}
            </Radio.Group>
          )}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </Form.Item>
  );
}
