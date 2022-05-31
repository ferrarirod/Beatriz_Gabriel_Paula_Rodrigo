import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { ListClassesPage } from "../pages/classes";

import { Private } from "../templates/Private";

export function AppRoutes() {
  return (
    <Private>
      <Routes>
        <Route path="/" element={<ListUsersPage />} />
        <Route path="/classes" element={<ListClassesPage />} />
      </Routes>
    </Private>
  );
}
