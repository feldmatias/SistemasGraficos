import {Shape} from "./Shape.js";

export class RevolutionShape extends Shape {

    getCapNormals(isFirstCap) {
        throw "Revolution shapes don't have caps";
    }

}