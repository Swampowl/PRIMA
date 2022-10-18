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
    let marioPos;
    let marioSpriteNode;
    let walkSpeed = 1.5;
    //loader
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        console.log(viewport);
        let branch = viewport.getBranch();
        console.log(branch);
        marioPos = branch.getChildrenByName("Mario")[0];
        marioSpriteNode = await createWalkRightAnimation();
        marioPos.addChild(marioSpriteNode);
        marioPos.getComponent(ƒ.ComponentMaterial).activate(false);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
        console.log(marioPos);
        ƒ.Loop.start;
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
        console.log("Update");
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]))
            marioPos.mtxLocal.translateX(walkSpeed * ƒ.Loop.timeFrameGame / 1000);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]))
            marioPos.mtxLocal.translateX(-walkSpeed * ƒ.Loop.timeFrameGame / 1000);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W]))
            marioPos.mtxLocal.translateY(walkSpeed * ƒ.Loop.timeFrameGame / 1000);
        if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.SHIFT_LEFT]))
            marioPos.mtxLocal.translateX(2 * walkSpeed * ƒ.Loop.timeFrameGame / 1000);
    }
    async function createWalkRightAnimation() {
        let imgSpriteSheet = new ƒ.TextureImage();
        await imgSpriteSheet.load("Images/Mario/Mario_Walk.png");
        let coat = new ƒ.CoatTextured(undefined, imgSpriteSheet);
        let marioAnimation = new ƒAid.SpriteSheetAnimation("WalkRight", coat);
        marioAnimation.generateByGrid(ƒ.Rectangle.GET(247, 1, 15, 28), 3, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(14));
        marioSpriteNode = new ƒAid.NodeSprite("marioSprite");
        marioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
        marioSpriteNode.setAnimation(marioAnimation);
        marioSpriteNode.setFrameDirection(1);
        marioSpriteNode.mtxLocal.translateY(0.5);
        marioSpriteNode.framerate = 4;
        return marioSpriteNode;
    }
    /* async function createWalkLeftAnimation(): Promise<ƒAid.NodeSprite>{
       
       let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
       await imgSpriteSheet.load("Images/Mario/Mario_Walk.png");
       let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
   
       let marioAnimation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("WalkLeft", coat);
       marioAnimation.generateByGrid(ƒ.Rectangle.GET(-158, -1, 15, 28 ), 3, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(-28));
   
       marioSpriteNode = new ƒAid.NodeSprite("marioSprite");
   
   
       marioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
       marioSpriteNode.setAnimation(marioAnimation);
   
       marioSpriteNode.setFrameDirection(1);
       marioSpriteNode.mtxLocal.translateY(0.5);
       marioSpriteNode.framerate = 4;
       return marioSpriteNode;
     }
   */
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map