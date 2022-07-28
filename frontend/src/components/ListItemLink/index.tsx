import { Button, Row } from "antd";
import {} from "@ant-design/icons";
import { Link } from "react-router-dom";

interface ListItemLinkProps {
  title: string;
  link: string;
  external?: boolean;
}
export function ListItemLink({ title, link, external }: ListItemLinkProps) {
  return (
    <Row justify="space-between" style={{ width: "100%", padding: "8px" }}>
      <h4>{title}</h4>
      {external ? (
        <a href={link} target="_blank">
          <Button>Acessar</Button>
        </a>
      ) : (
        <Link to={link}>
          <Button>Acessar</Button>
        </Link>
      )}
    </Row>
  );
}
