import { createConnection, getRepository, getConnection } from 'typeorm'
import { Farmacia } from '../data/entities/farmacia'
import { FarmaciaSede } from '../data/entities/farmarciaSede'
import { FarmaciaSedeRepositoryTypeORM } from './farmacia-sede-repository'

const makeSut = (): FarmaciaSedeRepositoryTypeORM => {
    return new FarmaciaSedeRepositoryTypeORM()
}

describe('FarmaciaSedeRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        await getConnection().close();
    })

    beforeEach(async () => {
        const farmaciaSedeRepository = getRepository(FarmaciaSede)
        const farmaciasSedes = await farmaciaSedeRepository.find()
        await farmaciaSedeRepository.remove(farmaciasSedes)
        const farmaciaRepository = getRepository(Farmacia)
        const farmacias = await farmaciaRepository.find()
        await farmaciaRepository.remove(farmacias)
    })

    test('Garantir que a farmacia sede seja criada', async () => {
        const sut = makeSut()

        const farmaciaRepository = getRepository(Farmacia)
        const id = await farmaciaRepository.count() + 1

        const farmacia = await farmaciaRepository.save({
            id,
            logo: 'logo',
            nome: 'nome',
            cnpj: 'cnpj',
            endereco: 'endereco',
            horarioFuncionamento: 'horarioFuncionamento',
            responsavel: 'responsavel',
            telefone: 'telefone',
            outros: 'outros'
        })

        const farmaciaSedeCreated = await sut.create({
            id: await getRepository(FarmaciaSede).count() + 1,
            farmacia,
            filias: []
        })

        expect(farmaciaSedeCreated.id).toBeTruthy()

    })

    test('Garantir que a farmacia sede seja retornada', async () => {
        const sut = makeSut()

        const farmaciaRepository = getRepository(Farmacia)
        const id = await farmaciaRepository.count() + 1

        const farmacia = await farmaciaRepository.save({
            id,
            logo: 'logo',
            nome: 'nome',
            cnpj: 'cnpj',
            endereco: 'endereco',
            horarioFuncionamento: 'horarioFuncionamento',
            responsavel: 'responsavel',
            telefone: 'telefone',
            outros: 'outros'
        })

        const farmaciaSedeCreated = await sut.create({
            id: await getRepository(FarmaciaSede).count() + 1,
            farmacia,
            filias: []
        })

        const farmaciaSede = await sut.findById(farmaciaSedeCreated.id)

        expect(farmaciaSede.id).toBe(farmaciaSedeCreated.id)

    })

    test('Garantir que a farmacias sedes seja retornadas', async () => {
        const sut = makeSut()

        const farmaciaRepository = getRepository(Farmacia)
        const id = await farmaciaRepository.count() + 1

        const farmacia = await farmaciaRepository.save({
            id,
            logo: 'logo',
            nome: 'nome',
            cnpj: 'cnpj',
            endereco: 'endereco',
            horarioFuncionamento: 'horarioFuncionamento',
            responsavel: 'responsavel',
            telefone: 'telefone',
            outros: 'outros'
        })

        const farmaciaSedeCreated = await sut.create({
            id: await getRepository(FarmaciaSede).count() + 1,
            farmacia,
            filias: []
        })

        const farmaciaSedes = await sut.findAll()

        expect(farmaciaSedes[0].id).toBe(farmaciaSedeCreated.id)

    })

})