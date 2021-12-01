import { FarmaciaSede } from "../entities/farmarciaSede";

export interface FarmaciaSedeRepository {
    create: (farmaciaSede: FarmaciaSede) => Promise<FarmaciaSede>
}