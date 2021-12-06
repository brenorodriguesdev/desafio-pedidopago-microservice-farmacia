import { FarmaciaModel } from "../../domain/models/farmacia"
import { FarmaciaSedeModel } from "../../domain/models/farmaciaSede"
import { CriarFarmaciaSedeUseCase } from "../../domain/useCases/criar-farmaciaSede"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { CriarFarmaciaSedeController } from "./criar-farmaciaSede"

interface SutTypes {
    validator: Validator,
    criarFarmaciaSedeUseCase: CriarFarmaciaSedeUseCase,
    sut: CriarFarmaciaSedeController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeCriarFarmaciaSedeUseCase = (): CriarFarmaciaSedeUseCase => {
    class CriarFarmaciaSedeUseCaseStub implements CriarFarmaciaSedeUseCase {
        async criar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new CriarFarmaciaSedeUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarFarmaciaSedeUseCase = makeCriarFarmaciaSedeUseCase()
    const sut = new CriarFarmaciaSedeController(validator, criarFarmaciaSedeUseCase)
    return {
        validator,
        criarFarmaciaSedeUseCase,
        sut
    }
}
const makeFarmaciaModel = (): FarmaciaModel => ({
    id: 1,
    logo: 'logo',
    nome: 'nome',
    cnpj: 'cnpj',
    endereco: 'endereco',
    horarioFuncionamento: 'horarioFuncionamento',
    responsavel: 'responsavel',
    telefone: 'telefone',
    outros: 'outros'
})

const makeData = (): FarmaciaSedeModel => ({
    farmacia: makeFarmaciaModel(),
    filias: []
})

const makeRequest = (): GRPCRequest => ({
    request: makeData(),
    metadata: {}
})

describe('CriarFarmaciaSede controller', () => {
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
        const { sut, criarFarmaciaSedeUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarFarmaciaSedeUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith({ farmacia: makeFarmaciaModel() })
    })

    test('Garantir que se o criar retornar uma exceção repassará essa exceção', async () => {
        const { sut, criarFarmaciaSedeUseCase } = makeSut()
        jest.spyOn(criarFarmaciaSedeUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o criar uma error retornará uma exceção com esse error', async () => {
        const { sut, criarFarmaciaSedeUseCase } = makeSut()
        jest.spyOn(criarFarmaciaSedeUseCase, 'criar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })

})