import { UpdateFarmaciaModel } from "../../domain/models/updateFarmacia"
import { AtualizarFarmaciaUseCase } from "../../domain/useCases/atualizar-farmacia"
import { Validator } from "../../validation/contracts/validator"
import { GRPCRequest } from "../contracts/grpc"
import { AtualizarFarmaciaController } from "./atualizar-farmacia"

interface SutTypes {
    validator: Validator,
    atualizarFarmaciaUseCase: AtualizarFarmaciaUseCase,
    sut: AtualizarFarmaciaController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeAtualizarFarmaciaUseCase = (): AtualizarFarmaciaUseCase => {
    class AtualizarFarmaciaUseCaseStub implements AtualizarFarmaciaUseCase {
        async atualizar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new AtualizarFarmaciaUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const atualizarFarmaciaUseCase = makeAtualizarFarmaciaUseCase()
    const sut = new AtualizarFarmaciaController(validator, atualizarFarmaciaUseCase)
    return {
        validator,
        atualizarFarmaciaUseCase,
        sut
    }
}

const makeData = (): UpdateFarmaciaModel => ({
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

const makeRequest = (): GRPCRequest => ({
    request: makeData(),
    metadata: {}
})

describe('AtualizarFarmacia controller', () => {
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


    test('Garantir que atualizar seja chamado com os valores corretos', async () => {
        const { sut, atualizarFarmaciaUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(atualizarFarmaciaUseCase, 'atualizar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o atualizar retornar uma exceção repassará essa exceção', async () => {
        const { sut, atualizarFarmaciaUseCase } = makeSut()
        jest.spyOn(atualizarFarmaciaUseCase, 'atualizar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o atualizar uma error retornará uma exceção com esse error', async () => {
        const { sut, atualizarFarmaciaUseCase } = makeSut()
        jest.spyOn(atualizarFarmaciaUseCase, 'atualizar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


})