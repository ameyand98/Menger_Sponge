import { Camera } from "../lib/webglutils/Camera.js";
import { Mat4, Vec3, Vec4 } from "../lib/TSM.js";
/**
 * Handles Mouse and Button events along with
 * the the camera.
 */
export class GUI {
    /**
     *
     * @param canvas required to get the width and height of the canvas
     * @param animation required as a back pointer for some of the controls
     * @param sponge required for some of the controls
     */
    constructor(canvas, animation, sponge) {
        this.height = canvas.height;
        this.width = canvas.width;
        this.prevX = 0;
        this.prevY = 0;
        this.sponge = sponge;
        this.animation = animation;
        this.reset();
        this.registerEventListeners(canvas);
    }
    /**
     * Resets the state of the GUI
     */
    reset() {
        this.fps = false;
        this.dragging = false;
        /* Create camera setup */
        this.camera = new Camera(new Vec3([0, 0, -6]), new Vec3([0, 0, 0]), new Vec3([0, 1, 0]), 45, this.width / this.height, 0.1, 1000.0);
    }
    /**
     * Sets the GUI's camera to the given camera
     * @param cam a new camera
     */
    setCamera(pos, target, upDir, fov, aspect, zNear, zFar) {
        this.camera = new Camera(pos, target, upDir, fov, aspect, zNear, zFar);
    }
    /**
     * Returns the view matrix of the camera
     */
    viewMatrix() {
        return this.camera.viewMatrix();
    }
    /**
     * Returns the projection matrix of the camera
     */
    projMatrix() {
        return this.camera.projMatrix();
    }
    /**
     * Callback function for the start of a drag event.
     * @param mouse
     */
    dragStart(mouse) {
        this.dragging = true;
        this.prevX = mouse.screenX;
        this.prevY = mouse.screenY;
    }
    /**
     * The callback function for a drag event.
     * This event happens after dragStart and
     * before dragEnd.
     * @param mouse
     */
    drag(mouse) {
        // TODO: Your code here for left and right mouse drag
        this.invProjView = Mat4.product(this.projMatrix(), this.viewMatrix()).inverse();
        var curr_x = mouse.screenX;
        var curr_y = mouse.screenY;
        // this.drag_v = Vec2.difference(new Vec2([curr_x, curr_y]),  new Vec2([this.prevX, this.prevY]));
        var x = 2.0 * curr_x / this.width - 1;
        var y = 2.0 * curr_y / this.height - 1;
        this.currWorldScreenPos = this.invProjView.multiplyVec4(new Vec4([x, -y, -1.0, 1.0])).normalize();
        ///// might not need to normalize 
        var prev_x = 2.0 * this.prevX / this.width - 1;
        var prev_y = 2.0 * this.prevY / this.height - 1;
        // get the drag vector in world coords
        this.drag_v = Vec4.difference(this.currWorldScreenPos, this.invProjView.multiplyVec4(new Vec4([prev_x, -prev_y, -1.0, 1.0])).normalize()).normalize();
        this.swivelAxis = Vec3.cross(new Vec3(this.drag_v.xyz), this.camera.forward()).normalize();
        // this.camera.rotate(this.swivelAxis, 0.05);
        this.camera.orbitTarget(this.swivelAxis, 0.2);
    }
    /**
     * Callback function for the end of a drag event
     * @param mouse
     */
    dragEnd(mouse) {
        this.dragging = false;
        this.prevX = 0;
        this.prevY = 0;
    }
    /**
     * Callback function for a key press event
     * @param key
     */
    onKeydown(key) {
        /*
           Note: key.code uses key positions, i.e a QWERTY user uses y where
                 as a Dvorak user must press F for the same action.
           Note: arrow keys are only registered on a KeyDown event not a
           KeyPress event
           We can use KeyDown due to auto repeating.
         */
        // TOOD: Your code for key handling
        switch (key.code) {
            case "KeyW": {
                this.camera.offsetDist(-0.1);
                break;
            }
            case "KeyA": {
                this.camera.offset(this.camera.right(), -0.1, false);
                break;
            }
            case "KeyS": {
                this.camera.offsetDist(0.1);
                break;
            }
            case "KeyD": {
                this.camera.offset(this.camera.right(), 0.1, false);
                break;
            }
            case "KeyR": {
                break;
            }
            case "ArrowLeft": {
                this.camera.roll(0.1, false);
                break;
            }
            case "ArrowRight": {
                this.camera.roll(0.1, true);
                break;
            }
            case "ArrowUp": {
                this.camera.offset(this.camera.up(), 0.1, false);
                break;
            }
            case "ArrowDown": {
                this.camera.offset(this.camera.up(), -0.1, false);
                break;
            }
            case "Digit1": {
                this.sponge.setLevel(1);
                break;
            }
            case "Digit2": {
                this.sponge.setLevel(2);
                break;
            }
            case "Digit3": {
                this.sponge.setLevel(3);
                break;
            }
            case "Digit4": {
                this.sponge.setLevel(4);
                break;
            }
            default: {
                console.log("Key : '", key.code, "' was pressed.");
                break;
            }
        }
    }
    // private zoomKey(forward: boolean) {
    //   let scale = this.camera.forward().scale(0.1);
    //   if (this.fps) {
    //     if (forward) {
    //     }
    //   }
    // }
    /**
     * Registers all event listeners for the GUI
     * @param canvas The canvas being used
     */
    registerEventListeners(canvas) {
        /* Event listener for key controls */
        window.addEventListener("keydown", (key) => this.onKeydown(key));
        /* Event listener for mouse controls */
        canvas.addEventListener("mousedown", (mouse) => this.dragStart(mouse));
        canvas.addEventListener("mousemove", (mouse) => this.drag(mouse));
        canvas.addEventListener("mouseup", (mouse) => this.dragEnd(mouse));
        /* Event listener to stop the right click menu */
        canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    }
}
GUI.rotationSpeed = 0.05;
GUI.zoomSpeed = 0.1;
GUI.rollSpeed = 0.1;
GUI.panSpeed = 0.1;
//# sourceMappingURL=Gui.js.map