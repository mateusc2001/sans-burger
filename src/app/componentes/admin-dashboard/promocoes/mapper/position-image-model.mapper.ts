import { Builder } from "builder-pattern";
import { PositionImageModel } from "../model/position-image.model";

export class PositionImageModelMapper {

    public static mapTo(x: number, y: number): PositionImageModel {
        return Builder<PositionImageModel>()
            .x(x)
            .y(y)
            .build();
    }
}