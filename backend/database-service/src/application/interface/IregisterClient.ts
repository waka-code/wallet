import { ApiResponse } from "@epayco/shared-types";
import { Client, CreateClientData } from "../../domain/entities/client";

export interface RegisterClientUseCase {
  execute(clientData: CreateClientData): Promise<ApiResponse<Client>>;
}
