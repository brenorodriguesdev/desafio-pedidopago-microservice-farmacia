import { makeFarmaciaSede } from "../../tests/factories/entities/farmaciaSede"
import { makeFarmaciaSedeRepository } from "../../tests/factories/repositories/farmacia-sede-repository"
import { FarmaciaSedeRepository } from "../contracts/farmacia-sede-repository"
import { ListarFarmaciasSedesService } from "./listar-farmacias-sedes"

interface SutTypes {
    farmaciaSedeRepository: FarmaciaSedeRepository
    sut: ListarFarmaciasSedesService
}


const makeSut = (): SutTypes => {
    const farmaciaSedeRepository = makeFarmaciaSedeRepository()
    const sut = new ListarFarmaciasSedesService(farmaciaSedeRepository)
    return {
        farmaciaSedeRepository,
        sut
    }
}

describe('ListarFarmacias Service', () => {
    test('Garantir que farmaciaSedeRepository findAll seja chamado com os valores corretos', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        const findAllSpy = jest.spyOn(farmaciaSedeRepository, 'findAll')
        await sut.listar()
        expect(findAllSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o farmaciaSedeRepository findAll retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, farmaciaSedeRepository } = makeSut()
        jest.spyOn(farmaciaSedeRepository, 'findAll').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar farmacias sedes', async () => {
        const { sut } = makeSut()
        const farmacia = await sut.listar()
        await expect(farmacia).toEqual({
            farmaciasSedes: [makeFarmaciaSede(1)].map(farmaciaSede => ({
                id: farmaciaSede.id,
                farmacia: farmaciaSede.farmacia,
                filias: farmaciaSede.filias.map(filial => filial.farmacia)
            }))
        })
    })
})