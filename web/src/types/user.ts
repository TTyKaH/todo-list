export interface User {
  username: string;
  password: string;
  email?: string;
  id?: number;
  roles?: Array<Role>;
  accessToken?: string;
}

export type Role = "ROLE_USER" | "ROLE_MODERATOR" | "ROLE_ADMIN";