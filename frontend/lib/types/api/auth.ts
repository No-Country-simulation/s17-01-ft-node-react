export interface LoginResponse {
  status:  string;
  message: string;
  payload: Payload;
}

export interface Payload {
  user:  User;
  token: string;
}

export interface User {
  id:       number;
  username: string;
  email:    string;
  role:     string;
  rating:   null;
  status:   boolean;
  avatar:   string;
}
