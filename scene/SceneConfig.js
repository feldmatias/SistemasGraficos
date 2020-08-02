export class SceneConfig {

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

    setWallHeight(wallHeight) {
        this.wallHeight = wallHeight;
        return this;
    }

    setWallColumnCount(wallColumnCount) {
        this.wallColumnCount = wallColumnCount;
        return this;
    }

    wallConfigChanged(lastConfig) {
        return this.wallHeight !== lastConfig.wallHeight ||
            this.wallColumnCount !== lastConfig.wallColumnCount;
    }

    setCamera(camera) {
        this.camera = camera;
        return this;
    }

    cameraChanged(lastConfig) {
        return this.camera !== lastConfig.camera;
    }

    setAmbientLight(light) {
        this.ambientLight = light;
        return this;
    }

    setTorchesLight(light) {
        this.torchesLight = light;
        return this;
    }

    setUseNormalMapping(normalMapping) {
        this.useNormalMapping = normalMapping;
        return this;
    }

}