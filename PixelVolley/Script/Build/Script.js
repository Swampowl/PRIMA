"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    //import ƒAid = FudgeAid;
    //import ƒui = FudgeUserInterface;
    let branch;
    ƒ.Debug.info("Main Program Template running!");
    let cmpCamera;
    //blobs
    let redBlob;
    let blueBlob;
    let net;
    let net_rigid;
    let ball;
    let ball_rigid;
    let wall_right;
    let wall_right_rigid;
    let wall_left;
    let wall_left_rigid;
    let posBall_rigid;
    let playedAudio;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        Script.viewport = _event.detail;
        cmpCamera = Script.viewport.camera;
        branch = Script.viewport.getBranch();
        Script.config = await (await fetch("Script/Source/config.json")).json();
        Script.viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        //start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, -1, 10));
        cmpCamera.mtxPivot.rotateY(180);
        redBlob = new Script.CharacterRed();
        blueBlob = new Script.CharacterBlue();
        // shadow
        shadow = branch.getChildrenByName("ground")[0].getChildrenByName("shadow")[0];
        //ball
        ball = branch.getChildrenByName("ball")[0];
        ball_rigid = ball.getComponent(ƒ.ComponentRigidbody);
        ball_rigid.mass = Script.config.ballMass;
        ball_rigid.effectGravity = Script.config.ballGravity;
        ball_rigid.effectRotation = new ƒ.Vector3(0, 0, 1);
        ball.getComponent(ƒ.ComponentRigidbody).addEventListener("ColliderEnteredCollision" /* COLLISION_ENTER */, (_event) => {
            let collisionPartner;
            //     console.log(_event);
            console.log(_event.cmpRigidbody.node.name);
            collisionPartner = _event.cmpRigidbody.node.name;
            if (collisionPartner === "character_red" || collisionPartner === "character_blue") {
                playedSound();
                ball_rigid.effectGravity = Script.config.ballGravity;
            }
            // score Red
            if (collisionPartner === ("rigid_right_point")) {
                Script.controllerStats.counterRed++;
                ball_rigid.effectGravity = 0;
                ball_rigid.setVelocity(new ƒ.Vector3(0, 0, 0));
                ball_rigid.setPosition(new ƒ.Vector3(1, -1.5, 3));
                resetBlobbs();
            }
            ;
            //score Blue
            if (collisionPartner === ("rigid_left_point")) {
                Script.controllerStats.counterBlue++;
                ball_rigid.effectGravity = 0;
                ball_rigid.setVelocity(new ƒ.Vector3(0, 0, 0));
                ball_rigid.setPosition(new ƒ.Vector3(-1, -1.5, 3));
                resetBlobbs();
            }
            ;
            if (collisionPartner === ("rigid_lower")) {
                playedSound();
                ball_rigid.effectGravity = Script.config.ballGravity;
            }
        });
        //document.getElementById("#vui").style.display = "block";
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
        Script.controllerStats = new Script.StandingsCounter();
        ƒ.Loop.start();
        //  setShadow();
    }
    function playedSound() {
        let audio = new ƒ.Audio("audio/ball_ hit1.mp3");
        playedAudio = new ƒ.ComponentAudio(audio, false, false);
        playedAudio.connect(true);
        playedAudio.volume = 0.8;
        console.log("AAAAAAAAAAAAAAAAAAADUSI");
        playedAudio.play(true);
    }
    function checkEnd() {
        if (Script.controllerStats.counterBlue === Script.config.maxScore || Script.controllerStats.counterRed === Script.config.maxScore)
            console.log("A player scored " + Script.config.maxScore + " points. Game ends now.");
    }
    function update(_event) {
        ƒ.Physics.simulate();
        Script.viewport.draw();
        ƒ.AudioManager.default.update();
        redBlob.movement();
        blueBlob.movement();
        checkEnd();
        // console.log(ball.mtxLocal.translation.toString())
        posBall_rigid = ball_rigid.getPosition();
        posBall_rigid.z = 3;
        redBlob.pos_redBlob_rigid = redBlob.redBlob_rigid.getPosition();
        blueBlob.pos_blueBlob_rigid = blueBlob.blueBlob_rigid.getPosition();
        //   console.log(posBall_rigid);
        ball_rigid.setPosition(posBall_rigid);
        // console.log(pos_blueBlob_rigid.y);
    }
    function resetBlobbs() {
        redBlob.getComponent(ƒ.ComponentRigidbody).setPosition(new ƒ.Vector3(-2, -1.5, 3));
        blueBlob.getComponent(ƒ.ComponentRigidbody).setPosition(new ƒ.Vector3(2, -1.5, 3));
    }
    // function setShadow() {
    // shadow.getComponent(ƒ.ComponentRigidbody).setPosition(new ƒ.Vector3(0, posBall_rigid.y, 0));
    // }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    //import ƒAid = FudgeAid;
    var ƒui = FudgeUserInterface;
    class StandingsCounter extends ƒ.Mutable {
        controller;
        counterRed = 0;
        counterBlue = 0;
        constructor() {
            super();
            this.controller = new ƒui.Controller(this, document.querySelector("#vui"));
        }
        reduceMutator(_mutator) {
        }
    }
    Script.StandingsCounter = StandingsCounter;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class SunRotationScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(SunRotationScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
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
                    ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.rotate);
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
        rotate = (_event) => {
            // console.log(viewport.getBranch().getChildrenByName("sun")[0].getComponent(ƒ.ComponentTransform).mtxLocal.rotate(new ƒ.Vector3(100, 100, (100 * ƒ.Loop.timeFrameGame) / 1000)));
            Script.viewport.getBranch().getChildrenByName("sun")[0].getComponent(ƒ.ComponentTransform).mtxLocal.rotate(new ƒ.Vector3(1, 1, (-.1 * ƒ.Loop.timeFrameGame) / 1000000000000));
            // this.node.getComponent(ƒ.ComponentTransform).mtxLocal.rotate(new ƒ.Vector3(100, 100, (100 * ƒ.Loop.timeFrameGame) / 1000));
        };
    }
    Script.SunRotationScript = SunRotationScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class CharacterBlue extends ƒ.Node {
        blueBlob;
        blueBlob_rigid;
        animationBlue;
        pos_blueBlob_rigid;
        constructor() {
            super("Blobb");
            this.initBlob();
        }
        async initBlob() {
            await this.valueAnimation();
        }
        movement() {
            //blueBlobb
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                this.blueBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyForce(new ƒ.Vector3(Script.config.forwardForceBlue, 0, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                this.blueBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyForce(new ƒ.Vector3(Script.config.backwardForceBlue, 0, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]) &&
                this.pos_blueBlob_rigid.y < -1.81) {
                this.blueBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyLinearImpulse(new ƒ.Vector3(0, Script.config.jumpImpulse, 0));
            }
        }
        async valueAnimation() {
            //char //blue
            this.blueBlob = Script.viewport.getBranch().getChildrenByName("g_character")[0].getChildrenByName("character_blue")[0];
            // console.log(blueBlob);
            this.blueBlob_rigid = this.blueBlob.getComponent(ƒ.ComponentRigidbody);
            this.blueBlob_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
            this.blueBlob.addChild(this.createNewSpriteNode());
            this.animationBlue = await this.buildAnimation("Images/blue_blobb.png", "blueBlobb", 2, 1, 31, 30, 5, 31);
            const spriteBlue = this.blueBlob.getChildrenByName("Sprite")[0];
            spriteBlue.setAnimation(this.animationBlue);
        }
        async buildAnimation(path, name, startX, startY, width, height, frames, distanceBetweenSprites) {
            let coat = await this.loadTextureFromSpriteSheet(path);
            let animation = new ƒAid.SpriteSheetAnimation(name, coat);
            animation.generateByGrid(ƒ.Rectangle.GET(startX, startY, width, height), frames, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(frames > 0 ? distanceBetweenSprites : 0));
            return animation;
        }
        async loadTextureFromSpriteSheet(pathSpriteSheet) {
            let imgSpriteSheet = new ƒ.TextureImage();
            await imgSpriteSheet.load(pathSpriteSheet);
            let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
            return coat;
        }
        createNewSpriteNode() {
            let spriteNode = new ƒAid.NodeSprite("Sprite");
            spriteNode.addComponent(new ƒ.ComponentTransform());
            spriteNode.mtxLocal.translateY(-0.25);
            spriteNode.mtxLocal.scale(new ƒ.Vector3(0.7, 0.7, 1));
            return spriteNode;
        }
    }
    Script.CharacterBlue = CharacterBlue;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class CharacterRed extends ƒ.Node {
        redBlob;
        redBlob_rigid;
        animationRed;
        pos_redBlob_rigid;
        constructor() {
            super("Blobb");
            this.initBlob();
        }
        async initBlob() {
            await this.valueAnimation();
        }
        movement() {
            //redBlobb
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                this.redBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyForce(new ƒ.Vector3(Script.config.forwardForceRed, 0, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                this.redBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyForce(new ƒ.Vector3(Script.config.backwardForceRed, 0, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) &&
                this.pos_redBlob_rigid.y < -1.81) {
                this.redBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyLinearImpulse(new ƒ.Vector3(0, Script.config.jumpImpulse, 0));
            }
        }
        async valueAnimation() {
            //char //red
            this.redBlob = Script.viewport.getBranch().getChildrenByName("g_character")[0].getChildrenByName("character_red")[0];
            // console.log(redBlob);
            this.redBlob_rigid = this.redBlob.getComponent(ƒ.ComponentRigidbody);
            this.redBlob_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
            this.redBlob.addChild(this.createNewSpriteNode());
            this.animationRed = await this.buildAnimation("Images/Red_blobb.png", "redBlobb", 2, 0, 28, 31, 4, 31);
            const spriteRed = this.redBlob.getChildrenByName("Sprite")[0];
            spriteRed.setAnimation(this.animationRed);
        }
        async buildAnimation(path, name, startX, startY, width, height, frames, distanceBetweenSprites) {
            let coat = await this.loadTextureFromSpriteSheet(path);
            let animation = new ƒAid.SpriteSheetAnimation(name, coat);
            animation.generateByGrid(ƒ.Rectangle.GET(startX, startY, width, height), frames, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(frames > 0 ? distanceBetweenSprites : 0));
            return animation;
        }
        async loadTextureFromSpriteSheet(pathSpriteSheet) {
            let imgSpriteSheet = new ƒ.TextureImage();
            await imgSpriteSheet.load(pathSpriteSheet);
            let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
            return coat;
        }
        createNewSpriteNode() {
            let spriteNode = new ƒAid.NodeSprite("Sprite");
            spriteNode.addComponent(new ƒ.ComponentTransform());
            spriteNode.mtxLocal.translateY(-0.25);
            spriteNode.mtxLocal.scale(new ƒ.Vector3(0.7, 0.7, 1));
            return spriteNode;
        }
    }
    Script.CharacterRed = CharacterRed;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map