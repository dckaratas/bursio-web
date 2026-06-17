import Cookies from "js-cookie";
import { Role } from "@/types";

const TOKEN_KEY = "bursio_token";
const ROLE_KEY = "bursio_role";
const EMAIL_KEY = "bursio_email";

export const saveAuth = (token: string, role: Role, email: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); // 1 gün
  Cookies.set(ROLE_KEY, role, { expires: 1 });
  Cookies.set(EMAIL_KEY, email, { expires: 1 });
};

export const getToken = (): string | undefined => Cookies.get(TOKEN_KEY);
export const getRole = (): Role | undefined => Cookies.get(ROLE_KEY) as Role;
export const getEmail = (): string | undefined => Cookies.get(EMAIL_KEY);

export const isAuthenticated = (): boolean => !!getToken();

export const clearAuth = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(ROLE_KEY);
  Cookies.remove(EMAIL_KEY);
};