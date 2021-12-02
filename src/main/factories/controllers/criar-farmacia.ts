import { CriarFarmaciaService } from "../../../data/services/criar-farmacia"
import { FarmaciaRepositoryTypeORM } from "../../../infra/farmacia-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { CriarFarmaciaController } from "../../../presentation/controllers/criar-farmacia"
import { makeCriarFarmaciaValidator } from "../validators/criar-farmacia"

export const makeCriarFarmaciaController = (): Controller => {
    const farmaciaRepository = new FarmaciaRepositoryTypeORM()
    const criarFarmaciaService = new CriarFarmaciaService(farmaciaRepository)
    return new CriarFarmaciaController(makeCriarFarmaciaValidator(), criarFarmaciaService)
}