import { FarmaciaModel } from "../../domain/models/farmacia";
import { BuscarFarmaciaUseCase } from "../../domain/useCases/buscar-farmacia";
import { FarmaciaRepository } from "../contracts/farmacia-repository";

export class BuscarFarmaciaService implements BuscarFarmaciaUseCase {
    constructor(private readonly farmaciaRepository: FarmaciaRepository) { }
    async buscar(id: number): Promise<FarmaciaModel | Error> {
        const farmacia = await this.farmaciaRepository.findById(id)
        if (!farmacia) {
            return new Error('Farmacia não encontrada!')
        }
        return farmacia
    }
}