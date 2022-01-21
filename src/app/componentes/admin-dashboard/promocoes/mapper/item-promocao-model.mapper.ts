import { Builder } from "builder-pattern";
import { ItemPromocaoModel } from "../model/item-promocao.model";
import { PositionImageModelMapper } from "./position-image-model.mapper";

export class ItemPromocaoModelMapper {

    public static buildItemPromocaoModel(id: string, 
        imagem: string, 
        descricao: string, 
        valor: number,
        positionX: number,
        positiony: number): ItemPromocaoModel{
        return Builder<ItemPromocaoModel>()
            .id(id)
            .valor(valor)
            .imagem(imagem)
            .descricao(descricao)
            .positionImageModel(PositionImageModelMapper.mapTo(positionX, positiony))
            .build();
    }
}