import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { ListClassesPage } from "../pages/classes";
import { ViewClass } from "../pages/classes/view";
import { ListModulesPage } from "../pages/modules";
import { ListCommentsPage } from "../pages/comments";
import { ListTasksPage } from "../pages/tasks";
import { Private } from "../templates/Private";
import { LoginPage } from "../pages/login";
import { ProfileUserPage } from "../pages/profile";
import { DashboardStudent } from "../pages/dashboard/student";
import { useAuth } from "../hooks/auth";
import { DashboardAdmin } from "../pages/dashboard/admin";
import { ListClassesByModule } from "../pages/classes/indexByModule";
import { PrivateForm } from "../templates/PrivateForm";
import { ShowTask } from "../pages/tasks/show";

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Private>
            {user.type === 1 ? <DashboardAdmin /> : <DashboardStudent />}
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
        path="/modules/:id"
        element={
          <Private>
            <ListClassesByModule />
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
        path="/comments"
        element={
          <Private>
            <ListModulesPage />
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
      <Route
        path="/tasks"
        element={
          <Private>
            <ListTasksPage />
          </Private>
        }
      />
      <Route
        path="/classes/view/:id"
        element={
          <Private>
            <ViewClass />
          </Private>
        }
      />

      <Route
        path="/tasks/:id"
        element={
          <PrivateForm>
            <ShowTask />
          </PrivateForm>
        }
      />

      {/* <Route path="/modules/create" element={<h1>Modules / Create</h1>} />
      <Route path="/users" element={<h1>Users</h1>} />
      <Route path="/users/create" element={<h1>Users / Create</h1>} /> */}
    </Routes>
  );
}

export { AppRoutes };
