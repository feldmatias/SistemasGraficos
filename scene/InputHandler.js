export class InputHandler {

    constructor() {
        this.canvas = $('#my-canvas');
        this.body = $('body');
        this.initializeMouseClickEvent();
        this.initializeMouseScrollEvent();
        this.initializeKeyboardEvent();
    }

    initializeMouseClickEvent() {
        this.isMouseDown = false;
        this.lastMousePosition = {x: 0, y: 0};

        this.canvas.mousedown((event) => {
            if (event.button === 0) {
                this.isMouseDown = true;
            }
        });

        this.canvas.mouseup((event) => {
            if (event.button === 0) {
                this.isMouseDown = false;
            }
        });

        this.canvas.mouseleave((event) => {
            this.isMouseDown = false;
        });

        this.canvas.mousemove((event) => {
            let mousePosition = {
                x: event.clientX || event.pageX,
                y: event.clientY || event.pageY,
            }

            if (this.isMouseDown) {
                let deltaX = mousePosition.x - this.lastMousePosition.x;
                let deltaY = mousePosition.y - this.lastMousePosition.y;
                this.onMouseMoved(deltaX, deltaY);
            }

            this.lastMousePosition = mousePosition;
        });
    }

    initializeMouseScrollEvent() {
        this.canvas.bind('mousewheel', (event) => {
            if(event.originalEvent.wheelDelta  > 0) {
                this.onScroll(1);
            }
            else{
                this.onScroll(-1);
            }
        });
    }

    initializeKeyboardEvent() {
        this.keysPressed = [];

        this.body.on("keydown",(event) => {
            if (!this.keysPressed.includes(event.key)) {
                this.keysPressed.push(event.key);
            }
        });

        this.body.on("keyup",(event) => {
            this.keysPressed = this.keysPressed.filter((key) => key !== event.key);
        });

        this.pressKeys();
    }

    pressKeys() {
        setTimeout(() => this.pressKeys(), 1000 / 60); // One key press per frame
        this.keysPressed.forEach((key) => this.onKeyPressed(key));
    }

    onMouseMoved(deltaX, deltaY) {

    }

    onScroll(direction) {

    }

    onKeyPressed(key) {

    }
}