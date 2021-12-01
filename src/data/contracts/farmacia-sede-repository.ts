import { FarmaciaSede } from "../entities/farmarciaSede";

export interface FarmaciaSedeRepository {
    create: (farmaciaSede: FarmaciaSede) => Promise<FarmaciaSede>
    findById: (id: number) => Promise<FarmaciaSede>
}