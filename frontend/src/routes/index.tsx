import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListUsersPage />} />
    </Routes>
  );
}
