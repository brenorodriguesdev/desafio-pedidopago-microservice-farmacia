import { FarmaciaModel } from "../models/farmacia";

export interface ListarFarmaciaUseCase {
    listar: () => Promise<FarmaciaModel[]>
}