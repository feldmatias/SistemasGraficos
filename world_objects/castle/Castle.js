import {DrawableObject} from "../../objects/DrawableObject.js";
import {CastleFloor} from "./CastleFloor.js";
import {CastleFloorSeparator} from "./CastleFloorSeparator.js";
import {CastleRoof} from "./roof/CastleRoof.js";
import {CastleColumn} from "./column/CastleColumn.js";

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
        this.createColumns();
    }

    getChildren() {
        return [
            this.floors,
            this.floorSeparators,
            this.roof,
            this.columns,
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

        let separatorFrontBack = new CastleFloorSeparator(separatorWidth, this.width);
        separatorFrontBack.rotate(Math.PI / 2, 0, 1, 0);

        let frontSeparator = separatorFrontBack.clone()
            .translate(-this.length / 2, this.floorHeight * i, 0);
        let backSeparator = separatorFrontBack.clone()
            .translate(this.length / 2, this.floorHeight * i, 0);


        let separatorLeftRight = new CastleFloorSeparator(separatorWidth, this.length);

        let leftSeparator = separatorLeftRight.clone()
            .translate(-this.width / 2, this.floorHeight * i, 0);
        let rightSeparator = separatorLeftRight.clone()
            .translate(this.width / 2, this.floorHeight * i, 0);

        this.floorSeparators.push(frontSeparator, backSeparator, leftSeparator, rightSeparator);
    }

    createRoof() {
        let translation = this.floorHeight / 2 + this.floorHeight * this.floorsCount;
        this.roof = new CastleRoof(this.width, this.length, this.floorHeight)
            .translate(0, 0, translation);
    }

    createColumns() {
        let columnHeight = this.floorHeight / 2 + this.floorHeight * this.floorsCount;
        let column = new CastleColumn(columnHeight, this.floorHeight);

        let rightFrontColumn = column.clone()
            .translate(this.width / 2, 0, this.length / 2);
        let rightBackColumn = column.clone()
            .translate(-this.width / 2, 0, this.length / 2);
        let leftFrontColumn = column.clone()
            .translate(this.width / 2, 0, -this.length / 2);
        let leftBackColumn = column.clone()
            .translate(-this.width / 2, 0, -this.length / 2);

        this.columns = [rightFrontColumn, rightBackColumn, leftFrontColumn, leftBackColumn];
    }
}