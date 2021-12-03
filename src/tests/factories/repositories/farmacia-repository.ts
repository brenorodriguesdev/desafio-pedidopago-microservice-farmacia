import { FarmaciaRepository } from "../../../data/contracts/farmacia-repository"
import { Farmacia } from "../../../data/entities/farmacia"
import { makeFarmacia } from "../entities/farmacia"

export const makeFarmaciaRepository = (): FarmaciaRepository => {
    class FarmaciaRepositoryStub implements FarmaciaRepository {
        async deleteById(): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async update(): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async findById(): Promise<Farmacia> {
            return new Promise(resolve => resolve(makeFarmacia(1)))
        }

        async findAll(): Promise<Farmacia[]> {
            return new Promise(resolve => resolve([makeFarmacia(1), makeFarmacia(2)]))
        }

        async create(): Promise<Farmacia> {
            return new Promise(resolve => resolve(makeFarmacia(1)))
        }
    }
    return new FarmaciaRepositoryStub()
}