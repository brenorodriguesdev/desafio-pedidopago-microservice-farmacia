import { UpdateFarmaciaModel } from "../../domain/models/updateFarmacia"
import { makeFarmaciaRepository } from "../../tests/factories/repositories/farmacia-repository"
import { FarmaciaRepository } from "../contracts/farmacia-repository"
import { AtualizarFarmaciaService } from "./atualizar-farmacia"

interface SutTypes {
    farmaciaRepository: FarmaciaRepository
    sut: AtualizarFarmaciaService
}


const makeSut = (): SutTypes => {
    const farmaciaRepository = makeFarmaciaRepository()
    const sut = new AtualizarFarmaciaService(farmaciaRepository)
    return {
        farmaciaRepository,
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

describe('AtualizarFarmacia Service', () => {
    test('Garantir que farmaciaRepository findById seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const findByIdSpy = jest.spyOn(farmaciaRepository, 'findById')
        const data = makeData()
        await sut.atualizar(data)
        expect(findByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o farmaciaRepository findById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o farmaciaRepository findById retornar nullo retornar um error', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'findById').mockReturnValueOnce(null)
        const error = await sut.atualizar(makeData())
        expect(error).toEqual(new Error('Farmacia não encontrada!'))
    })

    test('Garantir que farmaciaRepository update seja chamado com os valores corretos', async () => {
        const { sut, farmaciaRepository } = makeSut()
        const updateSpy = jest.spyOn(farmaciaRepository, 'update')
        const data = makeData()
        await sut.atualizar(data)
        expect(updateSpy).toHaveBeenCalledWith(data)
    })


    test('Garantir que se o farmaciaRepository update retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaRepository } = makeSut()
        jest.spyOn(farmaciaRepository, 'update').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })
})