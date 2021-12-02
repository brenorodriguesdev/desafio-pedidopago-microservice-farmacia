import { AtualizarFarmaciaService } from "../../../data/services/atualizar-farmacia"
import { FarmaciaRepositoryTypeORM } from "../../../infra/farmacia-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { AtualizarFarmaciaController } from "../../../presentation/controllers/atualizar-farmacia"
import { makeAtualizarFarmaciaValidator } from "../validators/atualizar-farmacia"

export const makeAtualizarFarmaciaController = (): Controller => {
    const farmaciaRepository = new FarmaciaRepositoryTypeORM()
    const atualizarFarmaciaService = new AtualizarFarmaciaService(farmaciaRepository)
    return new AtualizarFarmaciaController(makeAtualizarFarmaciaValidator(), atualizarFarmaciaService)
}