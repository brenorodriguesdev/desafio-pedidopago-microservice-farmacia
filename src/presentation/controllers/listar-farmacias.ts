import { ListarFarmaciasUseCase } from "../../domain/useCases/listar-farmacias"
import { Controller } from "../contracts/controller"

export class ListarFarmaciasController implements Controller {
    constructor(private readonly listarFarmaciasUseCase: ListarFarmaciasUseCase) { }
    async handle(): Promise<any> {
    
        const result = await this.listarFarmaciasUseCase.listar()

        return result
    }
}