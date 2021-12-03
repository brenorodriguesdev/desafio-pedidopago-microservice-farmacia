import { FarmaciaModel } from "../../domain/models/farmacia"
import { FarmaciaSedeModel } from "../../domain/models/farmaciaSede"
import { UpdateFarmaciaModel } from "../../domain/models/updateFarmacia"
import { makeFarmacia } from "../../tests/factories/entities/farmacia"
import { makeFarmaciaRepository } from "../../tests/factories/repositories/farmacia-repository"
import { makeFarmaciaSedeRepository } from "../../tests/factories/repositories/farmacia-sede-repository"
import { FarmaciaRepository } from "../contracts/farmacia-repository"
import { FarmaciaSedeRepository } from "../contracts/farmacia-sede-repository"
import { CriarFarmaciaSedeService } from "./criar-farmaciaSede"

interface SutTypes {
    farmaciaRepository: FarmaciaRepository
    farmaciaSedeRepository: FarmaciaSedeRepository
    sut: CriarFarmaciaSedeService
}


const makeSut = (): SutTypes => {
    const farmaciaRepository = makeFarmaciaRepository()
    const farmaciaSedeRepository = makeFarmaciaSedeRepository()
    const sut = new CriarFarmaciaSedeService(farmaciaRepository, farmaciaSedeRepository)
    return {
        farmaciaRepository,
        farmaciaSedeRepository,
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

describe('CriarFarmaciaSede Service', () => {
    test('Garantir que farmaciaRepository findById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const findByIdSpy = jest.spyOn(farmaciaRepository, 'findById')
        const data = makeData()
        await sut.criar(data)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o farmaciaRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o farmaciaRepository findById retornar nullo retornar um error', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.criar(makeData())
        expect(error).toEqual(new Error('Essa farmacia não foi encontrada!'))
    })

    test('Garantir que farmaciaSedeRepository create seja chamado com os valores corretos', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        const criarSpy = jest.spyOn(farmaciaSedeRepository, 'create')
        const data = makeData()
        await sut.criar(data)
        expect(criarSpy).toHaveBeenCalledWith({
            farmacia: makeFarmacia(1),
            filias: []
        })
    })


    test('Garantir que se o farmaciaSedeRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        jest.spyOn(farmaciaSedeRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que farmaciaRepository create seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const criarSpy = jest.spyOn(farmaciaRepository, 'create')
        const data = makeData()
        data.farmacia.id = 0
        await sut.criar(data)
        expect(criarSpy).toHaveBeenCalledWith(data.farmacia)
    })


    test('Garantir que se o farmaciaRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const data = makeData()
        data.farmacia.id = 0
        const promise = sut.criar(data)
        await expect(promise).rejects.toThrow()
    })
})