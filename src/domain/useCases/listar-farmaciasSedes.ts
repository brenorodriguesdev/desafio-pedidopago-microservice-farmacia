import { ListarFarmaciasSedesModel } from "../models/listar-farmaciasSedes";

export interface ListarFarmaciasSedeUseCase {
    listar: () => Promise<ListarFarmaciasSedesModel>
}