import { ListarFarmaciasSedesModel } from "../../domain/models/listar-farmaciasSedes";
import { ListarFarmaciasSedesUseCase } from "../../domain/useCases/listar-farmaciasSedes";
import { FarmaciaSedeRepository } from "../contracts/farmacia-sede-repository";

export class ListarFarmaciasSedesService implements ListarFarmaciasSedesUseCase {
    constructor(private readonly farmaciaSedeRepository: FarmaciaSedeRepository) { }
    async listar(): Promise<ListarFarmaciasSedesModel> {
        const farmaciasSedes = await this.farmaciaSedeRepository.findAll()
        return {
            farmaciasSedes: farmaciasSedes.map(farmaciaSede => ({
                id: farmaciaSede.id,
                farmacia: farmaciaSede.farmacia,
                filias: farmaciaSede.filias.map(filial => filial.farmacia)
            }))
        }
    }
}