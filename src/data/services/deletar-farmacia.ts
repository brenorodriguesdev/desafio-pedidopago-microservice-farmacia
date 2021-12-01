import { DeletarFarmaciaUseCase } from "../../domain/useCases/deletar-farmacia";
import { FarmaciaRepository } from "../contracts/farmacia-repository";

export class DeletarFarmaciaService implements DeletarFarmaciaUseCase {
    constructor(private readonly farmaciaRepository: FarmaciaRepository) { }
    async deletar(id: number): Promise<void | Error> {
        const farmacia = await this.farmaciaRepository.findById(id)
        if (!farmacia) {
            return new Error('Farmacia não encontrada!')
        }
        await this.farmaciaRepository.deleteById(id)
    }
}