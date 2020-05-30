import {SceneConfig} from "./SceneConfig.js";

export class Menu {

    constructor() {
        this.setDefaultValues();

        this.menu = new dat.GUI();
        this.menu.add(this, 'AlturaCamara', 0, 30);
        this.menu.add(this, 'DistanciaCamara', 1, 30);
        this.menu.add(this, 'VelocidadAngular', 0, 10).step(1);

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
        this.AlturaCamara = 6;
        this.DistanciaCamara = 25;
        this.VelocidadAngular = 1;

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
            .setCameraDistance(this.DistanciaCamara)
            .setCameraHeight(this.AlturaCamara)
            .setAngularVelocity(this.VelocidadAngular)
            .setCastleWidth(this.Ancho)
            .setCastleLength(this.Largo)
            .setCastleFloorsCount(this.Pisos)
            .setWallHeight(this.Altura)
            .setWallColumnCount(this.Columnas);
    }
}