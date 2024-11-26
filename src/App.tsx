import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";

// Define your routes
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "auth", element: <Auth /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true, // Enable the future flag
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
