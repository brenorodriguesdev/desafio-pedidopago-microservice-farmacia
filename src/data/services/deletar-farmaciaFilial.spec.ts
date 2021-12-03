import { makeFarmaciaFilialRepository } from "../../tests/factories/repositories/farmacia-filial-repository"
import { FarmaciaFilialRepository } from "../contracts/farmacia-filial-repository"
import { DeletarFarmaciaFilialService } from "./deletar-farmaciaFilial"

interface SutTypes {
    farmaciaFilialRepository: FarmaciaFilialRepository
    sut: DeletarFarmaciaFilialService
}


const makeSut = (): SutTypes => {
    const farmaciaFilialRepository = makeFarmaciaFilialRepository()
    const sut = new DeletarFarmaciaFilialService(farmaciaFilialRepository)
    return {
        farmaciaFilialRepository,
        sut
    }
}


describe('DeletarFarmaciaFilial Service', () => {
    test('Garantir que farmaciaFilialRepository findById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        const findByIdSpy = jest.spyOn(farmaciaFilialRepository, 'findById')
        await sut.deletar(1)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o farmaciaFilialRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        jest.spyOn(farmaciaFilialRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o farmaciaFilialRepository findById retornar nullo retornar um error', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        jest.spyOn(farmaciaFilialRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.deletar(1)
        expect(error).toEqual(new Error('Farmacia Filial não encontrada!'))
    })

    test('Garantir que farmaciaFilialRepository deleteById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        const deleteByIdSpy = jest.spyOn(farmaciaFilialRepository, 'deleteById')
        await sut.deletar(1)
        expect(deleteByIdSpy).toHaveBeenCalledWith(1)
    })


    test('Garantir que se o farmaciaFilialRepository deleteById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        jest.spyOn(farmaciaFilialRepository, 'deleteById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
    })
})