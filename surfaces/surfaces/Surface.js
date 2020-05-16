export class Surface {

    getPosition(u, v) {
        return vec3.create();
    }

    getNormal(u, v) {
        return this.getPosition(u, v);
    }

    getTextures(u, v) {
        return vec2.fromValues(u, v);
    }

}
