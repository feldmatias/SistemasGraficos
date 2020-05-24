export class SceneConfig {

    setCameraDistance(cameraDistance) {
        this.cameraDistance = cameraDistance;
        return this;
    }

    setCameraHeight(cameraHeight) {
        this.cameraHeight = cameraHeight;
        return this;
    }

    setAngularVelocity(angularVelocity) {
        this.angularVelocity = angularVelocity;
        return this;
    }

    setCastleWidth(castleWidth) {
        this.castleWidth = castleWidth;
        return this;
    }

    setCastleLength(castleLength) {
        this.castleLength = castleLength;
        return this;
    }

    setCastleFloorsCount(castleFloorsCount) {
        this.castleFloorsCount = castleFloorsCount;
        return this;
    }

    castleConfigChanged(lastConfig) {
        return this.castleWidth !== lastConfig.castleWidth ||
            this.castleLength !== lastConfig.castleLength ||
            this.castleFloorsCount !== lastConfig.castleFloorsCount;
    }

}