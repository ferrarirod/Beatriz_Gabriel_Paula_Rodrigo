import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { Private } from "../templates/Private";
import { Auth } from "../templates/Auth";
import { LoginPage } from "../pages/login";

export function AppRoutes() {
  return (
    <Private>
      <Routes>
        <Route path="/" element={<ListUsersPage />} />
      </Routes>
    </Private>
  );
}

export function AppAuthRoutes()
{
  return (
    <Auth>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </Auth>
  );
}
