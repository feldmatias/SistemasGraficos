export class Shape {

    getVertices() {
        return [];
    }

    getNormals() {
        return [];
    }

    getTextures(i) {
        return vec2.create();
    }

    isClosed() {
        return true;
    }
}
