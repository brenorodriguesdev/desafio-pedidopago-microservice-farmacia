import { BuscarFarmaciaService } from "../../../data/services/buscar-farmacia"
import { FarmaciaRepositoryTypeORM } from "../../../infra/farmacia-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { BuscarFarmaciaController } from "../../../presentation/controllers/buscar-farmacia"
import { makeBuscarFarmaciaValidator } from "../validators/buscar-farmacia"

export const makeBuscarFarmaciaController = (): Controller => {
    const farmaciaRepository = new FarmaciaRepositoryTypeORM()
    const buscarFarmaciaService = new BuscarFarmaciaService(farmaciaRepository)
    return new BuscarFarmaciaController(makeBuscarFarmaciaValidator(), buscarFarmaciaService)
}