import { createConnection, getRepository, getConnection } from 'typeorm'
import { Farmacia } from '../data/entities/farmacia'
import { FarmaciaRepositoryTypeORM } from './farmacia-repository'

const makeSut = (): FarmaciaRepositoryTypeORM => {
    return new FarmaciaRepositoryTypeORM()
}

describe('FarmaciaRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        await getConnection().close();
    })

    beforeEach(async () => {
        const farmaciaRepository = getRepository(Farmacia)
        const farmacias = await farmaciaRepository.find()
        await farmaciaRepository.remove(farmacias)
    })

    test('Garantir que a farmacia seja criada', async () => {
        const sut = makeSut()

        const farmacia = await sut.create({
            logo: 'logo',
            nome: 'nome',
            cnpj: 'cnpj',
            endereco: 'endereco',
            horarioFuncionamento: 'horarioFuncionamento',
            responsavel: 'responsavel',
            telefone: 'telefone',
            outros: 'outros'
        })

        expect(farmacia.id).toBeTruthy()
        expect(farmacia.logo).toBe('logo')
        expect(farmacia.nome).toBe('nome')
        expect(farmacia.cnpj).toBe('cnpj')
        expect(farmacia.endereco).toBe('endereco')
        expect(farmacia.horarioFuncionamento).toBe('horarioFuncionamento')
        expect(farmacia.responsavel).toBe('responsavel')
        expect(farmacia.telefone).toBe('telefone')
        expect(farmacia.outros).toBe('outros')

    })


    test('Garantir que a farmacia seja retornada', async () => {
        const sut = makeSut()

        const farmaciaCreated = await sut.create({
            logo: 'logo',
            nome: 'nome',
            cnpj: 'cnpj',
            endereco: 'endereco',
            horarioFuncionamento: 'horarioFuncionamento',
            responsavel: 'responsavel',
            telefone: 'telefone',
            outros: 'outros'
        })

        const farmacia = await sut.findById(farmaciaCreated.id)

        expect(farmacia.id).toBe(farmaciaCreated.id)
        expect(farmacia.logo).toBe('logo')
        expect(farmacia.nome).toBe('nome')
        expect(farmacia.cnpj).toBe('cnpj')
        expect(farmacia.endereco).toBe('endereco')
        expect(farmacia.horarioFuncionamento).toBe('horarioFuncionamento')
        expect(farmacia.responsavel).toBe('responsavel')
        expect(farmacia.telefone).toBe('telefone')
        expect(farmacia.outros).toBe('outros')

    })

    test('Garantir que as farmacias sejam retornadas', async () => {
        const sut = makeSut()

        const farmaciaCreated = await sut.create({
            logo: 'logo',
            nome: 'nome',
            cnpj: 'cnpj',
            endereco: 'endereco',
            horarioFuncionamento: 'horarioFuncionamento',
            responsavel: 'responsavel',
            telefone: 'telefone',
            outros: 'outros'
        })

        const farmacias = await sut.findAll()

        const farmacia = farmacias[0]

        expect(farmacia.id).toBe(farmaciaCreated.id)
        expect(farmacia.logo).toBe('logo')
        expect(farmacia.nome).toBe('nome')
        expect(farmacia.cnpj).toBe('cnpj')
        expect(farmacia.endereco).toBe('endereco')
        expect(farmacia.horarioFuncionamento).toBe('horarioFuncionamento')
        expect(farmacia.responsavel).toBe('responsavel')
        expect(farmacia.telefone).toBe('telefone')
        expect(farmacia.outros).toBe('outros')

    })

    test('Garantir que a farmacia seja deletada', async () => {
        const sut = makeSut()

        const farmaciaCreated = await sut.create({
            logo: 'logo',
            nome: 'nome',
            cnpj: 'cnpj',
            endereco: 'endereco',
            horarioFuncionamento: 'horarioFuncionamento',
            responsavel: 'responsavel',
            telefone: 'telefone',
            outros: 'outros'
        })

        await sut.deleteById(farmaciaCreated.id)
        const farmacia = await sut.findById(farmaciaCreated.id)

        expect(farmacia).toBeUndefined()

    })

    test('Garantir que a farmacia seja atualizada', async () => {
        const sut = makeSut()

        const farmaciaCreated = await sut.create({
            logo: 'logo',
            nome: 'nome',
            cnpj: 'cnpj',
            endereco: 'endereco',
            horarioFuncionamento: 'horarioFuncionamento',
            responsavel: 'responsavel',
            telefone: 'telefone',
            outros: 'outros'
        })

        const id = farmaciaCreated.id
        farmaciaCreated.cnpj = 'update_cnpj'
        await sut.update(farmaciaCreated)
        const farmacia = await sut.findById(id)
        expect(farmacia.id).toBe(id)
        expect(farmacia.logo).toBe('logo')
        expect(farmacia.nome).toBe('nome')
        expect(farmacia.cnpj).toBe('update_cnpj')
        expect(farmacia.endereco).toBe('endereco')
        expect(farmacia.horarioFuncionamento).toBe('horarioFuncionamento')
        expect(farmacia.responsavel).toBe('responsavel')
        expect(farmacia.telefone).toBe('telefone')
        expect(farmacia.outros).toBe('outros')

    })

})