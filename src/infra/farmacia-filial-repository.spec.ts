import { createConnection, getRepository, getConnection } from 'typeorm'
import { Farmacia } from '../data/entities/farmacia'
import { FarmaciaFilial } from '../data/entities/farmaciaFilial'
import { FarmaciaSede } from '../data/entities/farmarciaSede'
import { FarmaciaFilialRepositoryTypeORM } from './farmacia-filial-repository'

const makeSut = (): FarmaciaFilialRepositoryTypeORM => {
    return new FarmaciaFilialRepositoryTypeORM()
}

describe('FarmaciaFilialRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        await getConnection().close();
    })

    beforeEach(async () => {
        const farmaciaFilialRepository = getRepository(Farmacia)
        const farmaciasFiliais = await farmaciaFilialRepository.find()
        await farmaciaFilialRepository.remove(farmaciasFiliais)
        const farmaciaRepository = getRepository(Farmacia)
        const farmacias = await farmaciaRepository.find()
        await farmaciaRepository.remove(farmacias)
    })

    test('Garantir que a farmacia filial seja criada', async () => {
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

        const idSede = await farmaciaRepository.count() + 1

        const farmaciaSede = await farmaciaRepository.save({
            id: idSede,
            logo: 'logo1',
            nome: 'nome1',
            cnpj: 'cnpj1',
            endereco: 'endereco1',
            horarioFuncionamento: 'horarioFuncionamento1',
            responsavel: 'responsavel1',
            telefone: 'telefone1',
            outros: 'outros1'
        })
        

        const farmaciaSedeCreated = await getRepository(FarmaciaSede).save({
            id: await getRepository(FarmaciaSede).count() + 1,
            farmacia: farmaciaSede
        })
        

        const farmaciaFilialRepository = getRepository(FarmaciaFilial)
        const idFilial = await farmaciaFilialRepository.count() + 1
        const farmaciaFilialCreated = await sut.create({
            id: idFilial,
            farmacia,
            farmaciaSede: farmaciaSedeCreated
        })

        expect(farmaciaFilialCreated.id).toBeTruthy()

    })


    test('Garantir que a farmacia filial seja retornada', async () => {
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

        const idSede = await farmaciaRepository.count() + 1

        const farmaciaSede = await farmaciaRepository.save({
            id: idSede,
            logo: 'logo1',
            nome: 'nome1',
            cnpj: 'cnpj1',
            endereco: 'endereco1',
            horarioFuncionamento: 'horarioFuncionamento1',
            responsavel: 'responsavel1',
            telefone: 'telefone1',
            outros: 'outros1'
        })
        

        const farmaciaSedeCreated = await getRepository(FarmaciaSede).save({
            id: await getRepository(FarmaciaSede).count() + 1,
            farmacia: farmaciaSede
        })
        

        const farmaciaFilialRepository = getRepository(FarmaciaFilial)
        const idFilial = await farmaciaFilialRepository.count() + 1
        const farmaciaFilialCreated = await sut.create({
            id: idFilial,
            farmacia,
            farmaciaSede: farmaciaSedeCreated
        })

        const farmaciaFilial = await sut.findById(farmaciaFilialCreated.id)

        expect(farmaciaFilial.id).toBe(farmaciaFilialCreated.id)

    })


    test('Garantir que a farmacia filial seja deletada', async () => {
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

        const idSede = await farmaciaRepository.count() + 1

        const farmaciaSede = await farmaciaRepository.save({
            id: idSede,
            logo: 'logo1',
            nome: 'nome1',
            cnpj: 'cnpj1',
            endereco: 'endereco1',
            horarioFuncionamento: 'horarioFuncionamento1',
            responsavel: 'responsavel1',
            telefone: 'telefone1',
            outros: 'outros1'
        })
        

        const farmaciaSedeCreated = await getRepository(FarmaciaSede).save({
            id: await getRepository(FarmaciaSede).count() + 1,
            farmacia: farmaciaSede
        })
        

        const farmaciaFilialRepository = getRepository(FarmaciaFilial)
        const idFilial = await farmaciaFilialRepository.count() + 1
        const farmaciaFilialCreated = await sut.create({
            id: idFilial,
            farmacia,
            farmaciaSede: farmaciaSedeCreated
        })

        await sut.deleteById(farmaciaFilialCreated.id)

        const farmaciaFilial = await sut.findById(farmaciaFilialCreated.id)

        expect(farmaciaFilial).toBeUndefined()

    })

})