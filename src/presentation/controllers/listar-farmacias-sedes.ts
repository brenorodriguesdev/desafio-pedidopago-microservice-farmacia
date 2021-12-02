import { ListarFarmaciasSedesUseCase } from "../../domain/useCases/listar-farmaciasSedes"
import { Controller } from "../contracts/controller"

export class ListarFarmaciasSedesController implements Controller {
    constructor(private readonly listarFarmaciasSedesUseCase: ListarFarmaciasSedesUseCase) { }
    async handle(): Promise<any> {
    
        const result = await this.listarFarmaciasSedesUseCase.listar()

        return result
    }
}