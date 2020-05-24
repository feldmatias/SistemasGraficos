import {DrawableObject} from "../../objects/DrawableObject.js";
import {CastleFloor} from "./CastleFloor.js";
import {CastleFloorSeparator} from "./CastleFloorSeparator.js";
import {CastleRoof} from "./roof/CastleRoof.js";

export class Castle extends DrawableObject {

    constructor(width = 4, length = 2, floorsCount = 2, floorHeight = 2) {
        super();

        this.width = width;
        this.length = length;
        this.floorsCount = floorsCount;
        this.floorHeight = floorHeight;

        this.initialize();
    }

    initialize() {
        this.floors = [];
        this.floorSeparators = [];

        this.createFloors();
        this.createRoof();
    }

    getChildren() {
        return [
            this.floors,
            this.floorSeparators,
            this.roof,
        ].flat();
    }

    createFloors() {
        for (let i = 0; i < this.floorsCount; i++) {
            let floor = new CastleFloor(this.width, this.length, this.floorHeight);
            let translation = this.floorHeight / 2 + this.floorHeight * i;
            floor.translate(0, 0, translation);
            this.floors.push(floor);
            if (i > 0) {
                this.createFloorSeparators(i);
            }
        }
    }

    createFloorSeparators(i) {
        let separatorWidth = 0.1;

        let frontSeparator = new CastleFloorSeparator(separatorWidth, this.width);
        frontSeparator.rotate(Math.PI / 2, 0, 1, 0);
        frontSeparator.translate(-this.length / 2, this.floorHeight * i, 0);

        let backSeparator = new CastleFloorSeparator(separatorWidth, this.width);
        backSeparator.rotate(Math.PI / 2, 0, 1, 0);
        backSeparator.translate(this.length / 2, this.floorHeight * i, 0);

        let leftSeparator = new CastleFloorSeparator(separatorWidth, this.length);
        leftSeparator.translate(-this.width / 2, this.floorHeight * i, 0);

        let rightSeparator = new CastleFloorSeparator(separatorWidth, this.length);
        rightSeparator.translate(this.width / 2, this.floorHeight * i, 0);

        this.floorSeparators.push(frontSeparator, backSeparator, leftSeparator, rightSeparator);
    }

    createRoof() {
        this.roof = new CastleRoof(this.width, this.length, this.floorHeight);
        let translation = this.floorHeight / 2 + this.floorHeight * this.floorsCount;
        this.roof.translate(0, 0, translation);
    }
}