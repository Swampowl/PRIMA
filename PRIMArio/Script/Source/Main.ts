namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;

  //Mario
  let marioCharacter: ƒ.Node;
  let marioSpriteNode: ƒAid.NodeSprite;
  let marioSpeed: number = 2.5;
  let directionRight: boolean = true;
  let isWalking: boolean = false;

  //loader

  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );

  let animIdle: ƒAid.SpriteSheetAnimation;
  let animJump: ƒAid.SpriteSheetAnimation;
  let animWalkRight: ƒAid.SpriteSheetAnimation;

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);

    // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    ƒ.Loop.start;
    console.log(viewport);
    let branch: ƒ.Node = viewport.getBranch();

    console.log(branch);
    marioCharacter = branch.getChildrenByName("Mario")[0];
    marioCharacter.getComponent(ƒ.ComponentMaterial).activate(false);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
    console.log(marioCharacter);

    actionHandler();
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    // ƒ.AudioManager.default.update();
    // ƒ.AudioManager.default.update();
    console.log("Update");

    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT])){ 
      marioSpeed = 10;
      marioSpriteNode.framerate = 30;
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      if (!isWalking){
        marioSpriteNode.setAnimation(animWalkRight);
        isWalking = true;   
      }   
      marioCharacter.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(ƒ.Loop.timeFrameGame/1000 * marioSpeed);
      if (!directionRight) {
        marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
        directionRight = true;
      }
    }
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
      if (!isWalking){
        marioSpriteNode.setAnimation(animWalkRight);
        isWalking = true;   
      }
      marioCharacter.mtxLocal.translateX(-ƒ.Loop.timeFrameGame/1000 * marioSpeed);
      if (directionRight) {
        marioSpriteNode.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(180);
        directionRight = false;
      }
    }
    else {
      isWalking = false;
      marioSpriteNode.setAnimation(animIdle);
    }
    if (
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W]))
{
  marioSpriteNode.setAnimation(animJump);
  marioCharacter.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(ƒ.Loop.timeFrameGame/1000 * marioSpeed);


}

    if (
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W]))
{
  marioSpriteNode.setAnimation(animJump);
  marioCharacter.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(ƒ.Loop.timeFrameGame/1000 * marioSpeed);


}
if (
  ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN, ƒ.KEYBOARD_CODE.S]))
{
marioSpriteNode.setAnimation(animJump);
marioCharacter.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(-ƒ.Loop.timeFrameGame/1000 * marioSpeed);


}
    viewport.draw();
  }

  async function actionHandler(): Promise<void> {
    let animWalk: ƒ.TextureImage = new ƒ.TextureImage();
    await animWalk.load("Images/Mario/pngwing.com.png");
    let walkAnimation: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, animWalk);

    animWalkRight = new ƒAid.SpriteSheetAnimation("walk", walkAnimation);
    animWalkRight.generateByGrid(
      ƒ.Rectangle.GET(0, 0, 223, 445),
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
      3,
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
      3,
      300,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(223)
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
}