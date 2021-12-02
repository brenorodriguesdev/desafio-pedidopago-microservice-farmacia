import { CriarFarmaciaFilialUseCase } from "../../domain/useCases/criar-farmaciaFilial"
import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { GRPCRequest } from "../contracts/grpc"

export class CriarFarmaciaFilialController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarFarmaciaFilialUseCase: CriarFarmaciaFilialUseCase) { }
    async handle(grpcRequest: GRPCRequest): Promise<any> {
        const error = this.validator.validate(grpcRequest.request)

        if (error) {
            throw error
        }

        const {
            farmacia,
            idFarmaciaSede
        } = grpcRequest.request

        const result = await this.criarFarmaciaFilialUseCase.criar({
            farmacia,
            idFarmaciaSede
        })

        if (result instanceof Error) {
            throw result
        }

    }
}