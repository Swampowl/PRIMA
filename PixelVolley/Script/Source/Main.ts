namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;

  let branch: ƒ.Node;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let cmpCamera: ƒ.ComponentCamera;

  //blobs
  let redBlob: ƒ.Node;
  let redBlob_rigid: ƒ.ComponentRigidbody;
  let blueBlob: ƒ.Node;
  let blueBlob_rigid: ƒ.ComponentRigidbody;
  let characters: ƒ.Node;
  let net: ƒ.Node;
  let net_rigid: ƒ.ComponentRigidbody;
  let ball: ƒ.Node;
  let ball_rigid: ƒ.ComponentRigidbody;
  let wall_right: ƒ.Node;
  let wall_right_rigid: ƒ.ComponentRigidbody;
  let wall_left: ƒ.Node;
  let wall_left_rigid: ƒ.ComponentRigidbody;
  let posBall_rigid: ƒ.Vector3;
  let pos_blueBlob_rigid: ƒ.Vector3;
  let pos_redBlob_rigid: ƒ.Vector3;
  let animationBlue: ƒAid.SpriteSheetAnimation;
  let animationRed: ƒAid.SpriteSheetAnimation;
  let config: config;



  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );

  async function start(_event: CustomEvent):  Promise<void>  {
    viewport = _event.detail;
    cmpCamera = viewport.camera;
    branch = viewport.getBranch();
    config = await (await fetch("Script/Source/config.json")).json();

   // viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER; 

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    //start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, -1, 10));
    cmpCamera.mtxPivot.rotateY(180);
    console.log(branch);
    characters = branch.getChildrenByName("g_character")[0];
    //console.log(characters);

    //char //red
    redBlob = characters.getChildrenByName("character_red")[0];
    // console.log(redBlob);
    redBlob_rigid = redBlob.getComponent(ƒ.ComponentRigidbody);
    redBlob_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
    redBlob.addChild(createNewSpriteNode());
    animationRed = await buildAnimation("Images/Red_blobb.png", "redBlobb", 2, 0, 28, 31, 4, 31);
    const spriteRed = redBlob.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
      spriteRed.setAnimation(animationRed);


    //char //blue
    blueBlob = characters.getChildrenByName("character_blue")[0];
    // console.log(blueBlob);
    blueBlob_rigid = blueBlob.getComponent(ƒ.ComponentRigidbody);
    blueBlob_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
    blueBlob.addChild(createNewSpriteNode());
    animationBlue = await buildAnimation("Images/blue_blobb.png", "blueBlobb", 2, 1, 31, 30, 5, 31);
    const spriteBlue = blueBlob.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
    spriteBlue.setAnimation(animationBlue);


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

 // function checkScore()

  function update(_event: Event): void {
    ƒ.Physics.simulate();
    viewport.draw();
    ƒ.AudioManager.default.update();
    movement();
    // console.log(ball.mtxLocal.translation.toString())
    posBall_rigid = ball_rigid.getPosition();
    posBall_rigid.z = 3;

    pos_redBlob_rigid = redBlob_rigid.getPosition();
    pos_blueBlob_rigid = blueBlob_rigid.getPosition();
    //   console.log(posBall_rigid);
    ball_rigid.setPosition(posBall_rigid);
    console.log(pos_blueBlob_rigid.y);
  }

  function movement() {
    //redBlobb
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
      redBlob
        .getComponent(ƒ.ComponentRigidbody)
        .applyForce(new ƒ.Vector3(config.forwardForceRed, 0, 0));
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
      redBlob
        .getComponent(ƒ.ComponentRigidbody)
        .applyForce(new ƒ.Vector3(config.backwardForceRed, 0, 0));
    }
    if (
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) &&
      pos_redBlob_rigid.y < -1.81
    ) {
      redBlob
        .getComponent(ƒ.ComponentRigidbody)
        .applyLinearImpulse(new ƒ.Vector3(0, config.jumpImpulse, 0));
    }
    //blueBlobb
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
      blueBlob
        .getComponent(ƒ.ComponentRigidbody)
        .applyForce(new ƒ.Vector3(config.forwardForceBlue, 0, 0));
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      blueBlob
        .getComponent(ƒ.ComponentRigidbody)
        .applyForce(new ƒ.Vector3(config.backwardForceBlue, 0, 0));
    }
    if (
      ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]) &&
      pos_blueBlob_rigid.y < -1.81
    ) {
      blueBlob
        .getComponent(ƒ.ComponentRigidbody)
        .applyLinearImpulse(new ƒ.Vector3(0, config.jumpImpulse, 0));
    }
  }

  async function buildAnimation(
    path: string,
    name: string,
    startX: number,
    startY: number,
    width: number,
    height: number,
    frames: number,
    distanceBetweenSprites: number
  ): Promise<ƒAid.SpriteSheetAnimation> {
    let coat: ƒ.CoatTextured = await loadTextureFromSpriteSheet(path);
    let animation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(
      name,
      coat
    );
    animation.generateByGrid(
      ƒ.Rectangle.GET(startX, startY, width, height),
      frames,
      30,
      ƒ.ORIGIN2D.BOTTOMCENTER,
      ƒ.Vector2.X(frames > 0 ? distanceBetweenSprites : 0)
    );
    return animation;
  }

  async function loadTextureFromSpriteSheet(
    pathSpriteSheet: string
  ): Promise<ƒ.CoatTextured> {
    let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await imgSpriteSheet.load(pathSpriteSheet);
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
    return coat;
  }
 function createNewSpriteNode( ): ƒAid.NodeSprite {
    let spriteNode = new ƒAid.NodeSprite("Sprite");
    spriteNode.addComponent(new ƒ.ComponentTransform());
    spriteNode.mtxLocal.translateY(-0.25);
    spriteNode.mtxLocal.scale(new ƒ.Vector3(0.7, 0.7, 1))
    return spriteNode;
  }
}
