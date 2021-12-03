import { FarmaciaSedeRepository } from "../../../data/contracts/farmacia-sede-repository"
import { FarmaciaSede } from "../../../data/entities/farmarciaSede"
import { makeFarmaciaSede } from "../entities/farmaciaSede"

export const makeFarmaciaSedeRepository = (): FarmaciaSedeRepository => {
    class FarmaciaSedeRepositoryStub implements FarmaciaSedeRepository {
        async findAll(): Promise<FarmaciaSede[]> {
            return new Promise(resolve => resolve([makeFarmaciaSede(1)]))
        }

        async findById(): Promise<FarmaciaSede> {
            return new Promise(resolve => resolve(makeFarmaciaSede(1)))
        }

        async create(): Promise<FarmaciaSede> {
            return new Promise(resolve => resolve(makeFarmaciaSede(1)))
        }
    }
    return new FarmaciaSedeRepositoryStub()
}