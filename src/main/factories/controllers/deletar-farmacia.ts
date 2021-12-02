import { DeletarFarmaciaService } from "../../../data/services/deletar-farmacia"
import { FarmaciaRepositoryTypeORM } from "../../../infra/farmacia-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { DeletarFarmaciaController } from "../../../presentation/controllers/deletar-farmacia"
import { makeDeletarFarmaciaValidator } from "../validators/deletar-farmacia"

export const makeDeletarFarmaciaController = (): Controller => {
    const farmaciaRepository = new FarmaciaRepositoryTypeORM()
    const deletarFarmaciaService = new DeletarFarmaciaService(farmaciaRepository)
    return new DeletarFarmaciaController(makeDeletarFarmaciaValidator(), deletarFarmaciaService)
}