import { ListarFarmaciasService } from "../../../data/services/listar-farmacias"
import { FarmaciaRepositoryTypeORM } from "../../../infra/farmacia-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { ListarFarmaciasController } from "../../../presentation/controllers/listar-farmacias"

export const makeListarFarmaciasController = (): Controller => {
    const farmaciaRepository = new FarmaciaRepositoryTypeORM()
    const listarFarmaciasService = new ListarFarmaciasService(farmaciaRepository)
    return new ListarFarmaciasController(listarFarmaciasService)
}