import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { ListModulesPage } from "../pages/modules"
import { Private } from "../templates/Private";

export function AppRoutes() {
  return (
    <Private>
      <Routes>
        <Route path="/" element={<ListUsersPage />} />
        <Route path="/modules" element={<ListModulesPage />} />
      </Routes>
    </Private>
  );
}
