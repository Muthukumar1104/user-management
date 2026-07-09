import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/users/schema/loginSchema";

interface LoginFormProps {
  loading: boolean;
  error?: string;
  onSubmit: (
    data: LoginFormValues
  ) => Promise<void>;
}

const LoginForm = ({
  loading,
  error,
  onSubmit,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="border-0 shadow-lg rounded-4">
      <Card.Body className="p-5">

        <div className="text-center mb-4">
          <h2 className="fw-bold">
            Welcome Back
          </h2>

          <p className="text-muted mb-0">
            Sign in to continue
          </p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>

          {error && (
            <div
              className="alert alert-danger"
              data-testid="login-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Email */}

          <Form.Group className="mb-3">

            <Form.Label>
              Email Address
            </Form.Label>

            <Form.Control
              data-testid="login-email"
              type="email"
              placeholder="Enter your email"
              isInvalid={!!errors.email}
              {...register("email")}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>

          </Form.Group>

          {/* Password */}

          <Form.Group className="mb-4">

            <Form.Label>
              Password
            </Form.Label>

            <InputGroup>

              <Form.Control
                data-testid="login-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                isInvalid={!!errors.password}
                {...register("password")}
              />

              <Button
                variant="outline-secondary"
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </Button>

              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>

            </InputGroup>

          </Form.Group>

          {/* Remember Me */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <Form.Check
              type="checkbox"
              label="Remember Me"
            />

            <Link
              to="/forgot-password"
              className="text-decoration-none"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <Button
            data-testid="login-button"
            type="submit"
            variant="primary"
            className="w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </Button>

        </Form>

        <div className="text-center mt-4">

          <span className="text-muted">
            Don't have an account?
          </span>

          <Link
            to="/signup"
            className="ms-2 text-decoration-none fw-semibold"
          >
            Sign Up
          </Link>

        </div>

      </Card.Body>
    </Card>
  );
};

export default LoginForm;