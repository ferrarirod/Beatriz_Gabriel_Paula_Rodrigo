import { ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
}

export function Auth({ children }: AuthProps) {
  return <>{children}</>;
}
