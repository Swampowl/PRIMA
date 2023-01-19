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
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
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
    let redBlob_rigid;
    let blueBlob;
    let blueBlob_rigid;
    let characters;
    let net;
    let net_rigid;
    let ball;
    let ball_rigid;
    let wall_right;
    let wall_right_rigid;
    let wall_left;
    let wall_left_rigid;
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        cmpCamera = viewport.camera;
        branch = viewport.getBranch();
        viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        //start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, -1, 10));
        cmpCamera.mtxPivot.rotateY(180);
        console.log(branch);
        characters = branch.getChildrenByName("g_character")[0];
        console.log(characters);
        //char //red
        redBlob = characters.getChildrenByName("character_red")[0];
        console.log(redBlob);
        redBlob_rigid = redBlob.getComponent(ƒ.ComponentRigidbody);
        redBlob_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
        //char //blue
        blueBlob = characters.getChildrenByName("character_blue")[0];
        console.log(blueBlob);
        blueBlob_rigid = blueBlob.getComponent(ƒ.ComponentRigidbody);
        blueBlob_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
        //ball
        ball = branch.getChildrenByName("ball")[0];
        ball_rigid = ball.getComponent(ƒ.ComponentRigidbody);
        ball_rigid.effectRotation = new ƒ.Vector3(0, 0, 1);
        //net
        net = branch.getChildrenByName("net")[0];
        net_rigid = net.getComponent(ƒ.ComponentRigidbody);
        net_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
        //wall_left
        wall_left = branch.getChildrenByName("wall_left")[0];
        wall_left_rigid = wall_left.getComponent(ƒ.ComponentRigidbody);
        wall_left_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
        //wall_right
        wall_right = branch.getChildrenByName("wall_right")[0];
        wall_right_rigid = wall_right.getComponent(ƒ.ComponentRigidbody);
        wall_right_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
        ƒ.Loop.start();
    }
    function update(_event) {
        let posBall_rigid;
        let pos_blueBlob_rigid;
        ƒ.Physics.simulate();
        viewport.draw();
        ƒ.AudioManager.default.update();
        movement();
        console.log(ball.mtxLocal.translation.toString());
        posBall_rigid = ball_rigid.getPosition();
        posBall_rigid.z = 3;
        // pos_blueBlob_rigid = blueBlob.getPos
        // blueBlob_rigid.z =3 ;
        ball_rigid.setPosition(posBall_rigid);
    }
    function movement() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
            redBlob.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(+10, 0, 0));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
            redBlob.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(-7.5, 0, 0));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            blueBlob.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(-10, 0, 0));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            blueBlob.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(7.5, 0, 0));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP])) {
            blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(0.015);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
            blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(-0.02);
        }
        else {
            blueBlob.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(0, 0, 0));
            redBlob.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(0, 0, 0));
            redBlob.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(0, -2, 0));
        }
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map