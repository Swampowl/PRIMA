"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let spaceship = viewport.getBranch().getChildrenByName("Ship");
    function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
        console.log(spaceship);
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class SpaceShipMovement extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(SpaceShipMovement);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "SpaceShipMovement added to ";
        rgdBodySpaceship;
        // private pitchF: number = 20;
        // private rollF: number = 20;
        // private yawf: number = 20;
        strafeThrust = 2000;
        forwardthrust = 5000;
        relativeX;
        // private relativeY: ƒ.Vector3;
        relativeZ;
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    this.rgdBodySpaceship = this.node.getComponent(ƒ.ComponentRigidbody);
                    // this.rgdBodySpaceship.addVelocity(new ƒ.Vector3(0, 0, 10));
                    ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
                    console.log(this.node);
                    window.addEventListener("mousemove", this.handleMouse);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
        update = () => {
            this.setRelativeAxes();
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
                this.thrust();
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
                this.backwards();
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                this.rollLeft();
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                this.rollRight();
            }
            this.rgdBodySpaceship.applyTorque(new ƒ.Vector3(0, this.xAxis * -10, 0));
            this.rgdBodySpaceship.applyTorque(ƒ.Vector3.SCALE(this.relativeX, this.yAxis * 1.5));
        };
        width = 0;
        height = 0;
        xAxis = 0;
        yAxis = 0;
        handleMouse = (e) => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            let mousePositionY = e.clientY;
            let mousePositionX = e.clientX;
            this.xAxis = 2 * (mousePositionX / this.width) - 1;
            this.yAxis = 2 * (mousePositionY / this.height) - 1;
        };
        setRelativeAxes() {
            this.relativeZ = ƒ.Vector3.TRANSFORMATION(new ƒ.Vector3(0, 0, 5), ƒ.Matrix4x4.ROTATION(this.node.mtxWorld.rotation));
            //  this.relativeY = ƒ.Vector3.TRANSFORMATION(new ƒ.Vector3(0, 5, 0), ƒ.Matrix4x4.ROTATION(this.node.mtxWorld.rotation));
            this.relativeX = ƒ.Vector3.TRANSFORMATION(new ƒ.Vector3(5, 0, 0), ƒ.Matrix4x4.ROTATION(this.node.mtxWorld.rotation));
        }
        backwards() {
            this.rgdBodySpaceship.applyForce(ƒ.Vector3.SCALE(this.relativeZ, -this.forwardthrust));
        }
        thrust() {
            let scaledRotatedDirection = ƒ.Vector3.SCALE(this.relativeZ, this.forwardthrust);
            this.rgdBodySpaceship.applyForce(scaledRotatedDirection);
        }
        rollLeft() {
            this.rgdBodySpaceship.applyTorque(ƒ.Vector3.SCALE(this.relativeZ, -1));
        }
        rollRight() {
            this.rgdBodySpaceship.applyTorque(ƒ.Vector3.SCALE(this.relativeZ, 1));
        }
    }
    Script.SpaceShipMovement = SpaceShipMovement;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map