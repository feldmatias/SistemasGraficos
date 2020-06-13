export class Camera {

    constructor() {
        this.active = false;
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    isActive() {
        return this.active;
    }

    getViewOrigin() {
        throw "Not implemented";
    }

    getViewDestination() {
        throw "Not implemented";
    }

}