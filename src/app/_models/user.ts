export class User {
  id: number;
  userName: string;
  password?: string;
  firstName: string;
  lastName: string;
  token?: string;
  avatar?: string;
  roles: Role[];
}

export class Role {
  id: number;
  description: string;
}
