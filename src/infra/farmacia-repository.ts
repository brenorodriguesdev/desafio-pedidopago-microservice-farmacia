import { getRepository } from 'typeorm'
import { FarmaciaRepository } from '../data/contracts/farmacia-repository'
import { Farmacia } from '../data/entities/farmacia'

export class FarmaciaRepositoryTypeORM implements FarmaciaRepository {
  async findAll (): Promise<Farmacia[]> {
    const farmaciaRepository = getRepository(Farmacia)
    return await farmaciaRepository.find()
  }

  async findById (id: number): Promise<Farmacia> {
    const farmaciaRepository = getRepository(Farmacia)
    return await farmaciaRepository.findOne(id)
  }

  async create (farmacia: Farmacia): Promise<Farmacia> {
    const farmaciaRepository = getRepository(Farmacia)
    farmacia.id = await farmaciaRepository.count() + 1
    return await farmaciaRepository.save(farmacia)
  }

  async deleteById (id: number): Promise<void> {
    const farmaciaRepository = getRepository(Farmacia)
    await farmaciaRepository.delete(id)
  }

  async update (farmacia: Farmacia): Promise<void> {
    const farmaciaRepository = getRepository(Farmacia)
    const { id } = farmacia
    delete farmacia.id
    await farmaciaRepository.update({ id }, farmacia)
  }
}