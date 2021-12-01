import { FarmaciaModel } from "../../domain/models/farmacia";
import { ListarFarmaciasUseCase } from "../../domain/useCases/listar-farmacias";
import { FarmaciaRepository } from "../contracts/farmacia-repository";

export class ListarFarmaciasService implements ListarFarmaciasUseCase {
    constructor (private readonly farmaciaRepository: FarmaciaRepository) {}
    async listar(): Promise<FarmaciaModel[]> {
        const farmacias = await this.farmaciaRepository.findAll()
        return farmacias
    }
}