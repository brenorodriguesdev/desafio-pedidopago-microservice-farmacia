import { FarmaciaSede } from "../../../data/entities/farmarciaSede"
import { makeFarmacia } from "./farmacia"
import { makeFarmaciaFilialSemSede } from "./farmaciaFilial"

export const makeFarmaciaSede = (id : number): FarmaciaSede => {
    const farmaciaSede = new FarmaciaSede()
    farmaciaSede.id = id
    farmaciaSede.farmacia = makeFarmacia(4)
    farmaciaSede.filias =  [makeFarmaciaFilialSemSede(1)]
    return farmaciaSede
}