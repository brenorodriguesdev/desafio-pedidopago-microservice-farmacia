import { CriarFarmaciaSedeUseCase } from "../../domain/useCases/criar-farmaciaSede"
import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { GRPCRequest } from "../contracts/grpc"

export class CriarFarmaciaSedeController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarFarmaciaSedeUseCase: CriarFarmaciaSedeUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            farmacia
        } = grpcRequest.request

        const result = await this.criarFarmaciaSedeUseCase.criar({
            farmacia
        })

        if (result instanceof Error) {
            throw result
        }

    }
}