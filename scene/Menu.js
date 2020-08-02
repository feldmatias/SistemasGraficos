import {SceneConfig} from "./SceneConfig.js";

export class Menu {

    cameraOptions = {
        Orbital: 'orbital',
        Catapulta: 'catapult',
        PrimeraPersona: 'firstPerson'
    }

    constructor() {
        this.setDefaultValues();

        this.menu = new dat.GUI();

        this.menu.add(this, 'Camara', Object.keys(this.cameraOptions));

        // Lighting configuration
        let lighting = this.menu.addFolder('Iluminacion');
        lighting.addColor(this, 'LuzSolar');
        lighting.addColor(this, 'LuzAntorchas');
        lighting.add(this, 'NormalMapping');
        lighting.open();

        // Castle configuration
        let castle = this.menu.addFolder('Castillo');
        castle.add(this, 'Ancho', 4, 12).step(1);
        castle.add(this, 'Largo', 4, 12).step(1);
        castle.add(this, 'Pisos', 1, 5).step(1);
        castle.open();

        // Wall configuration
        let wall = this.menu.addFolder('Muralla');
        wall.add(this, 'Altura', 3, 7).step(0.5);
        wall.add(this, 'Columnas', 4, 8).step(1);
        wall.open();
    }

    setDefaultValues() {
        this.Camara = 'Orbital';

        // Lights
        this.LuzSolar = [50, 50, 50];
        this.LuzAntorchas = [193, 138, 37];
        this.NormalMapping = true;

        // Castle configuration
        this.Ancho = 9;
        this.Largo = 7;
        this.Pisos = 2;

        // Wall configuration
        this.Altura = 4;
        this.Columnas = 6;
    }

    getSceneConfig() {
        return new SceneConfig()
            .setCastleWidth(this.Ancho)
            .setCastleLength(this.Largo)
            .setCastleFloorsCount(this.Pisos)
            .setWallHeight(this.Altura)
            .setWallColumnCount(this.Columnas)
            .setCamera(this.cameraOptions[this.Camara])
            .setAmbientLight(this.LuzSolar)
            .setTorchesLight(this.LuzAntorchas)
            .setUseNormalMapping(this.NormalMapping);
    }
}