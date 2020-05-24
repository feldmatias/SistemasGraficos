import {LinePath} from "../../../surfaces/paths/LinePath.js";

export class CastleRoofPath extends LinePath {

    getLevelMatrix(level) {
        let matrix = super.getLevelMatrix(level);

        let scale = level / (this.getLevelsCount() - 1);
        let scaleY = 1 - scale * 0.95;
        let scaleX = 1 - scale * 0.3;

        mat4.scale(matrix, matrix, vec3.fromValues(scaleX, scaleY, 0));

        return matrix;
    }

}