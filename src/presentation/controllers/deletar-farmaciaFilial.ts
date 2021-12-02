import { DeletarFarmaciaFilialUseCase } from "../../domain/useCases/deletar-farmaciaFilial"
import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { GRPCRequest } from "../contracts/grpc"

export class DeletarFarmaciaFilialController implements Controller {
    constructor(private readonly validator: Validator, private readonly deletarFarmaciaFilialUseCase: DeletarFarmaciaFilialUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            id,
        } = grpcRequest.request

        const result = await this.deletarFarmaciaFilialUseCase.deletar(id)

        if (result instanceof Error) {
            throw result
        }

    }
}