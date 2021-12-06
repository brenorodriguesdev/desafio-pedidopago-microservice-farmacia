import { DeletarFarmaciaFilialUseCase } from "../../domain/useCases/deletar-farmaciaFilial"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { DeletarFarmaciaFilialController } from "./deletar-farmaciaFilial"

interface SutTypes {
    validator: Validator,
    deletarFarmaciaFilialUseCase: DeletarFarmaciaFilialUseCase,
    sut: DeletarFarmaciaFilialController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeDeletarFarmaciaFilialUseCase = (): DeletarFarmaciaFilialUseCase => {
    class DeletarFarmaciaFilialUseCaseStub implements DeletarFarmaciaFilialUseCase {
        async deletar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new DeletarFarmaciaFilialUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const deletarFarmaciaFilialUseCase = makeDeletarFarmaciaFilialUseCase()
    const sut = new DeletarFarmaciaFilialController(validator, deletarFarmaciaFilialUseCase)
    return {
        validator,
        deletarFarmaciaFilialUseCase,
        sut
    }
}

const makeRequest = (): GRPCRequest => ({
    request: { id: 1 },
    metadata: {}
})

describe('DeletarFarmaciaFilial controller', () => {
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
        const { sut, deletarFarmaciaFilialUseCase } = makeSut()
        const deletarSpy = jest.spyOn(deletarFarmaciaFilialUseCase, 'deletar')
        await sut.handle(makeRequest())
        expect(deletarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o deletar retornar uma exceção repassará essa exceção', async () => {
        const { sut, deletarFarmaciaFilialUseCase } = makeSut()
        jest.spyOn(deletarFarmaciaFilialUseCase, 'deletar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o deletar uma error retornará uma exceção com esse error', async () => {
        const { sut, deletarFarmaciaFilialUseCase } = makeSut()
        jest.spyOn(deletarFarmaciaFilialUseCase, 'deletar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })
})