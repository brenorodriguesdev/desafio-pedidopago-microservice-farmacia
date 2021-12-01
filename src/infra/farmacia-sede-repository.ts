import { getRepository } from 'typeorm'
import { FarmaciaSedeRepository } from '../data/contracts/farmacia-sede-repository'
import { FarmaciaSede } from '../data/entities/farmarciaSede'

export class FarmaciaSedeRepositoryTypeORM implements FarmaciaSedeRepository {

    async findById(id: number): Promise<FarmaciaSede> {
        const farmaciaSedeRepository = getRepository(FarmaciaSede)
        return await farmaciaSedeRepository.findOne(id, { relations: ['farmacia', 'filias'] })
    }

    async create(farmaciaSede: FarmaciaSede): Promise<FarmaciaSede> {
        const farmaciaSedeRepository = getRepository(FarmaciaSede)
        return await farmaciaSedeRepository.save(farmaciaSede)
    }

}