"use strict";
var PRIMArio;
(function (PRIMArio) {
    class Avatar extends ƒAid.NodeSprite {
        constructor() {
            super("Mario");
            this.addComponent(new ƒ.ComponentTransform());
        }
    }
    PRIMArio.Avatar = Avatar;
})(PRIMArio || (PRIMArio = {}));
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
var PRIMArio;
(function (PRIMArio) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let branch;
    let viewport;
    //Mario
    let marioCharacter;
    let marioSpriteNode;
    let marioSpeed = 2.5;
    let directionRight = true;
    let isWalking = false;
    let gravity = 5;
    let ySpeed = 1;
    //loader
    document.addEventListener("interactiveViewportStarted", start);
    let animIdle;
    let animJump;
    let animWalk;
    async function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        ƒ.Loop.start;
        console.log(viewport);
        branch = viewport.getBranch();
        console.log(branch);
        marioCharacter = branch.getChildrenByName("Mario")[0];
        marioCharacter.getComponent(ƒ.ComponentMaterial).activate(false);
        await actionHandler();
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
        console.log(marioCharacter);
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        // ƒ.AudioManager.default.updste();
        // ƒ.AudioManager.default.update();
        createGravity();
        if (checkGrounded) { }
        movement();
        checkGrounded();
        // console.log(posCurrentY);
        viewport.draw();
    }
    function movement() {
        if (!ƒ.Keyboard.isPressedOne([
            ƒ.KEYBOARD_CODE.D,
            ƒ.KEYBOARD_CODE.S,
            ƒ.KEYBOARD_CODE.W,
            ƒ.KEYBOARD_CODE.A,
            ƒ.KEYBOARD_CODE.ARROW_DOWN,
            ƒ.KEYBOARD_CODE.ARROW_LEFT,
            ƒ.KEYBOARD_CODE.ARROW_RIGHT,
            ƒ.KEYBOARD_CODE.ARROW_UP,
        ])) {
            marioSpriteNode.setAnimation(animIdle);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            if (!isWalking && ySpeed == 0) {
                marioSpriteNode.setAnimation(animWalk);
                isWalking = true;
            }
            marioCharacter.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(ƒ.Loop.timeFrameGame / 1000 * marioSpeed);
            if (!directionRight) {
                marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
                directionRight = true;
            }
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            if (!isWalking) {
                marioSpriteNode.setAnimation(animWalk);
                isWalking = true;
            }
            marioCharacter.mtxLocal.translateX(-ƒ.Loop.timeFrameGame / 1000 * marioSpeed);
            if (directionRight) {
                marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
                directionRight = false;
            }
        }
        else {
            if (ySpeed != 0) {
                marioSpriteNode.setAnimation(animJump);
            }
            else {
                isWalking = false;
            }
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W])) {
            if (ySpeed == 0) {
                ySpeed = 0.1;
            }
            if (ySpeed != 0) {
                marioSpriteNode.setAnimation(animJump);
            }
        }
    }
    async function actionHandler() {
        let imgWalk = new ƒ.TextureImage();
        await imgWalk.load("Images/Mario/pngwing.com.png");
        let walkAnimation = new ƒ.CoatTextured(undefined, imgWalk);
        animWalk = new ƒAid.SpriteSheetAnimation("walk", walkAnimation);
        animWalk.generateByGrid(ƒ.Rectangle.GET(0, 0, 223, 445), 3, 300, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(223));
        let imgIdle = new ƒ.TextureImage();
        await imgIdle.load("Images/Mario/pngwing.com.png");
        let idleAnimation = new ƒ.CoatTextured(undefined, imgIdle);
        animIdle = new ƒAid.SpriteSheetAnimation("idle", idleAnimation);
        animIdle.generateByGrid(ƒ.Rectangle.GET(0, 0, 223, 445), 1, 300, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(223));
        let imgJump = new ƒ.TextureImage();
        await imgJump.load("Images/Mario/pngwing.com.png");
        let jumpAnimation = new ƒ.CoatTextured(undefined, imgJump);
        animJump = new ƒAid.SpriteSheetAnimation("idle", jumpAnimation);
        animJump.generateByGrid(ƒ.Rectangle.GET(0, 446, 223, 445), 1, 300, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(0));
        marioSpriteNode = new ƒAid.NodeSprite("Mario");
        marioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        marioSpriteNode.setAnimation(animIdle);
        marioSpriteNode.setFrameDirection(1);
        marioSpriteNode.mtxLocal.translateY(0.5);
        marioSpriteNode.framerate = 15;
        marioCharacter.removeAllChildren();
        marioCharacter.addChild(marioSpriteNode);
    }
    function createGravity() {
        let deltaTime = ƒ.Loop.timeFrameGame / 1000;
        ySpeed <= -5 ? (ySpeed = -5) : "";
        ySpeed -= gravity * deltaTime;
        let yOffset = ySpeed * deltaTime;
        marioCharacter.mtxLocal.translateY(yOffset);
    }
    function checkGrounded() {
        let blocks = branch.getChildrenByName("Ground")[0];
        let pos = marioCharacter.mtxLocal.translation;
        for (let block of blocks.getChildrenByName("GroundTile_5")) {
            let posBlock = block.mtxLocal.translation;
            if ((pos.x - posBlock.x) < 0.5) {
                if (pos.y < posBlock.y + 0.5) {
                    pos.y = posBlock.y;
                    marioCharacter.mtxLocal.translation = pos;
                    ySpeed = 0;
                }
            }
        }
    }
})(PRIMArio || (PRIMArio = {}));
//# sourceMappingURL=Script.js.map