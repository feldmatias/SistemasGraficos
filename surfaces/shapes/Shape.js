export class Shape {

    getVertices() {
        return [];
    }

    getNormals() {
        return this.getVertices();
    }

    getUvs() {
        let perimeter = 0;
        let accumulatedDistances = [0];

        let vertices = this.getVertices();
        if (this.isClosed()) {
            vertices.push(vertices[0]);
        }

        for (let i = 1; i < vertices.length; i++) {
            let distance = vec3.distance(vertices[i], vertices[i-1]);
            perimeter += distance;
            accumulatedDistances.push(perimeter);
        }

        return accumulatedDistances.map(x => x / perimeter);
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
