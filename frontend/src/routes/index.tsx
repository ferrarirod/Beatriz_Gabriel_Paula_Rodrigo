import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { Private } from "../templates/Private";
import { LoginPage } from "../pages/login";

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
    </Routes>
  );
}


export { AppRoutes };
