import type {
  AuthUser,
  LoginPayload,
  SignupPayload,
} from "./auth";

export interface AuthContextType {
  user: Omit<AuthUser, "password"> | null;

  token: string | null;

  loading: boolean;

  isAuthenticated: boolean;

  login: (
    payload: LoginPayload
  ) => Promise<void>;

  signup: (
    payload: SignupPayload
  ) => Promise<void>;

  logout: () => Promise<void>;
}