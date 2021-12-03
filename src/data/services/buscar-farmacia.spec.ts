import { makeFarmacia } from "../../tests/factories/entities/farmacia"
import { makeFarmaciaRepository } from "../../tests/factories/repositories/farmacia-repository"
import { FarmaciaRepository } from "../contracts/farmacia-repository"
import { BuscarFarmaciaService } from "./buscar-farmacia"

interface SutTypes {
    farmaciaRepository: FarmaciaRepository
    sut: BuscarFarmaciaService
}


const makeSut = (): SutTypes => {
    const farmaciaRepository = makeFarmaciaRepository()
    const sut = new BuscarFarmaciaService(farmaciaRepository)
    return {
        farmaciaRepository,
        sut
    }
}

describe('BuscarFarmacia Service', () => {
    test('Garantir que farmaciaRepository findById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const findByIdSpy = jest.spyOn(farmaciaRepository, 'findById')
        await sut.buscar(1)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o farmaciaRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.buscar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o farmaciaRepository findById retornar nullo retornar um error', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.buscar(1)
        expect(error).toEqual(new Error('Farmacia não encontrada!'))
    })


    test('Garantir que se o tudo ocorrer normalmente retornar uma farmacia', async () => {
        const { sut } = makeSut()
        const farmacia = await sut.buscar(1)
        await expect(farmacia).toEqual(makeFarmacia(1))
    })
})