import {RevolutionPath} from "./paths/CirclePath.js";

export class SurfacesGenerator {

    generateSweepSurface(shape, path, withCaps = false) {

        let sweepSurface = new SweepSurfacesAlgorithm();
        sweepSurface.generateSweepSurface(shape, path, withCaps);

        let cols = sweepSurface.vertices.length - 1;
        let rows = sweepSurface.levels.length - 1;
        let indexBuffer = this._generateIndexBuffer(rows, cols, shape.isClosed());

        return {
            positionBuffer: sweepSurface.positionBuffer,
            normalBuffer: sweepSurface.normalBuffer,
            tangentBuffer: sweepSurface.tangentBuffer,
            binormalBuffer: sweepSurface.binormalBuffer,
            uvBuffer: sweepSurface.uvBuffer,
            indexBuffer: indexBuffer
        }
    }

    generateRevolutionSurface(shape, step = 1) {
        let path = new RevolutionPath(step);
        return this.generateSweepSurface(shape, path);
    }

    _generateIndexBuffer(rows, columns, closed = false) {
        let indexBuffer = [];

        function point(i, j) {
            return i * (columns + 1) + j;
        }

        for (let i = 0; i <= rows - 1; i++) {
            if (i > 0 && !closed) {
                // Degenerate triangles to join two rows
                indexBuffer.push(point(i, columns), point(i, 0));
            }

            for (let j = 0; j <= columns; j++) {
                indexBuffer.push(point(i, j), point(i + 1, j));
            }

            if (closed) {
                // Repeat the first column, so it is a closed figure
                indexBuffer.push(point(i, 0), point(i + 1, 0));
            }
        }

        return indexBuffer;
    }

}

class SweepSurfacesAlgorithm {

    generateSweepSurface(shape, path, withCaps = false) {
        this.positionBuffer = [];
        this.normalBuffer = [];
        this.tangentBuffer = [];
        this.binormalBuffer = [];
        this.uvBuffer = [];

        this.vertices = shape.getVertices();
        this.normals = shape.getNormals();
        this.tangents = shape.getTangents();
        this.getUvs(shape, path);

        this.levels = this.getLevels(path, withCaps);

        for (let i = 0; i < this.levels.length; i++) {
            let level = this.levels[i];
            let isCap = withCaps && (i === 0 || i === this.levels.length - 1);

            let vertices = isCap ? shape.getCapVertices() : this.vertices;
            let matrix = path.getLevelMatrix(level);
            let modified_vertices = this.applyMatrix(vertices, matrix);

            let isNormalCap = withCaps && (i <= 1 || i >= this.levels.length - 2);
            // Caps have different normals than common levels, although they have the same vertices
            let normals = isNormalCap ? shape.getCapNormals(i <= 1) : this.normals;
            let normalMatrix = path.getLevelNormalMatrix(level);
            let modified_normals = this.applyMatrix(normals, normalMatrix, true);

            let tangents = isNormalCap ? shape.getCapTangents() : this.tangents;
            let modified_tangents = this.applyMatrix(tangents, normalMatrix, true);

            let capUvs = isCap ? this.centerCapUvs : (isNormalCap ? this.capUvs : null);
            this.fillBuffers(withCaps ? i - 2 : i, modified_vertices, modified_normals, modified_tangents, capUvs);
        }
    }

    getLevels(path, withCaps) {
        let levels = Array.from(Array(path.getLevelsCount()).keys());
        if (withCaps) {
            // Repeat first and last level twice, one will be scaled to 0, the other will have cap normals but no scale
            levels.unshift(0);
            levels.unshift(0);
            levels.push(path.getLevelsCount() - 1);
            levels.push(path.getLevelsCount() - 1);
        }
        return levels;
    }

    applyMatrix(vertices, matrix, normals = false) {
        return vertices.slice().map(vertex => {
            let modified = vec3.create();
            if (normals) {
                vec3.transformMat3(modified, vertex, matrix);
            } else {
                vec3.transformMat4(modified, vertex, matrix);
            }
            return modified;
        });
    }

    fillBuffers(level, modified_vertices, modified_normals, modified_tangents, capUvs) {
        for (let j = 0; j < modified_vertices.length; j++) {
            let vertex = modified_vertices[j];
            this.positionBuffer.push(vertex[0], vertex[1], vertex[2]);
            let normal = modified_normals[j];
            this.normalBuffer.push(normal[0], normal[1], normal[2]);
            let tangent = modified_tangents[j];
            this.tangentBuffer.push(tangent[0], tangent[1], tangent[2]);

            let binormal = vec3.create();
            vec3.cross(binormal, tangent, normal);
            this.binormalBuffer.push(binormal[0], binormal[1], binormal[2]);

            if (capUvs) {
                let uv = capUvs[j];
                this.uvBuffer.push(uv[0], uv[1]);
            } else {
                let u = this.shapeUvs[j];
                let v = this.pathUvs[level];
                this.uvBuffer.push(u, v);
            }

        }
    }

    getUvs(shape, path) {
        this.shapeUvs = shape.getUvs();
        this.pathUvs = path.getUvs();

        this.capUvs = shape.getCapUvs();
        this.centerCapUvs = shape.getCenterCapUvs();
    }
}
