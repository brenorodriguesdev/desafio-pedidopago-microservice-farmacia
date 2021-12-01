import { CriarFarmaciaFilialModel } from "../../domain/models/criar-farmaciaFilial";
import { CriarFarmaciaFilialUseCase } from "../../domain/useCases/criar-farmaciaFilial";
import { FarmaciaFilialRepository } from "../contracts/farmacia-filial-repository";
import { FarmaciaRepository } from "../contracts/farmacia-repository";
import { FarmaciaSedeRepository } from "../contracts/farmacia-sede-repository";

export class CriarFarmaciaFilialService implements CriarFarmaciaFilialUseCase {
    constructor(private readonly farmaciaRepository: FarmaciaRepository, private readonly farmaciaSedeRepository: FarmaciaSedeRepository, private readonly farmaciaFilialRepository: FarmaciaFilialRepository) { }
    async criar(data: CriarFarmaciaFilialModel): Promise<void | Error> {
        if (data.farmacia.id) {
            const farmacia = await this.farmaciaRepository.findById(data.farmacia.id)
            
            if (!farmacia) {
                return new Error('Essa farmacia não foi encontrada!')
            }
            const farmaciaSede = await this.farmaciaSedeRepository.findById(data.idFarmaciaSede)

            if (!farmaciaSede) {
                return new Error('Essa farmacia sede não foi encontrada!')
            }
            if (farmaciaSede.filias,length >= 3) {
                return new Error('Só é possível adicionar 3 farmacias filias a uma farmacia sede')
            }

            await this.farmaciaFilialRepository.create({
                farmacia,
                farmaciaSede
            })
        } else {
            const farmacia = await this.farmaciaRepository.create(data.farmacia)
            const farmaciaSede = await this.farmaciaSedeRepository.findById(data.idFarmaciaSede)

            if (!farmaciaSede) {
                return new Error('Essa farmacia sede não foi encontrada!')
            }

            if (farmaciaSede.filias,length >= 3) {
                return new Error('Só é possível adicionar 3 farmacias filias a uma farmacia sede')
            }

            await this.farmaciaFilialRepository.create({
                farmacia,
                farmaciaSede
            })
        }
    }
}