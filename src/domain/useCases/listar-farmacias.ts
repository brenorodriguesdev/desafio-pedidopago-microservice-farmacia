import { FarmaciaModel } from "../models/farmacia";

export interface ListarFarmaciasUseCase {
    listar: () => Promise<FarmaciaModel[]>
}