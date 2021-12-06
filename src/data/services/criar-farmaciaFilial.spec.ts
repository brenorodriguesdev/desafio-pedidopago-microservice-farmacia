import { CriarFarmaciaFilialModel } from "../../domain/models/criar-farmaciaFilial"
import { FarmaciaModel } from "../../domain/models/farmacia"
import { makeFarmacia } from "../../tests/factories/entities/farmacia"
import { makeFarmaciaFilial, makeFarmaciaFilialSemSede } from "../../tests/factories/entities/farmaciaFilial"
import { makeFarmaciaSede } from "../../tests/factories/entities/farmaciaSede"
import { makeFarmaciaFilialRepository } from "../../tests/factories/repositories/farmacia-filial-repository"
import { makeFarmaciaRepository } from "../../tests/factories/repositories/farmacia-repository"
import { makeFarmaciaSedeRepository } from "../../tests/factories/repositories/farmacia-sede-repository"
import { FarmaciaFilialRepository } from "../contracts/farmacia-filial-repository"
import { FarmaciaRepository } from "../contracts/farmacia-repository"
import { FarmaciaSedeRepository } from "../contracts/farmacia-sede-repository"
import { FarmaciaFilial } from "../entities/farmaciaFilial"
import { FarmaciaSede } from "../entities/farmarciaSede"
import { CriarFarmaciaFilialService } from "./criar-FarmaciaFilial"

interface SutTypes {
    farmaciaRepository: FarmaciaRepository
    farmaciaSedeRepository: FarmaciaSedeRepository
    farmaciaFilialRepository: FarmaciaFilialRepository
    sut: CriarFarmaciaFilialService
}


const makeSut = (): SutTypes => {
    const farmaciaRepository = makeFarmaciaRepository()
    const farmaciaSedeRepository = makeFarmaciaSedeRepository()
    const farmaciaFilialRepository = makeFarmaciaFilialRepository()
    const sut = new CriarFarmaciaFilialService(farmaciaRepository, farmaciaSedeRepository, farmaciaFilialRepository)
    return {
        farmaciaRepository,
        farmaciaSedeRepository,
        farmaciaFilialRepository,
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

describe('CriarFarmaciaFilial Service', () => {
    test('Garantir que farmaciaRepository findById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const findByIdSpy = jest.spyOn(farmaciaRepository, 'findById')
        const data = makeData()
        await sut.criar(data)
        expect(findByIdSpy).toHaveBeenCalledWith(2)
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

    test('Garantir que farmaciaSedeRepository findById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        const findByIdSpy = jest.spyOn(farmaciaSedeRepository, 'findById')
        const data = makeData()
        await sut.criar(data)
        expect(findByIdSpy).toHaveBeenCalledWith(2)
    })

    test('Garantir que se o farmaciaSedeRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        jest.spyOn(farmaciaSedeRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o farmaciaSedeRepository findById retornar nullo retornar um error', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        jest.spyOn(farmaciaSedeRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.criar(makeData())
        expect(error).toEqual(new Error('Essa farmacia sede não foi encontrada!'))
    })

    test('Garantir que farmaciaSedeRepository findById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        const findByIdSpy = jest.spyOn(farmaciaSedeRepository, 'findById')
        const data = makeData()
        data.farmacia.id = 0
        await sut.criar(data)
        expect(findByIdSpy).toHaveBeenCalledWith(2)
    })

    test('Garantir que se o farmaciaSedeRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        jest.spyOn(farmaciaSedeRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const data = makeData()
        delete data.farmacia.id
        const promise = sut.criar(data)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o farmaciaSedeRepository findById retornar nullo retornar um error', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        jest.spyOn(farmaciaSedeRepository, 'findById').mockReturnValueOnce(null)
        const data = makeData()
        delete data.farmacia.id
        const error = await sut.criar(data)
        expect(error).toEqual(new Error('Essa farmacia sede não foi encontrada!'))
    })

    test('Garantir que se a farmaciaSede for igual a farmaciaFilial retornar um error', async () => {
        const { sut } = makeSut()
        const data = makeData()
        data.farmacia.id = 1
        const error = await sut.criar(data)
        expect(error).toEqual(new Error('Uma farmacia sede não pode ser filial dela mesmo!'))
    })

    test('Garantir que se a farmacia já for filial dessa sede retornar um error', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        const farmaciaSede = new FarmaciaSede()
        farmaciaSede.id = 3
        farmaciaSede.farmacia = makeFarmacia(1)

        const farmaciaFilial = new FarmaciaFilial()
        farmaciaFilial.id = 1
        farmaciaFilial.farmacia = makeFarmacia(2)

        farmaciaSede.filias = [farmaciaFilial]
        jest.spyOn(farmaciaSedeRepository, 'findById').mockResolvedValueOnce(farmaciaSede)
        const error = await sut.criar(makeData())
        expect(error).toEqual(new Error('Essa farmacia já é filial dessa sede!'))
    })

    test('Garantir que se já existir 3 filias ou mais retornar um error', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        const farmaciaSede = new FarmaciaSede()
        farmaciaSede.id = 1
        farmaciaSede.farmacia = makeFarmacia(4)
        farmaciaSede.filias = [makeFarmaciaFilialSemSede(1), makeFarmaciaFilialSemSede(1), makeFarmaciaFilialSemSede(1)]
        jest.spyOn(farmaciaSedeRepository, 'findById').mockResolvedValueOnce(farmaciaSede)
        const error = await sut.criar(makeData())
        expect(error).toEqual(new Error('Só é possível adicionar 3 farmacias filias a uma farmacia sede!'))
    })


    test('Garantir que se já existir 3 filias ou mais retornar um error', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        const farmaciaSede = new FarmaciaSede()
        farmaciaSede.id = 1
        farmaciaSede.farmacia = makeFarmacia(4)
        farmaciaSede.filias = [makeFarmaciaFilialSemSede(1), makeFarmaciaFilialSemSede(1), makeFarmaciaFilialSemSede(1)]
        jest.spyOn(farmaciaSedeRepository, 'findById').mockResolvedValueOnce(farmaciaSede)
        const data = makeData()
        delete data.farmacia.id
        const error = await sut.criar(data)
        expect(error).toEqual(new Error('Só é possível adicionar 3 farmacias filias a uma farmacia sede!'))
    })

    test('Garantir que farmaciaFilialRepository create seja chamado com os valores corretos', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        const criarSpy = jest.spyOn(farmaciaFilialRepository, 'create')
        const data = makeData()
        await sut.criar(data)
        expect(criarSpy).toHaveBeenCalledWith({
            farmacia: makeFarmacia(1),
            farmaciaSede: makeFarmaciaSede(1)
        })
    })


    test('Garantir que se o farmaciaFilialRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        jest.spyOn(farmaciaFilialRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que farmaciaRepository create seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const criarSpy = jest.spyOn(farmaciaRepository, 'create')
        const data = makeData()
        delete data.farmacia.id
        await sut.criar(data)
        expect(criarSpy).toHaveBeenCalledWith(data.farmacia)
    })


    test('Garantir que se o farmaciaRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const data = makeData()
        delete data.farmacia.id
        const promise = sut.criar(data)
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que farmaciaFilialRepository create seja chamado com os valores corretos', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        const criarSpy = jest.spyOn(farmaciaFilialRepository, 'create')
        const data = makeData()
        delete data.farmacia.id
        await sut.criar(data)
        expect(criarSpy).toHaveBeenCalledWith({
            farmacia: makeFarmacia(1),
            farmaciaSede: makeFarmaciaSede(1)
        })
    })


    test('Garantir que se o farmaciaFilialRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaFilialRepository } = makeSut()
        jest.spyOn(farmaciaFilialRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const data = makeData()
        delete data.farmacia.id
        const promise = sut.criar(data)
        await expect(promise).rejects.toThrow()
    })

})