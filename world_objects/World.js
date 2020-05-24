import {DrawableObject} from "../objects/DrawableObject.js";
import {Castle} from "./castle/Castle.js";

export class World extends DrawableObject {

    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        this.castle = new Castle();
    }

    getChildren() {
        return [
            this.castle
        ];
    }
}