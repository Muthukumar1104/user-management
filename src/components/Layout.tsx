import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import AppNavbar from "./AppNavbar";

const Layout = () => {
  return (
    <div className="min-vh-100 bg-light">
      <AppNavbar />

      <Container
        fluid
        className="py-4"
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;