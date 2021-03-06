import { adaptService } from "../adapters/grpc-controller"
import { makeAtualizarFarmaciaController } from "../factories/controllers/atualizar-farmacia"
import { makeBuscarFarmaciaController } from "../factories/controllers/buscar-farmacia"
import { makeCriarFarmaciaController } from "../factories/controllers/criar-farmacia"
import { makeCriarFarmaciaFilialController } from "../factories/controllers/criar-farmaciaFilial"
import { makeCriarFarmaciaSedeController } from "../factories/controllers/criar-farmaciaSede"
import { makeDeletarFarmaciaController } from "../factories/controllers/deletar-farmacia"
import { makeDeletarFarmaciaFilialController } from "../factories/controllers/deletar-farmaciaFilial"
import { makeListarFarmaciasController } from "../factories/controllers/listar-farmacias"
import { makeListarFarmaciasSedesController } from "../factories/controllers/listar-farmacias-sedes"

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

export default (server: any): void => {
    const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../', 'protos/', 'farmacia.proto'))
    const produtoProto = grpc.loadPackageDefinition(protoObject)
    server.started = false
    
    server.addService(produtoProto.FarmaciaService.service, {
        atualizar: adaptService(makeAtualizarFarmaciaController()),
        criar: adaptService(makeCriarFarmaciaController()),
        criarFilial: adaptService(makeCriarFarmaciaFilialController()),
        criarSede: adaptService(makeCriarFarmaciaSedeController()),
        deletar: adaptService(makeDeletarFarmaciaController()),
        buscar: adaptService(makeBuscarFarmaciaController()),
        deletarFilial: adaptService(makeDeletarFarmaciaFilialController()),
        listar: adaptService(makeListarFarmaciasController()),
        listarSedes: adaptService(makeListarFarmaciasSedesController()),
    })

}