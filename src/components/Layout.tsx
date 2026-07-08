import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-600 p-4 text-white font-bold">
        User Management
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;