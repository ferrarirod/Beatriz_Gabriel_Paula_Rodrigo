import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { ListClassesPage } from "../pages/classes";
import { ListModulesPage } from "../pages/modules";
import { Private } from "../templates/Private";
import { LoginPage } from "../pages/login";
import { ProfileUserPage } from "../pages/profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Private>
            <h1>Home</h1>
          </Private>
        }
      />
      <Route
        path="/users"
        element={
          <Private>
            <ListUsersPage />
          </Private>
        }
      />

      <Route
        path="/modules"
        element={
          <Private>
            <ListModulesPage />
          </Private>
        }
      />
      <Route
        path="/classes"
        element={
          <Private>
            <ListClassesPage />
          </Private>
        }
      />
     <Route
        path="/profile"
        element={
          <Private>
            <ProfileUserPage />
          </Private>
        }
      />
    </Routes>
  );
}

export { AppRoutes };
