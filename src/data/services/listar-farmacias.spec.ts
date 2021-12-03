import { makeFarmacia } from "../../tests/factories/entities/farmacia"
import { makeFarmaciaRepository } from "../../tests/factories/repositories/farmacia-repository"
import { FarmaciaRepository } from "../contracts/farmacia-repository"
import { ListarFarmaciasService } from "./listar-farmacias"

interface SutTypes {
    farmaciaRepository: FarmaciaRepository
    sut: ListarFarmaciasService
}


const makeSut = (): SutTypes => {
    const farmaciaRepository = makeFarmaciaRepository()
    const sut = new ListarFarmaciasService(farmaciaRepository)
    return {
        farmaciaRepository,
        sut
    }
}

describe('ListarFarmacias Service', () => {
    test('Garantir que farmaciaRepository findAll seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const findAllSpy = jest.spyOn(farmaciaRepository, 'findAll')
        await sut.listar()
        expect(findAllSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o farmaciaRepository findAll retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findAll').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar farmacias', async () => {
        const { sut } = makeSut()
        const farmacia = await sut.listar()
        await expect(farmacia).toEqual({ farmacias: [makeFarmacia(1), makeFarmacia(2)] })
    })
})