namespace PRIMArio {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");
  let branch: ƒ.Node;
  let viewport: ƒ.Viewport;

  //Mario
  let marioCharacter: ƒ.Node;
  let marioSpriteNode: ƒAid.NodeSprite;
  let marioSpeed: number = 2.5;
  let directionRight: boolean = true;
  let isWalking: boolean = false;
  let gravity: number = 5;
  let ySpeed:number = 1;


  //loader
  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );

  let animIdle: ƒAid.SpriteSheetAnimation;
  let animJump: ƒAid.SpriteSheetAnimation;
  let animWalk: ƒAid.SpriteSheetAnimation;

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;


    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);

    // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    ƒ.Loop.start;
    console.log(viewport);
    branch = viewport.getBranch();

    console.log(branch);
    marioCharacter = branch.getChildrenByName("Mario")[0];
    marioCharacter.getComponent(ƒ.ComponentMaterial).activate(false);
   await  actionHandler();
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
    console.log(marioCharacter);

 
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    // ƒ.AudioManager.default.updste();
    // ƒ.AudioManager.default.update();
    createGravity();
    if (checkGrounded){}
    movement();
    checkGrounded();
   // console.log(posCurrentY);
    viewport.draw();
  }

  function movement (){

    if  ( !ƒ.Keyboard.isPressedOne([
      ƒ.KEYBOARD_CODE.D,
      ƒ.KEYBOARD_CODE.S,
      ƒ.KEYBOARD_CODE.W,
      ƒ.KEYBOARD_CODE.A,
      ƒ.KEYBOARD_CODE.ARROW_DOWN,
      ƒ.KEYBOARD_CODE.ARROW_LEFT,
      ƒ.KEYBOARD_CODE.ARROW_RIGHT,
      ƒ.KEYBOARD_CODE.ARROW_UP,
    ])){
    marioSpriteNode.setAnimation(animIdle);
    }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      if (!isWalking && ySpeed == 0) {
        marioSpriteNode.setAnimation(animWalk)
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
      if (ySpeed != 0){
        marioSpriteNode.setAnimation(animJump);
       }
      else {
        isWalking = false;
      }
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W])) 
    {      if (ySpeed == 0){
             ySpeed = 0.1   }

             if (ySpeed != 0){
              marioSpriteNode.setAnimation(animJump);
             }
    }

  }

  async function actionHandler(): Promise<void> {
    let imgWalk: ƒ.TextureImage = new ƒ.TextureImage();
    await imgWalk.load("Images/Mario/pngwing.com.png");
    let walkAnimation: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgWalk);

    animWalk = new ƒAid.SpriteSheetAnimation("walk", walkAnimation);
    animWalk.generateByGrid(
      ƒ.Rectangle.GET(0,
        0, 223, 445),
      3,
      300,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(223)
    );

    let imgIdle: ƒ.TextureImage = new ƒ.TextureImage();
    await imgIdle.load("Images/Mario/pngwing.com.png");
    let idleAnimation: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgIdle);

    animIdle = new ƒAid.SpriteSheetAnimation("idle", idleAnimation);
    animIdle.generateByGrid(
      ƒ.Rectangle.GET(0, 0, 223, 445),
      1,
      300,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(223)
    );

    let imgJump: ƒ.TextureImage = new ƒ.TextureImage();
    await imgJump.load("Images/Mario/pngwing.com.png");
    let jumpAnimation: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgJump);

    animJump = new ƒAid.SpriteSheetAnimation("idle", jumpAnimation);
    animJump.generateByGrid(
      ƒ.Rectangle.GET(0, 446, 223, 445),
      1,
      300,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(0)
    );

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
    let deltaTime: number = ƒ.Loop.timeFrameGame / 1000;
    ySpeed <= -5 ? (ySpeed = -5) : "";
    ySpeed -= gravity * deltaTime;
    let yOffset: number = ySpeed * deltaTime;
    marioCharacter.mtxLocal.translateY(yOffset);
  }

  function checkGrounded(): void {
    let blocks: ƒ.Node = branch.getChildrenByName("Ground")[0];
    let pos: ƒ.Vector3 = marioCharacter.mtxLocal.translation;
    for (let block of blocks.getChildrenByName("GroundTile_5")) {
      let posBlock: ƒ.Vector3 = block.mtxLocal.translation;
      if ((pos.x - posBlock.x) < 0.5) {
        if (pos.y < posBlock.y + 0.5) {
          pos.y = posBlock.y;
          marioCharacter.mtxLocal.translation = pos;
          ySpeed = 0;
        }
      }
    }
  }


}