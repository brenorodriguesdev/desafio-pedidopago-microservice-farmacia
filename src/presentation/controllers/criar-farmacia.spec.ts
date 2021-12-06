import { FarmaciaModel } from "../../domain/models/farmacia"
import { CriarFarmaciaUseCase } from "../../domain/useCases/criar-farmacia"
import { makeFarmacia } from "../../tests/factories/entities/farmacia"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { CriarFarmaciaController } from "./criar-farmacia"

interface SutTypes {
    validator: Validator,
    criarFarmaciaUseCase: CriarFarmaciaUseCase,
    sut: CriarFarmaciaController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeCriarFarmaciaUseCase = (): CriarFarmaciaUseCase => {
    class CriarFarmaciaUseCaseStub implements CriarFarmaciaUseCase {
        async criar(): Promise<FarmaciaModel | Error> {
            return new Promise(resolve => resolve(makeFarmacia(1)))
        }
    }
    return new CriarFarmaciaUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarFarmaciaUseCase = makeCriarFarmaciaUseCase()
    const sut = new CriarFarmaciaController(validator, criarFarmaciaUseCase)
    return {
        validator,
        criarFarmaciaUseCase,
        sut
    }
}
const makeData = (): FarmaciaModel => ({
    logo: 'logo',
    nome: 'nome',
    cnpj: 'cnpj',
    endereco: 'endereco',
    horarioFuncionamento: 'horarioFuncionamento',
    responsavel: 'responsavel',
    telefone: 'telefone',
    outros: 'outros'
})

const makeRequest = (): GRPCRequest => ({
    request: makeData(),
    metadata: {}
})

describe('CriarFarmacia controller', () => {
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
        const { sut, criarFarmaciaUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarFarmaciaUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o criar retornar uma exceção repassará essa exceção', async () => {
        const { sut, criarFarmaciaUseCase } = makeSut()
        jest.spyOn(criarFarmaciaUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o criar uma error retornará uma exceção com esse error', async () => {
        const { sut, criarFarmaciaUseCase } = makeSut()
        jest.spyOn(criarFarmaciaUseCase, 'criar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


    test('Garantir que se tudo ocorrer normalmente retornar uma farmacia', async () => {
        const { sut } = makeSut()
        const farmacia = await sut.handle(makeRequest())
        expect(farmacia).toEqual(makeFarmacia(1))
    })

})