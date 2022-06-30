import { Row } from "antd";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}
export function Card({ children }: CardProps) {
  return (
    <Row
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: "16px",
        boxShadow: "5px 5px 5px #999",
        margin: "8px",
      }}>
      {children}
    </Row>
  );
}
