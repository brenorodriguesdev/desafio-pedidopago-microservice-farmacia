import { FarmaciaFilial } from "../../../data/entities/farmaciaFilial"
import { makeFarmacia } from "./farmacia"
import { makeFarmaciaSede } from "./farmaciaSede"

export const makeFarmaciaFilialSemSede = (id : number): FarmaciaFilial => {
    const farmaciaFilial = new FarmaciaFilial()
    farmaciaFilial.id = id
    farmaciaFilial.farmacia = makeFarmacia(1)
    return farmaciaFilial
}

export const makeFarmaciaFilial = (id : number): FarmaciaFilial => {
    const farmaciaFilial = new FarmaciaFilial()
    farmaciaFilial.id = id
    farmaciaFilial.farmacia = makeFarmacia(1)
    farmaciaFilial.farmaciaSede = makeFarmaciaSede(1)
    return farmaciaFilial
}