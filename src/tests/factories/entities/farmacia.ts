import { Farmacia } from "../../../data/entities/farmacia";

export const makeFarmacia = (id : number): Farmacia => {
    const farmacia = new Farmacia()
    farmacia.id = id
    farmacia.logo = 'logo ' + 1
    farmacia.nome = 'nome ' + 1
    farmacia.cnpj = 'cnpj ' + 1
    farmacia.endereco = 'endereco ' + 1
    farmacia.horarioFuncionamento = 'horarioFuncionamento ' + 1
    farmacia.responsavel = 'responsavel ' + 1
    farmacia.telefone = 'telefone ' + 1
    farmacia.outros = 'outros ' + 1

    return farmacia
}