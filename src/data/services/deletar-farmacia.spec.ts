import { makeFarmaciaRepository } from "../../tests/factories/repositories/farmacia-repository"
import { FarmaciaRepository } from "../contracts/farmacia-repository"
import { DeletarFarmaciaService } from "./deletar-farmacia"

interface SutTypes {
    farmaciaRepository: FarmaciaRepository
    sut: DeletarFarmaciaService
}


const makeSut = (): SutTypes => {
    const farmaciaRepository = makeFarmaciaRepository()
    const sut = new DeletarFarmaciaService(farmaciaRepository)
    return {
        farmaciaRepository,
        sut
    }
}


describe('DeletarFarmacia Service', () => {
    test('Garantir que farmaciaRepository findById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const findByIdSpy = jest.spyOn(farmaciaRepository, 'findById')
        await sut.deletar(1)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o farmaciaRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o farmaciaRepository findById retornar nullo retornar um error', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.deletar(1)
        expect(error).toEqual(new Error('Farmacia não encontrada!'))
    })

    test('Garantir que farmaciaRepository deleteById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const deleteByIdSpy = jest.spyOn(farmaciaRepository, 'deleteById')
        await sut.deletar(1)
        expect(deleteByIdSpy).toHaveBeenCalledWith(1)
    })


    test('Garantir que se o farmaciaRepository deleteById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'deleteById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
    })
})