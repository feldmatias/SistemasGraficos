export class Path {

    getLevelsCount() {
        return 0;
    }

    getLevelMatrix(level) {
        return mat4.create();
    }

    getLevelNormalMatrix(level) {
        let modelMatrix = this.getLevelMatrix(level);
        let normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, modelMatrix);
        return normalMatrix;
    }

}
