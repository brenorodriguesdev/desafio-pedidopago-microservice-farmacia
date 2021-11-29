import { FarmaciaModel } from "./farmacia";

export interface FarmaciaSedeModel {
    id?: number
    sede: FarmaciaModel
    filias: FarmaciaModel[]
}