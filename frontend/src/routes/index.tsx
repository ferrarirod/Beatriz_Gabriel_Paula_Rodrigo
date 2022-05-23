import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { Private } from "../templates/Private";

export function AppRoutes() {
  return (
    <Private>
      <Routes>
        <Route path="/" element={<ListUsersPage />} />
      </Routes>
    </Private>
  );
}
