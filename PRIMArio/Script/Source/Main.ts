namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;


  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let marioPos : ƒ.Node;
  let spriteNode : ƒAid.NodeSprite;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
     // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
     console.log(viewport);
     let branch: ƒ.Node = viewport.getBranch();
     console.log(branch);
     marioPos = branch.getChildrenByName("Mario")[0];
     console.log(marioPos);
    ƒ.Loop.start();

}

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
    console.log("Update");
    marioPos.mtxLocal.translateX(0.05);
  
  }

  async function walkRight(){
    let root: ƒ.Node = new ƒ.Node("root");

    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load("Images\\Mario\\Mario_Walk.png");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);

    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("WalkRight", coat);
    animation.generateByGrid(ƒ.Rectangle.GET(1, 0, 17, 60), 8, 22, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(20));

    spriteNode = new ƒAid.NodeSprite("Sprite");
    spriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    spriteNode.setAnimation(animation);
    spriteNode.setFrameDirection(1);
    spriteNode.mtxLocal.translateY(-1);
    spriteNode.framerate = parseInt((<HTMLInputElement>document.querySelector("[name=fps]")).value);


    root.addChild(spriteNode);
  }
}