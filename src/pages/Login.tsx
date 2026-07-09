import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormValues } from "@/features/users/schema/loginSchema";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

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
      console.log("Submitting login...", data);

      setLoginError("");

      await login(data);

      console.log("Login success");

      toast.success("Login successful");

      navigate("/", { replace: true });
    } catch (error) {
      console.log("Login failed:", error);

      setLoginError("Invalid email or password");
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
            error={loginError}
            onSubmit={handleSubmit}
          />
        </Col>

      </Row>

    </Container>
  );
};

export default Login;