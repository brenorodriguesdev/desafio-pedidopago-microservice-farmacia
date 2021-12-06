import { ListarFarmaciasModel } from "../../domain/models/listar-farmacias"
import { ListarFarmaciasUseCase } from "../../domain/useCases/listar-farmacias"
import { makeFarmacia } from "../../tests/factories/entities/farmacia"
import { makeFarmaciaSede } from "../../tests/factories/entities/farmaciaSede"
import { ListarFarmaciasController } from "./listar-farmacias"

interface SutTypes {
    listarFarmaciasUseCase: ListarFarmaciasUseCase,
    sut: ListarFarmaciasController
}

const makeListarFarmaciasUseCase = (): ListarFarmaciasUseCase => {
    class ListarFarmaciasUseCaseStub implements ListarFarmaciasUseCase {
        async listar(): Promise<ListarFarmaciasModel> {
            return new Promise(resolve => resolve({ farmacias: [makeFarmacia(1), makeFarmacia(2)] }))
        }
    }
    return new ListarFarmaciasUseCaseStub()
}

const makeSut = (): SutTypes => {
    const listarFarmaciasUseCase = makeListarFarmaciasUseCase()
    const sut = new ListarFarmaciasController(listarFarmaciasUseCase)
    return {
        listarFarmaciasUseCase,
        sut
    }
}

describe('ListarFarmacias controller', () => {

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarFarmaciasUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarFarmaciasUseCase, 'listar')
        await sut.handle()
        expect(listarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o criar retornar uma exceção repassará essa exceção', async () => {
        const { sut, listarFarmaciasUseCase } = makeSut()
        jest.spyOn(listarFarmaciasUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se tudo ocorrer normalmente retornar farmacias', async () => {
        const { sut } = makeSut()
        const farmacias = await sut.handle()
        expect(farmacias).toEqual({ farmacias: [makeFarmacia(1), makeFarmacia(2)] })
    })

})