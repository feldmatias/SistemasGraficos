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

        this.canvas.mousedown(() => {
            this.isMouseDown = true;
        });

        this.canvas.mouseup(() => {
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
        this.body.on("keydown",(event) => {
            this.onKeyPressed(event.key);
        });
    }

    onMouseMoved(deltaX, deltaY) {

    }

    onScroll(direction) {

    }

    onKeyPressed(key) {

    }
}