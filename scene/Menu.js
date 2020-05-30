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
        castle.add(this, 'Ancho', 2, 6).step(1);
        castle.add(this, 'Largo', 2, 6).step(1);
        castle.add(this, 'Pisos', 1, 5).step(1);
        castle.open();

        // Wall configuration
        let wall = this.menu.addFolder('Muralla');
        wall.add(this, 'Altura', 2, 6).step(1);
        wall.add(this, 'Columnas', 4, 8).step(1);
        wall.open();
    }

    setDefaultValues() {
        this.AlturaCamara = 6;
        this.DistanciaCamara = 18;
        this.VelocidadAngular = 1;

        // Castle configuration
        this.Ancho = 5;
        this.Largo = 3;
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