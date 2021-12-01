import { FarmaciaModel } from "../../domain/models/farmacia";
import { CriarFarmaciaUseCase } from "../../domain/useCases/criar-farmacia";
import { FarmaciaRepository } from "../contracts/farmacia-repository";

export class CriarFarmaciaService implements CriarFarmaciaUseCase {
    constructor(private readonly farmaciaRepository: FarmaciaRepository) { }
    async criar(data: FarmaciaModel): Promise<void | Error> {
        await this.farmaciaRepository.create(data)
    }
}