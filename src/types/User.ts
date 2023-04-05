import type { Address } from "./Address";
import type { CompanyInfo } from "./Company";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: CompanyInfo;
};
