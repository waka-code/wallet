import { ClientRepository } from '../../domain/ports/clientRepository';
import { Client, CreateClientData } from '../../domain/entities/client';
import { ClientModel } from '../adapters/models/clientModel';

export const createClientRepository = (): ClientRepository => ({
  async create(clientData: CreateClientData): Promise<Client> {
    const clientDoc = new ClientModel(clientData);
    const savedClient = await clientDoc.save();
    
    return {
      id: savedClient._id.toString(),
      document: savedClient.document,
      names: savedClient.names,
      email: savedClient.email,
      cellphone: savedClient.cellphone,
      createdAt: savedClient.createdAt,
      updatedAt: savedClient.updatedAt
    };
  },

  async findByDocument(document: string): Promise<Client | null> {
    const clientDoc = await ClientModel.findOne({ document });
    if (!clientDoc) return null;

    return {
      id: clientDoc._id.toString(),
      document: clientDoc.document,
      names: clientDoc.names,
      email: clientDoc.email,
      cellphone: clientDoc.cellphone,
      createdAt: clientDoc.createdAt,
      updatedAt: clientDoc.updatedAt
    };
  },

  async findByDocumentAndCellphone(document: string, cellphone: string): Promise<Client | null> {
    const clientDoc = await ClientModel.findOne({ document, cellphone });
    if (!clientDoc) return null;

    return {
      id: clientDoc._id.toString(),
      document: clientDoc.document,
      names: clientDoc.names,
      email: clientDoc.email,
      cellphone: clientDoc.cellphone,
      createdAt: clientDoc.createdAt,
      updatedAt: clientDoc.updatedAt
    };
  },

  async findByEmail(email: string): Promise<Client | null> {
    const clientDoc = await ClientModel.findOne({ email });
    if (!clientDoc) return null;

    return {
      id: clientDoc._id.toString(),
      document: clientDoc.document,
      names: clientDoc.names,
      email: clientDoc.email,
      cellphone: clientDoc.cellphone,
      createdAt: clientDoc.createdAt,
      updatedAt: clientDoc.updatedAt
    };
  }
});
