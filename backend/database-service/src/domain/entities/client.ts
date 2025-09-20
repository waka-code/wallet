export interface Client {
  id: string;
  document: string;
  names: string;
  email: string;
  cellphone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientData {
  document: string;
  names: string;
  email: string;
  cellphone: string;
}
