import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { ListClassesPage } from "../pages/classes";
import { ListModulesPage } from "../pages/modules"
import { Private } from "../templates/Private";

export function AppRoutes() {
  return (
    <Private>
      <Routes>
        <Route path="/" element={<ListUsersPage />} />
        <Route path="/classes" element={<ListClassesPage />} />
        <Route path="/modules" element={<ListModulesPage />} />
        <Route path="/modules/create" element={<h1>Modules / Create</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
        <Route path="/users/create" element={<h1>Users / Create</h1>} />
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/users" element={<ListUsersPage />}/>
        
      </Routes>
    </Private>
  );
}
