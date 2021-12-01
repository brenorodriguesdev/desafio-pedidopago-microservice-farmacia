import { FarmaciaFilial } from "../entities/farmaciaFilial";

export interface FarmaciaFilialRepository {
    create: (farmaciaFilial: FarmaciaFilial) => Promise<FarmaciaFilial>
    findById: (id: number) => Promise<FarmaciaFilial>
    deleteById: (id: number) => Promise<void>
    count: () => Promise<number>
}