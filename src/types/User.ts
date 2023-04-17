import { CompanyDTO } from "./Company";

export interface Login {
  email: string;
  senha: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleName: string;
  companyUid: string;
}

export interface UserDTO {
  userUid: string;
  enable: boolean;
  email: string;
  dataProfileUid: string;
  name: string;
  document: string;
  phoneNumber: string;
  companyDTO: CompanyDTO;
  roleName: string;
}

export interface TokenResponse {
  uid: string;
  userDTO: UserDTO;
  token: string;
  timeToken: string;
  expirationDate: string;
}
