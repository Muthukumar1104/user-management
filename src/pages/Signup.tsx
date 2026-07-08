import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import SignupForm from "@/components/auth/SignupForm";
import { useAuth } from "@/hooks/useAuth";

import type { SignupFormValues } from "@/features/users/schema/signupSchema";

const Signup = () => {
  const navigate = useNavigate();

  const {
    signup,
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
    data: SignupFormValues
  ) => {
    try {
      await signup(data);

      toast.success("Account created successfully");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Signup failed"
      );
    }
  };

  return (
    <Container
      fluid
      className="vh-100 bg-light"
    >
      <Row className="h-100 justify-content-center align-items-center">
        <Col
          xs={11}
          sm={8}
          md={6}
          lg={5}
        >
          <SignupForm
            loading={loading}
            onSubmit={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;