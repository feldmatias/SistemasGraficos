import {RevolutionPath} from "./CirclePath.js";

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

    generateSweepSurface(shape, path) {
        let positionBuffer = [];
        let normalBuffer = [];
        let uvBuffer = [];

        let vertices = shape.getVertices();
        let normals = shape.getNormals();

        for (let i = 0; i < path.getLevelsCount(); i++) {
            let matrix = path.getLevelMatrix(i);
            let modified_vertices = this._applyMatrix(vertices, matrix, shape.isClosed());

            let normalMatrix = path.getLevelNormalMatrix(i);
            let modified_normals = this._applyMatrix(normals, normalMatrix, shape.isClosed(), true);

            for (let j = 0; j < modified_vertices.length; j++) {
                let vertex = modified_vertices[j];
                positionBuffer.push(vertex[0], vertex[1], vertex[2]);
                let normal = modified_normals[j];
                normalBuffer.push(normal[0], normal[1], normal[2]);
                let uv = shape.getTextures(j);
                uvBuffer.push(uv[0], uv[1]);
            }
        }

        let cols = vertices.length + (shape.isClosed() ? 0 : -1);
        let rows = path.getLevelsCount() - 1;
        let indexBuffer = this._generateIndexBuffer(rows, cols);

        return {
            positionBuffer,
            normalBuffer,
            uvBuffer,
            indexBuffer
        }
    }

    generateRevolutionSurface(shape, step=1) {
        let path = new RevolutionPath(step);
        return this.generateSweepSurface(shape, path);
    }

    _applyMatrix(vertices, matrix, closed, normals=false) {
        let modified_vertices = vertices.slice().map(vertex => {
            let modified = vec3.create();
            if (normals) {
                vec3.transformMat3(modified, vertex, matrix);
            } else {
                vec3.transformMat4(modified, vertex, matrix);
            }
            return modified;
        });

        if (closed) {
            modified_vertices.push(modified_vertices[0]);
        }

        return modified_vertices;
    }

    _generateIndexBuffer(rows, columns) {
        let indexBuffer = [];

        function point(i, j) {
            return i * (columns + 1) + j;
        }

        for (let i = 0; i <= rows - 1; i++) {
            if (i > 0) {
                indexBuffer.push(point(i, columns), point(i, 0));
            }

            for (let j = 0; j <= columns; j++) {
                indexBuffer.push(point(i, j), point(i + 1, j));
            }
        }

        return indexBuffer;
    }

}
