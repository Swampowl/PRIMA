"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
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
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let branch;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let cmpCamera;
    //blobs
    let redBlob;
    let blueBlob;
    let characters;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        cmpCamera = viewport.camera;
        branch = viewport.getBranch();
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, -1, 9));
        cmpCamera.mtxPivot.rotateY(180);
        console.log(branch);
        characters = branch.getChildrenByName("g_character")[0];
        console.log(characters);
        //characters.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(+1);
        redBlob = characters.getChildrenByName("character_red")[0];
        console.log(redBlob);
        blueBlob = characters.getChildrenByName("character_blue")[0];
        console.log(blueBlob);
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
        movement();
    }
    function movement() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            redBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(0.02);
            console.log(redBlob.mtxLocal.getX().x);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            redBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-0.015);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(0.015);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-0.02);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP])) {
            blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(0.015);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
            blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(-0.02);
        }
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map