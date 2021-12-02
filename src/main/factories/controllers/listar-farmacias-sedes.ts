import { ListarFarmaciasSedesService } from "../../../data/services/listar-farmacias-sedes"
import { FarmaciaSedeRepositoryTypeORM } from "../../../infra/farmacia-sede-repository"
import { Controller } from "../../../presentation/contracts/controller"
import { ListarFarmaciasSedesController } from "../../../presentation/controllers/listar-farmacias-sedes"

export const makeListarFarmaciasSedesController = (): Controller => {
    const farmaciaSedeRepository = new FarmaciaSedeRepositoryTypeORM()
    const listarFarmaciasService = new ListarFarmaciasSedesService(farmaciaSedeRepository)
    return new ListarFarmaciasSedesController(listarFarmaciasService)
}