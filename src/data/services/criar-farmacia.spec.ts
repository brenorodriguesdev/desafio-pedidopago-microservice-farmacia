import { FarmaciaModel } from "../../domain/models/farmacia"
import { makeFarmacia } from "../../tests/factories/entities/farmacia"
import { makeFarmaciaRepository } from "../../tests/factories/repositories/farmacia-repository"
import { FarmaciaRepository } from "../contracts/farmacia-repository"
import { CriarFarmaciaService } from "./criar-farmacia"

interface SutTypes {
    farmaciaRepository: FarmaciaRepository
    sut: CriarFarmaciaService
}


const makeSut = (): SutTypes => {
    const farmaciaRepository = makeFarmaciaRepository()
    const sut = new CriarFarmaciaService(farmaciaRepository)
    return {
        farmaciaRepository,
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

describe('CriarFarmacia Service', () => {
    test('Garantir que farmaciaRepository create seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const createSpy = jest.spyOn(farmaciaRepository, 'create')
        await sut.criar(makeData())
        expect(createSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o farmaciaRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar uma farmacia', async () => {
        const { sut } = makeSut()
        const farmacia = await sut.criar(makeData())
        await expect(farmacia).toEqual(makeFarmacia(1))
    })
})