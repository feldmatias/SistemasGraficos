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
        castle.add(this, 'Ancho', 2, 10).step(1);
        castle.add(this, 'Largo', 2, 10).step(1);
        castle.add(this, 'Pisos', 1, 5).step(1);
        castle.open();
    }

    setDefaultValues() {
        this.AlturaCamara = 6;
        this.DistanciaCamara = 12;
        this.VelocidadAngular = 1;

        this.Ancho = 5;
        this.Largo = 3;
        this.Pisos = 2;
    }

    getSceneConfig() {
        return new SceneConfig()
            .setCameraDistance(this.DistanciaCamara)
            .setCameraHeight(this.AlturaCamara)
            .setAngularVelocity(this.VelocidadAngular)
            .setCastleWidth(this.Ancho)
            .setCastleLength(this.Largo)
            .setCastleFloorsCount(this.Pisos);
    }
}