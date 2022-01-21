import { PositionImageModel } from "../position-image.model";

export class ItemPromocaoRequest {
    constructor(
        public id: string,
        public imagem: string,
        public descricao: string,
        public valor: number,
        public positionImage: PositionImageModel
    ) {}
}