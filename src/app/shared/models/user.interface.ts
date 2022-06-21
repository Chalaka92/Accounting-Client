export interface CurrentUser {
  token?: string;
  user: User;
}

export interface User {
  name: string;
  email: string;
  photo: string;
  role: string;
}
