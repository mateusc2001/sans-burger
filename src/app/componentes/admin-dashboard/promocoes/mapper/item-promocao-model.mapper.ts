import { Builder } from "builder-pattern";
import { ItemPromocaoModel } from "../model/item-promocao.model";

export class ItemPromocaoModelMapper {

    public static buildItemPromocaoModel(id: string, imagem: string, descricao: string, valor: number): ItemPromocaoModel{
        return Builder<ItemPromocaoModel>()
            .id(id)
            .valor(valor)
            .imagem(imagem)
            .descricao(descricao)
            .build();
    }
}