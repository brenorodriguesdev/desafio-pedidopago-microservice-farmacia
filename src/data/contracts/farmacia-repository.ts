import { Farmacia } from "../entities/farmacia";

export interface FarmaciaRepository {
    create: (farmacia: Farmacia) => Promise<Farmacia>
    update: (farmacia: Farmacia) => Promise<void>
    findAll: () => Promise<Farmacia[]>
    findById: (id: number) => Promise<Farmacia>
    deleteById: (id: number) => Promise<void>
}