import { BuscarFarmaciaUseCase } from "../../domain/useCases/buscar-farmacia"
import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { GRPCRequest } from "../contracts/grpc"

export class BuscarFarmaciaController implements Controller {
    constructor(private readonly validator: Validator, private readonly buscarFarmaciaUseCase: BuscarFarmaciaUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            id,
        } = grpcRequest.request

        const result = await this.buscarFarmaciaUseCase.buscar(id)

        if (result instanceof Error) {
            throw result
        }

        return result
    }
}