export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type CurrentUser = Omit<AuthUser, "password">;

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: CurrentUser;
  };
}