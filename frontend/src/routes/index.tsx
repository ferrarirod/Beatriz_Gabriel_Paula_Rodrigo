import { Route, Routes } from "react-router-dom";
import { ListUsersPage } from "../pages/users";
import { ListClassesPage } from "../pages/classes";
import { ViewClass } from "../pages/classes/view";
import { ListModulesPage } from "../pages/modules";
import { ListTasksPage } from "../pages/tasks";
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
      <Route
        path="/tasks"
        element={
          <Private>
            <ListTasksPage />
          </Private>
        }
      />
      <Route path="/classes/view/:id"   element={
          <Private>
            <ViewClass />
          </Private>
        }/>

      {/* <Route path="/modules/create" element={<h1>Modules / Create</h1>} />
      <Route path="/users" element={<h1>Users</h1>} />
      <Route path="/users/create" element={<h1>Users / Create</h1>} /> */}
    </Routes>
  );
}

export { AppRoutes };
