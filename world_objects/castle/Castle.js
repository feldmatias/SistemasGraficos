import {DrawableObject} from "../../objects/DrawableObject.js";
import {CastleFloor} from "./CastleFloor.js";
import {CastleFloorSeparator} from "./CastleFloorSeparator.js";
import {CastleRoof} from "./roof/CastleRoof.js";

export class Castle extends DrawableObject {

    constructor(width, length, floorsCount, floorHeight = 2) {
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
        let floor_base = new CastleFloor(this.width, this.length, this.floorHeight);
        for (let i = 0; i < this.floorsCount; i++) {
            let translation = this.floorHeight / 2 + this.floorHeight * i;
            let floor = floor_base.clone()
                .translate(0, 0, translation);
            this.floors.push(floor);
            if (i > 0) {
                this.createFloorSeparators(i);
            }
        }
    }

    createFloorSeparators(i) {
        let separatorWidth = 0.1;

        let separator_front_back = new CastleFloorSeparator(separatorWidth, this.width);
        separator_front_back.rotate(Math.PI / 2, 0, 1, 0);

        let frontSeparator = separator_front_back.clone()
            .translate(-this.length / 2, this.floorHeight * i, 0);
        let backSeparator = separator_front_back.clone()
            .translate(this.length / 2, this.floorHeight * i, 0);


        let separator_left_right = new CastleFloorSeparator(separatorWidth, this.length);

        let leftSeparator = separator_left_right.clone()
            .translate(-this.width / 2, this.floorHeight * i, 0);
        let rightSeparator = separator_left_right.clone()
            .translate(this.width / 2, this.floorHeight * i, 0);

        this.floorSeparators.push(frontSeparator, backSeparator, leftSeparator, rightSeparator);
    }

    createRoof() {
        let translation = this.floorHeight / 2 + this.floorHeight * this.floorsCount;
        this.roof = new CastleRoof(this.width, this.length, this.floorHeight)
            .translate(0, 0, translation);
    }
}