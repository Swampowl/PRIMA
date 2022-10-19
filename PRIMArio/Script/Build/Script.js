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
    var ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    //Mario
    let marioCharacter;
    let marioSpriteNode;
    let marioSpeed = 2.5;
    let directionRight = true;
    let isWalking = false;
    //loader
    document.addEventListener("interactiveViewportStarted", start);
    let animIdle;
    let animJump;
    let animWalkRight;
    async function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        ƒ.Loop.start;
        console.log(viewport);
        let branch = viewport.getBranch();
        console.log(branch);
        marioCharacter = branch.getChildrenByName("Mario")[0];
        marioCharacter.getComponent(ƒ.ComponentMaterial).activate(false);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
        console.log(marioCharacter);
        actionHandler(_event);
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        // ƒ.AudioManager.default.update();
        // ƒ.AudioManager.default.update();
        console.log("Update");
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {
            marioSpeed = 10;
            marioSpriteNode.framerate = 30;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            if (!isWalking) {
                marioSpriteNode.setAnimation(animWalkRight);
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
                marioSpriteNode.setAnimation(animWalkRight);
                isWalking = true;
            }
            marioCharacter.mtxLocal.translateX(-ƒ.Loop.timeFrameGame / 1000 * marioSpeed);
            if (directionRight) {
                marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
                directionRight = false;
            }
        }
        else {
            isWalking = false;
            marioSpriteNode.setAnimation(animIdle);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W])) {
            marioSpriteNode.setAnimation(animJump);
            marioCharacter.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(ƒ.Loop.timeFrameGame / 1000 * marioSpeed);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W])) {
            marioSpriteNode.setAnimation(animJump);
            marioCharacter.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(ƒ.Loop.timeFrameGame / 1000 * marioSpeed);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN, ƒ.KEYBOARD_CODE.S])) {
            marioSpriteNode.setAnimation(animJump);
            marioCharacter.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(-ƒ.Loop.timeFrameGame / 1000 * marioSpeed);
        }
        viewport.draw();
    }
    async function actionHandler(_event) {
        let animWalk = new ƒ.TextureImage();
        await animWalk.load("Images/Mario/pngwing.com.png");
        let walkAnimation = new ƒ.CoatTextured(undefined, animWalk);
        animWalkRight = new ƒAid.SpriteSheetAnimation("walk", walkAnimation);
        animWalkRight.generateByGrid(ƒ.Rectangle.GET(0, 0, 223, 445), 3, 300, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(223));
        let imgIdle = new ƒ.TextureImage();
        await imgIdle.load("Images/Mario/pngwing.com.png");
        let idleAnimation = new ƒ.CoatTextured(undefined, imgIdle);
        animIdle = new ƒAid.SpriteSheetAnimation("idle", idleAnimation);
        animIdle.generateByGrid(ƒ.Rectangle.GET(0, 0, 223, 445), 3, 300, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(223));
        let imgJump = new ƒ.TextureImage();
        await imgJump.load("Images/Mario/pngwing.com.png");
        let jumpAnimation = new ƒ.CoatTextured(undefined, imgJump);
        animJump = new ƒAid.SpriteSheetAnimation("idle", jumpAnimation);
        animJump.generateByGrid(ƒ.Rectangle.GET(0, 446, 223, 445), 3, 300, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(223));
        marioSpriteNode = new ƒAid.NodeSprite("Mario");
        marioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        marioSpriteNode.setAnimation(animIdle);
        marioSpriteNode.setFrameDirection(1);
        marioSpriteNode.mtxLocal.translateY(0.5);
        marioSpriteNode.framerate = 15;
        marioCharacter.removeAllChildren();
        marioCharacter.addChild(marioSpriteNode);
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map