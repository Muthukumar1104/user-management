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
  signupSchema,
  type SignupFormValues,
} from "@/features/users/schema/signupSchema";

interface SignupFormProps {
  loading: boolean;
  onSubmit: (
    data: SignupFormValues
  ) => Promise<void>;
}

const SignupForm = ({
  loading,
  onSubmit,
}: SignupFormProps) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="border-0 rounded-4 shadow-lg">
      <Card.Body className="p-5">

        <div className="mb-4 text-center">

          <h2 className="fw-bold">
            Create Account
          </h2>

          <p className="mb-0 text-muted">
            Sign up to continue
          </p>

        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>

          {/* First Name */}

          <Form.Group className="mb-3">

            <Form.Label>
              First Name
            </Form.Label>

            <Form.Control
              data-testid="signup-firstname"
              type="text"
              placeholder="Enter first name"
              isInvalid={!!errors.firstName}
              {...register("firstName")}
            />

            <Form.Control.Feedback type="invalid">
              {errors.firstName?.message}
            </Form.Control.Feedback>

          </Form.Group>

          {/* Last Name */}

          <Form.Group className="mb-3">

            <Form.Label>
              Last Name
            </Form.Label>

            <Form.Control
              data-testid="signup-lastname"
              type="text"
              placeholder="Enter last name"
              isInvalid={!!errors.lastName}
              {...register("lastName")}
            />

            <Form.Control.Feedback type="invalid">
              {errors.lastName?.message}
            </Form.Control.Feedback>

          </Form.Group>

          {/* Email */}

          <Form.Group className="mb-3">

            <Form.Label>
              Email Address
            </Form.Label>

            <Form.Control
              data-testid="signup-email"
              type="email"
              placeholder="Enter email"
              isInvalid={!!errors.email}
              {...register("email")}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>

          </Form.Group>

          {/* Password */}

          <Form.Group className="mb-3">

            <Form.Label>
              Password
            </Form.Label>

            <InputGroup>

              <Form.Control
                data-testid="signup-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                isInvalid={!!errors.password}
                {...register("password")}
              />

              <Button
                type="button"
                variant="outline-secondary"
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

          {/* Confirm Password */}

          <Form.Group className="mb-4">

            <Form.Label>
              Confirm Password
            </Form.Label>

            <InputGroup>

              <Form.Control
                data-testid="signup-confirm-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                isInvalid={
                  !!errors.confirmPassword
                }
                {...register(
                  "confirmPassword"
                )}
              />

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </Button>

              <Form.Control.Feedback type="invalid">
                {
                  errors.confirmPassword
                    ?.message
                }
              </Form.Control.Feedback>

            </InputGroup>

          </Form.Group>

          {/* Submit */}

          <Button
            data-testid="signup-button"
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
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

        </Form>

        <div className="mt-4 text-center">

          <span className="text-muted">
            Already have an account?
          </span>

          <Link
            to="/login"
            className="ms-2 text-decoration-none fw-semibold"
          >
            Login
          </Link>

        </div>

      </Card.Body>
    </Card>
  );
};

export default SignupForm;