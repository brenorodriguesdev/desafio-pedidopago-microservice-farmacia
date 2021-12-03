import { FarmaciaFilialRepository } from "../../../data/contracts/farmacia-filial-repository"
import { FarmaciaFilial } from "../../../data/entities/farmaciaFilial"
import { makeFarmaciaFilial } from "../entities/farmaciaFilial"

export const makeFarmaciaFilialRepository = (): FarmaciaFilialRepository => {
    class FarmaciaFilialRepositoryStub implements FarmaciaFilialRepository {
        async deleteById(): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async findById(): Promise<FarmaciaFilial> {
            return new Promise(resolve => resolve(makeFarmaciaFilial(1)))
        }

        async create(): Promise<FarmaciaFilial> {
            return new Promise(resolve => resolve(makeFarmaciaFilial(1)))
        }
    }
    return new FarmaciaFilialRepositoryStub()
}