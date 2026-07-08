import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
 <BrowserRouter>
  <Routes>

    {/* Public Routes */}
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />

  </Routes>
</BrowserRouter>
  );
}

export default App;