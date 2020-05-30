export class Shape {

    getVertices() {
        return [];
    }

    getNormals() {
        return this.getVertices();
    }

    getTextures(u, v) {
        return vec2.fromValues(u, v);
    }

    isClosed() {
        return false;
    }

    getCapVertices() {
        let capsScale = 0.00001;
        let vertices = this.getVertices();
        return vertices.slice().map(vertex => {
            let modified = vec3.create();
            vec3.scale(modified, vertex, capsScale);
            return modified;
        });
    }

    getCapNormals(isFirstCap) {
        // The normals in caps are always in z direction
        let verticesCount = this.getVertices().length;
        let normal = vec3.fromValues(0, 0, isFirstCap ? -1 : 1);
        return Array(verticesCount).fill(normal);
    }
}
