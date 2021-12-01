import { FarmaciaSedeModel } from "../../domain/models/farmaciaSede";
import { CriarFarmaciaSedeUseCase } from "../../domain/useCases/criar-farmaciaSede";
import { FarmaciaRepository } from "../contracts/farmacia-repository";
import { FarmaciaSedeRepository } from "../contracts/farmacia-sede-repository";

export class CriarFarmaciaSedeService implements CriarFarmaciaSedeUseCase {
    constructor(private readonly farmaciaRepository: FarmaciaRepository, private readonly farmaciaSedeRepository: FarmaciaSedeRepository) { }
    async criar(data: FarmaciaSedeModel): Promise<void | Error> {
        if (data.farmacia.id) {
            const farmacia = await this.farmaciaRepository.findById(data.farmacia.id)
            if (!farmacia) {
                return new Error('Essa farmacia não foi encontrada!')
            }
            await this.farmaciaSedeRepository.create({
                farmacia,
                filias: []
            })
        } else {
            const farmacia = await this.farmaciaRepository.create(data.farmacia)
            await this.farmaciaSedeRepository.create({
                farmacia,
                filias: []
            })
        }
    }
}