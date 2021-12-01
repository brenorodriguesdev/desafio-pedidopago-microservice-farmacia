import { getRepository } from 'typeorm'
import { FarmaciaFilialRepository } from '../data/contracts/farmacia-filial-repository'
import { FarmaciaFilial } from '../data/entities/farmaciaFilial'

export class FarmaciaFilialRepositoryTypeORM implements FarmaciaFilialRepository {

    async findById(id: number): Promise<FarmaciaFilial> {
        const farmaciaFilialRepository = getRepository(FarmaciaFilial)
        return await farmaciaFilialRepository.findOne(id, { relations: ['farmacia', 'farmaciaSede'] })
    }

    async create(farmaciaFilial: FarmaciaFilial): Promise<FarmaciaFilial> {
        const farmaciaFilialRepository = getRepository(FarmaciaFilial)
        return await farmaciaFilialRepository.save(farmaciaFilial)
    }

    async deleteById (id: number): Promise<void> {
        const farmaciaFilialRepository = getRepository(FarmaciaFilial)
        await farmaciaFilialRepository.delete(id)
      }

}