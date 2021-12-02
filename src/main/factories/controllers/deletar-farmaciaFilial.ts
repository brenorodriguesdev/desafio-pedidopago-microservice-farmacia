import { DeletarFarmaciaFilialService } from "../../../data/services/deletar-farmaciaFilial"
import { FarmaciaFilialRepositoryTypeORM } from "../../../infra/farmacia-filial-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { DeletarFarmaciaFilialController } from "../../../presentation/controllers/deletar-farmaciaFilial"
import { makeDeletarFarmaciaFilialValidator } from "../validators/deletar-farmaciaFilial"

export const makeDeletarFarmaciaFilialController = (): Controller => {
    const farmaciaFilialRepository = new FarmaciaFilialRepositoryTypeORM()
    const deletarFarmaciaFilialService = new DeletarFarmaciaFilialService(farmaciaFilialRepository)
    return new DeletarFarmaciaFilialController(makeDeletarFarmaciaFilialValidator(), deletarFarmaciaFilialService)
}