import { CriarFarmaciaFilialService } from "../../../data/services/criar-FarmaciaFilial"
import { FarmaciaFilialRepositoryTypeORM } from "../../../infra/farmacia-filial-repository"
import { FarmaciaRepositoryTypeORM } from "../../../infra/farmacia-repository"
import { FarmaciaSedeRepositoryTypeORM } from "../../../infra/farmacia-sede-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { CriarFarmaciaFilialController } from "../../../presentation/controllers/criar-farmaciaFilial"
import { makeCriarFarmaciaFilialValidator } from "../validators/criar-farmaciaFilial"

export const makeCriarFarmaciaFilialController = (): Controller => {
    const farmaciaRepository = new FarmaciaRepositoryTypeORM()
    const farmaciaFilialRepository = new FarmaciaFilialRepositoryTypeORM()
    const farmaciaSedeRepository = new FarmaciaSedeRepositoryTypeORM()
    const criarFarmaciaFilialService = new CriarFarmaciaFilialService(farmaciaRepository, farmaciaFilialRepository, farmaciaSedeRepository)
    return new CriarFarmaciaFilialController(makeCriarFarmaciaFilialValidator(), criarFarmaciaFilialService)
}