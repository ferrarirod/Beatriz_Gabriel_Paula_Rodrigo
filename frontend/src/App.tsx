import { BrowserRouter } from "react-router-dom";
import { AuthProvider} from "./hooks/auth";
import { AppRoutes } from "./routes";
import "./App.css";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
