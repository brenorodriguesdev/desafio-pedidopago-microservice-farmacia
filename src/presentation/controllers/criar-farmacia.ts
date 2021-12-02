import { CriarFarmaciaUseCase } from "../../domain/useCases/criar-farmacia"
import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { GRPCRequest } from "../contracts/grpc"

export class CriarFarmaciaController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarFarmaciaUseCase: CriarFarmaciaUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            logo,
            nome,
            cnpj,
            endereco,
            horarioFuncionamento,
            responsavel,
            telefone,
            outros
        } = grpcRequest.request

        const result = await this.criarFarmaciaUseCase.criar({
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

        return result
    }
}