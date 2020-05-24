export class Shape {

    getVertices() {
        return [];
    }

    getNormals() {
        return this.getVertices();
    }

    getTextures(u, v) {
        return vec2.fromValues(u , v);
    }

    isClosed() {
        return true;
    }
}
