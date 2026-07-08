import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "@/hooks/useAuth";

const AppNavbar = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const {
    user,
    logout,
    loading,
  } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login", {
        replace: true,
      });
    } catch {
      toast.error("Unable to logout");
    }
  };

  const handleNavigate = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      expanded={expanded}
      className="border-bottom shadow-sm py-3"
      sticky="top"
    >
      <Container fluid>

        {/* Logo */}

        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold fs-4 text-primary"
          onClick={handleNavigate}
        >
          📋 User Management
        </Navbar.Brand>

        {/* Mobile Toggle */}

        <Navbar.Toggle
          onClick={() =>
            setExpanded(!expanded)
          }
        />

        <Navbar.Collapse>

          {/* Left Menu */}

          <Nav className="me-auto ms-lg-4">

            <Nav.Link
              as={NavLink}
              to="/"
              end
              onClick={handleNavigate}
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/users"
              onClick={handleNavigate}
            >
              Users
            </Nav.Link>

          </Nav>

          {/* Right Menu */}

          <Dropdown align="end">

            <Dropdown.Toggle
              variant="light"
              className="d-flex align-items-center gap-2 border"
            >
              <div className="text-start">

                <div className="fw-semibold">
                  {user?.firstName} {user?.lastName}
                </div>

                <small className="text-muted">
                  {user?.email}
                </small>

              </div>

            </Dropdown.Toggle>

            <Dropdown.Menu>

              <Dropdown.Header>
                Signed in as
              </Dropdown.Header>

              <Dropdown.ItemText>
                {user?.email}
              </Dropdown.ItemText>

              <Dropdown.Divider />

              <Dropdown.Item
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </Dropdown.Item>

            </Dropdown.Menu>

          </Dropdown>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default AppNavbar;