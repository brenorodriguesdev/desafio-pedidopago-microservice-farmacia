import { AtualizarFarmaciaUseCase } from "../../domain/useCases/atualizar-farmacia"
import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { GRPCRequest } from "../contracts/grpc"

export class AtualizarFarmaciaController implements Controller {
    constructor(private readonly validator: Validator, private readonly atualizarFarmaciaUseCase: AtualizarFarmaciaUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            id,
            logo,
            nome,
            cnpj,
            endereco,
            horarioFuncionamento,
            responsavel,
            telefone,
            outros
        } = grpcRequest.request

        const result = await this.atualizarFarmaciaUseCase.atualizar({
            id,
            logo,
            nome,
            cnpj,
            endereco,
            horarioFuncionamento,
            responsavel,
            telefone,
            outros
        })

        if (result instanceof Error) {
            throw result
        }

    }
}