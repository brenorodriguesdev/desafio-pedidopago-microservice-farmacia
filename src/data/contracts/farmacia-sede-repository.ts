import { Farmacia } from "../entities/farmacia";

export interface FarmaciaSedeRepository {
    create: (farmacia: Farmacia) => Promise<Farmacia>
}