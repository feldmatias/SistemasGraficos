import {RevolutionPath} from "./paths/CirclePath.js";

export class SurfacesGenerator {

    generateSurface(surface, rows, columns) {
        let positionBuffer = [];
        let normalBuffer = [];
        let uvBuffer = [];

        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j <= columns; j++) {

                let u = j / columns;
                let v = i / rows;

                let position = surface.getPosition(u, v);
                positionBuffer.push(position[0], position[1], position[2]);

                let normal = surface.getNormal(u, v);
                normalBuffer.push(normal[0], normal[1], normal[2]);

                let uvs = surface.getTextures(u, v);
                uvBuffer.push(uvs[0], uvs[1]);
            }
        }

        let indexBuffer = this._generateIndexBuffer(rows, columns);

        return {
            positionBuffer,
            normalBuffer,
            uvBuffer,
            indexBuffer
        }
    }

    generateSweepSurface(shape, path, withCaps = false) {

        let sweepSurface = new SweepSurfacesAlgorithm();
        sweepSurface.generateSweepSurface(shape, path, withCaps);

        let cols = sweepSurface.vertices.length - 1;
        let rows = sweepSurface.levels.length - 1;
        let indexBuffer = this._generateIndexBuffer(rows, cols, shape.isClosed());

        return {
            positionBuffer: sweepSurface.positionBuffer,
            normalBuffer: sweepSurface.normalBuffer,
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
        this.uvBuffer = [];

        this.vertices = shape.getVertices();
        this.normals = shape.getNormals();

        this.levels = this.getLevels(path, withCaps);

        for (let i = 0; i < this.levels.length; i++) {
            let level = this.levels[i];

            let addCaps = withCaps && (i === 0 || i === this.levels.length - 1);
            let modified_vertices = this.getVertices(path, level, addCaps);
            let modified_normals = this.getNormals(path, level);

            for (let j = 0; j < modified_vertices.length; j++) {
                let vertex = modified_vertices[j];
                this.positionBuffer.push(vertex[0], vertex[1], vertex[2]);
                let normal = modified_normals[j];
                this.normalBuffer.push(normal[0], normal[1], normal[2]);

                let u = i / (this.levels.length - 1);
                let v = j / (modified_vertices.length - 1);
                let uv = shape.getTextures(u, v);
                this.uvBuffer.push(uv[0], uv[1]);
            }
        }
    }

    getLevels(path, withCaps) {
        let levels = Array.from(Array(path.getLevelsCount()).keys());
        if (withCaps) {
            // Repeat first and last level
            levels.unshift(0);
            levels.push(path.getLevelsCount() - 1);
        }
        return levels;
    }

    getVertices(path, level, withCaps) {
        let matrix = path.getLevelMatrix(level);
        if (withCaps) {
            // Repeat first and last levels, but scale to 0 to create the caps.
            let capsScale = 0.00001;
            mat4.scale(matrix, matrix, vec3.fromValues(capsScale, capsScale, capsScale));
        }

        return this._applyMatrix(this.vertices, matrix);
    }

    getNormals(path, level) {
        let normalMatrix = path.getLevelNormalMatrix(level);
        return this._applyMatrix(this.normals, normalMatrix, true);
    }

    _applyMatrix(vertices, matrix, normals = false) {
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

}
