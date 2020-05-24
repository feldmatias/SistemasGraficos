import {DrawableObject} from "../../objects/DrawableObject.js";
import {CastleFloor} from "./CastleFloor.js";

export class Castle extends DrawableObject {

    constructor(width = 4, length = 4, floorsCount = 3, floorHeight = 2) {
        super();

        this.width = width;
        this.length = length;
        this.floorsCount = floorsCount;
        this.floorHeight = floorHeight;

        this.initialize();
    }

    initialize() {
        this.createFloors();
    }

    getChildren() {
        return this.floors;
    }

    createFloors() {
        let floor = new CastleFloor(this.width, this.length, this.floorHeight);
        this.floors = [floor];
    }
}