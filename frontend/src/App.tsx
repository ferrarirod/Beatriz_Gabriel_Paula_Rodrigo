import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";
import { AppAuthRoutes, AppRoutes } from "./routes";
import "./App.css";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <AppRoutes /> */}
        <AppAuthRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
