namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let marioPos : ƒ.Node;
  let marioSpriteNode : ƒAid.NodeSprite;

//loader

  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);


  async function start(_event: CustomEvent): Promise <void> {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
     // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
     console.log(viewport);
     let branch: ƒ.Node = viewport.getBranch();
     console.log(branch);
     marioPos = branch.getChildrenByName("Mario")[0];
     marioSpriteNode = await createWalkRightAnimation();
     marioPos.addChild(marioSpriteNode);
     marioPos.getComponent(ƒ.ComponentMaterial).activate(false);
     ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
     ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
     console.log(marioPos);
    ƒ.Loop.start;

}

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
    console.log("Update");
    marioPos.mtxLocal.translateX(0.05);
  
  }


  

  async function createWalkRightAnimation(): Promise<ƒAid.NodeSprite>{
    
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("Images/Mario/Mario_Walk.png");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);

    let marioAnimation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("WalkRight", coat);
    marioAnimation.generateByGrid(ƒ.Rectangle.GET(247, 1, 15, 28 ), 3, 30, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(14));

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
}