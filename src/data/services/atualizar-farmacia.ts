import { UpdateFarmaciaModel } from "../../domain/models/updateFarmacia";
import { AtualizarFarmaciaUseCase } from "../../domain/useCases/atualizar-farmacia";
import { FarmaciaRepository } from "../contracts/farmacia-repository";

export class AtualizarFarmaciaService implements AtualizarFarmaciaUseCase {
    constructor(private readonly farmaciaRepository: FarmaciaRepository) { }
    async atualizar(data: UpdateFarmaciaModel): Promise<void | Error> {
        const farmacia = await this.farmaciaRepository.findById(data.id)
        if (!farmacia) {
            return new Error('Farmacia não encontrada!')
        }
        await this.farmaciaRepository.update(data)
    }
}