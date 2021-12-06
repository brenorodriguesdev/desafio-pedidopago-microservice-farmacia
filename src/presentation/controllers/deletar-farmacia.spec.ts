import { DeletarFarmaciaUseCase } from "../../domain/useCases/deletar-farmacia"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { DeletarFarmaciaController } from "./deletar-farmacia"

interface SutTypes {
    validator: Validator,
    deletarFarmaciaUseCase: DeletarFarmaciaUseCase,
    sut: DeletarFarmaciaController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeDeletarFarmaciaUseCase = (): DeletarFarmaciaUseCase => {
    class DeletarFarmaciaUseCaseStub implements DeletarFarmaciaUseCase {
        async deletar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new DeletarFarmaciaUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const deletarFarmaciaUseCase = makeDeletarFarmaciaUseCase()
    const sut = new DeletarFarmaciaController(validator, deletarFarmaciaUseCase)
    return {
        validator,
        deletarFarmaciaUseCase,
        sut
    }
}

const makeRequest = (): GRPCRequest => ({
    request: { id: 1 },
    metadata: {}
})

describe('DeletarFarmacia controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith({ id: 1 })
    })

    test('Garantir que se o validate retornar uma exceção repassará essa exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o validate retornar uma exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que deletar seja chamado com os valores corretos', async () => {
        const { sut, deletarFarmaciaUseCase } = makeSut()
        const deletarSpy = jest.spyOn(deletarFarmaciaUseCase, 'deletar')
        await sut.handle(makeRequest())
        expect(deletarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o deletar retornar uma exceção repassará essa exceção', async () => {
        const { sut, deletarFarmaciaUseCase } = makeSut()
        jest.spyOn(deletarFarmaciaUseCase, 'deletar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o deletar uma error retornará uma exceção com esse error', async () => {
        const { sut, deletarFarmaciaUseCase } = makeSut()
        jest.spyOn(deletarFarmaciaUseCase, 'deletar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })
})