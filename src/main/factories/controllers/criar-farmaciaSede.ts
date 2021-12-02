import { CriarFarmaciaSedeService } from "../../../data/services/criar-farmaciaSede"
import { FarmaciaRepositoryTypeORM } from "../../../infra/farmacia-repository"
import { FarmaciaSedeRepositoryTypeORM } from "../../../infra/farmacia-sede-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { CriarFarmaciaSedeController } from "../../../presentation/controllers/criar-farmaciaSede"
import { makeCriarFarmaciaSedeValidator } from "../validators/criar-farmaciaSede"

export const makeCriarFarmaciaSedeController = (): Controller => {
    const farmaciaRepository = new FarmaciaRepositoryTypeORM()
    const farmaciaSedeRepository = new FarmaciaSedeRepositoryTypeORM()
    const criarFarmaciaSedeService = new CriarFarmaciaSedeService(farmaciaRepository, farmaciaSedeRepository)
    return new CriarFarmaciaSedeController(makeCriarFarmaciaSedeValidator(), criarFarmaciaSedeService)
}