import { Builder } from "builder-pattern";
import { ItemPromocaoModel } from "../model/item-promocao.model";
import { ItemPromocaoRequest } from "../model/request/item-promocao.request";

export class ItemPromocaoRequestMapper {

    public static mapTo(itemPromocaoModel: ItemPromocaoModel): ItemPromocaoRequest {
        return Builder<ItemPromocaoRequest>()
            .id(itemPromocaoModel.id)
            .valor(itemPromocaoModel.valor)
            .imagem(itemPromocaoModel.imagem)
            .descricao(itemPromocaoModel.descricao)
            .build();
    }
}