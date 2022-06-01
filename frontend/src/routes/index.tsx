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
        <Route path="/modules/create" element={<h1>Modules / Create</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
        <Route path="/users/create" element={<h1>Users / Create</h1>} />
      </Routes>
    </Private>
  );
}
