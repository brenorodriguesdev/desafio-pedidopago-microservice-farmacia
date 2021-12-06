import { FarmaciaModel } from "../../domain/models/farmacia"
import { BuscarFarmaciaUseCase } from "../../domain/useCases/buscar-farmacia"
import { makeFarmacia } from "../../tests/factories/entities/farmacia"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { BuscarFarmaciaController } from "./buscar-farmacia"

interface SutTypes {
    validator: Validator,
    buscarFarmaciaUseCase: BuscarFarmaciaUseCase,
    sut: BuscarFarmaciaController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makBuscarFarmaciaUseCase = (): BuscarFarmaciaUseCase => {
    class BuscarFarmaciaUseCaseStub implements BuscarFarmaciaUseCase {
        async buscar(): Promise<FarmaciaModel | Error> {
            return new Promise(resolve => resolve(makeFarmacia(1)))
        }
    }
    return new BuscarFarmaciaUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const buscarFarmaciaUseCase = makBuscarFarmaciaUseCase()
    const sut = new BuscarFarmaciaController(validator, buscarFarmaciaUseCase)
    return {
        validator,
        buscarFarmaciaUseCase,
        sut
    }
}

const makeRequest = (): GRPCRequest => ({
    request: { id: 1 },
    metadata: {}
})

describe('BuscarFarmacia controller', () => {
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


    test('Garantir que buscar seja chamado com os valores corretos', async () => {
        const { sut, buscarFarmaciaUseCase } = makeSut()
        const buscarSpy = jest.spyOn(buscarFarmaciaUseCase, 'buscar')
        await sut.handle(makeRequest())
        expect(buscarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o buscar retornar uma exceção repassará essa exceção', async () => {
        const { sut, buscarFarmaciaUseCase } = makeSut()
        jest.spyOn(buscarFarmaciaUseCase, 'buscar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o buscar uma error retornará uma exceção com esse error', async () => {
        const { sut, buscarFarmaciaUseCase } = makeSut()
        jest.spyOn(buscarFarmaciaUseCase, 'buscar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


    test('Garantir que se tudo ocorrer normalmente retornar uma farmacia', async () => {
        const { sut } = makeSut()
        const farmacia = await sut.handle(makeRequest())
        expect(farmacia).toEqual(makeFarmacia(1))
    })

})