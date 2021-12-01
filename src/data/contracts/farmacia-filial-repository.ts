import { FarmaciaFilial } from "../entities/farmaciaFilial";

export interface FarmaciaFilialRepository {
    create: (farmaciaFilial: FarmaciaFilial) => Promise<FarmaciaFilial>
    count: () => Promise<number>
}