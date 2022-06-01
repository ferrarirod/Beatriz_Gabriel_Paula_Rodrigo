import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { Private } from "../templates/Private";

export function AppRoutes() {
  return (
    <Private>
      <Routes>
        <Route path="/" element={<ListUsersPage />} />
        <Route path="/users" element={<h1>Users</h1>}/>
        <Route path="/users/create" element={<h1>Users / Create</h1>} />
      </Routes>
    </Private>
  );
}
