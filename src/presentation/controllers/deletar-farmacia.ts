import { AtualizarFarmaciaUseCase } from "../../domain/useCases/atualizar-farmacia"
import { DeletarFarmaciaUseCase } from "../../domain/useCases/deletar-farmacia"
import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { GRPCRequest } from "../contracts/grpc"

export class DeletarFarmaciaController implements Controller {
    constructor(private readonly validator: Validator, private readonly deletarFarmaciaUseCase: DeletarFarmaciaUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            id,
        } = grpcRequest.request

        const result = await this.deletarFarmaciaUseCase.deletar(id)

        if (result instanceof Error) {
            throw result
        }

    }
}