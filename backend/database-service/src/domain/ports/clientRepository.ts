import { Client, CreateClientData } from '../entities/client';

export interface ClientRepository {
  create(clientData: CreateClientData): Promise<Client>;
  findByDocument(document: string): Promise<Client | null>;
  findByDocumentAndCellphone(document: string, cellphone: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
}
