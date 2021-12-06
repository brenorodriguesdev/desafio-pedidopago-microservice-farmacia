import { ListarFarmaciasSedesModel } from "../../domain/models/listar-farmaciasSedes"
import { ListarFarmaciasSedesUseCase } from "../../domain/useCases/listar-farmaciasSedes"
import { makeFarmaciaSede } from "../../tests/factories/entities/farmaciaSede"
import { ListarFarmaciasSedesController } from "./listar-farmacias-sedes"

interface SutTypes {
    listarFarmaciasSedesUseCase: ListarFarmaciasSedesUseCase,
    sut: ListarFarmaciasSedesController
}

const makeListarFarmaciasSedesUseCase = (): ListarFarmaciasSedesUseCase => {
    class ListarFarmaciasSedesUseCaseStub implements ListarFarmaciasSedesUseCase {
        async listar(): Promise<ListarFarmaciasSedesModel> {
            return new Promise(resolve => resolve({
                farmaciasSedes: [makeFarmaciaSede(1)].map(farmaciaSede => ({
                    id: farmaciaSede.id,
                    farmacia: farmaciaSede.farmacia,
                    filias: farmaciaSede.filias.map(filial => filial.farmacia)
                }))
            }))
        }
    }
    return new ListarFarmaciasSedesUseCaseStub()
}

const makeSut = (): SutTypes => {
    const listarFarmaciasSedesUseCase = makeListarFarmaciasSedesUseCase()
    const sut = new ListarFarmaciasSedesController(listarFarmaciasSedesUseCase)
    return {
        listarFarmaciasSedesUseCase,
        sut
    }
}

describe('ListarFarmaciasSedes controller', () => {

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarFarmaciasSedesUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarFarmaciasSedesUseCase, 'listar')
        await sut.handle()
        expect(listarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o criar retornar uma exceção repassará essa exceção', async () => {
        const { sut, listarFarmaciasSedesUseCase } = makeSut()
        jest.spyOn(listarFarmaciasSedesUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se tudo ocorrer normalmente retornar farmacias', async () => {
        const { sut } = makeSut()
        const farmacias = await sut.handle()
        expect(farmacias).toEqual({
            farmaciasSedes: [makeFarmaciaSede(1)].map(farmaciaSede => ({
                id: farmaciaSede.id,
                farmacia: farmaciaSede.farmacia,
                filias: farmaciaSede.filias.map(filial => filial.farmacia)
            }))
        })
    })

})