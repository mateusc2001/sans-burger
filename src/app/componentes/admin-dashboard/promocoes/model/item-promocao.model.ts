import { PositionImageModel } from "./position-image.model";

export class ItemPromocaoModel {
    constructor(
        public id: string,
        public imagem: string,
        public descricao: string,
        public valor: number,
        public positionImageModel: PositionImageModel
    ) {}
}