import { DeletarFarmaciaFilialUseCase } from "../../domain/useCases/deletar-farmaciaFilial";
import { FarmaciaFilialRepository } from "../contracts/farmacia-filial-repository";

export class DeletarFarmaciaFilialService implements DeletarFarmaciaFilialUseCase {
    constructor(private readonly farmaciaFilialRepository: FarmaciaFilialRepository) { }
    async deletar(id: number): Promise<void | Error> {
        const farmaciaFilial = await this.farmaciaFilialRepository.findById(id)
        if (!farmaciaFilial) {
            return new Error('Farmacia Filial não encontrada!')
        }
        await this.farmaciaFilialRepository.deleteById(id)
    }
}