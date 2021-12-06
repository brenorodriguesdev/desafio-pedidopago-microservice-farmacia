import { CriarFarmaciaFilialModel } from "../../domain/models/criar-farmaciaFilial"
import { FarmaciaModel } from "../../domain/models/farmacia"
import { CriarFarmaciaFilialUseCase } from "../../domain/useCases/criar-farmaciaFilial"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { CriarFarmaciaFilialController } from "./criar-farmaciaFilial"

interface SutTypes {
    validator: Validator,
    criarFarmaciaFilialUseCase: CriarFarmaciaFilialUseCase,
    sut: CriarFarmaciaFilialController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeCriarFarmaciaFilialUseCase = (): CriarFarmaciaFilialUseCase => {
    class CriarFarmaciaFilialUseCaseStub implements CriarFarmaciaFilialUseCase {
        async criar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new CriarFarmaciaFilialUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarFarmaciaFilialUseCase = makeCriarFarmaciaFilialUseCase()
    const sut = new CriarFarmaciaFilialController(validator, criarFarmaciaFilialUseCase)
    return {
        validator,
        criarFarmaciaFilialUseCase,
        sut
    }
}
const makeFarmaciaModel = (): FarmaciaModel => ({
    id: 2,
    logo: 'logo',
    nome: 'nome',
    cnpj: 'cnpj',
    endereco: 'endereco',
    horarioFuncionamento: 'horarioFuncionamento',
    responsavel: 'responsavel',
    telefone: 'telefone',
    outros: 'outros'
})

const makeData = (): CriarFarmaciaFilialModel => ({
    farmacia: makeFarmaciaModel(),
    idFarmaciaSede: 2
})

const makeRequest = (): GRPCRequest => ({
    request: makeData(),
    metadata: {}
})

describe('CriarFarmaciaFilial controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeData())
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


    test('Garantir que criar seja chamado com os valores corretos', async () => {
        const { sut, criarFarmaciaFilialUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarFarmaciaFilialUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o criar retornar uma exceção repassará essa exceção', async () => {
        const { sut, criarFarmaciaFilialUseCase } = makeSut()
        jest.spyOn(criarFarmaciaFilialUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o criar uma error retornará uma exceção com esse error', async () => {
        const { sut, criarFarmaciaFilialUseCase } = makeSut()
        jest.spyOn(criarFarmaciaFilialUseCase, 'criar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })

})