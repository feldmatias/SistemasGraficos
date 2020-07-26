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
        this.menu.addColor(this, 'LuzAmbiente')

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
        this.LuzAmbiente = [85, 85, 85];

        // Castle configuration
        this.Ancho = 7;
        this.Largo = 9;
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
            .setAmbientLight(this.LuzAmbiente);
    }
}