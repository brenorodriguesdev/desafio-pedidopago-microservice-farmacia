import { getRepository } from 'typeorm'
import { FarmaciaSedeRepository } from '../data/contracts/farmacia-sede-repository'
import { FarmaciaSede } from '../data/entities/farmarciaSede'

export class FarmaciaSedeRepositoryTypeORM implements FarmaciaSedeRepository {

    async findById(id: number): Promise<FarmaciaSede> {
        const farmaciaSedeRepository = getRepository(FarmaciaSede)
        return await farmaciaSedeRepository.findOne(id, { relations: ['farmacia', 'filias', 'filias.farmacia'] })
    }

    async create(farmaciaSede: FarmaciaSede): Promise<FarmaciaSede> {
        const farmaciaSedeRepository = getRepository(FarmaciaSede)
        farmaciaSede.id = await farmaciaSedeRepository.count() + 1
        return await farmaciaSedeRepository.save(farmaciaSede)
    }

}