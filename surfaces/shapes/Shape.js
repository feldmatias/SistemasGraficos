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
            let distance = vec3.distance(vertices[i], vertices[i -1]);
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

    getCapUvs() {
        let vertices = this.getVertices();

        let minX = Math.min( ...vertices.map(v => v[0]));
        let maxX = Math.max( ...vertices.map(v => v[0]));
        let minY = Math.min( ...vertices.map(v => v[1]));
        let maxY = Math.max( ...vertices.map(v => v[1]));

        return vertices.map(vertex => {
           let x = (vertex[0] - minX) / (maxX - minX);
           let y = (vertex[1] - minY) / (maxY - minY);
           return vec2.fromValues(x, y);
        });
    }

    getCenterCapUvs() {
        let verticesCount = this.getVertices().length;
        let uv = vec2.fromValues(0.5, 0.5);
        return Array(verticesCount).fill(uv);
    }
}
