import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";

import type { LoginFormValues } from "@/features/users/schema/loginSchema";

const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    loading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (
    data: LoginFormValues
  ) => {
    try {
      await login(data);

      toast.success("Login successful");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    }
  };

  return (
    <Container fluid className="vh-100 bg-light">

      <Row className="h-100 justify-content-center align-items-center">

        <Col
          xs={11}
          sm={8}
          md={6}
          lg={4}
        >
          <LoginForm
            loading={loading}
            onSubmit={handleSubmit}
          />
        </Col>

      </Row>

    </Container>
  );
};

export default Login;