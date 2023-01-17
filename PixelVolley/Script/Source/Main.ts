namespace Script {
  import ƒ = FudgeCore;


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



  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    cmpCamera = viewport.camera;
    branch = viewport.getBranch();
 
    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;



    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
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

  function update(_event: Event): void {
    let posBall_rigid: ƒ.Vector3;
    let pos_blueBlob_rigid:ƒ.Vector3;
    ƒ.Physics.simulate();  
    viewport.draw();
    ƒ.AudioManager.default.update();
    movement();
    console.log(ball.mtxLocal.translation.toString())
    posBall_rigid = ball_rigid.getPosition();
    posBall_rigid.z = 3;

    // pos_blueBlob_rigid = blueBlob.getPos
    // blueBlob_rigid.z =3 ;
    ball_rigid.setPosition(posBall_rigid);
  }

  function movement() {
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
      redBlob.getComponent(ƒ.ComponentRigidbody).applyForce(
        new ƒ.Vector3(+5, 0, 0) );

    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
      redBlob.getComponent(ƒ.ComponentRigidbody).applyForce(
        new ƒ.Vector3(-5, 0, 0) );


    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
      blueBlob.getComponent(ƒ.ComponentRigidbody).applyForce(
        new ƒ.Vector3(1, 0, 0) );
      
      
      }

    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
      blueBlob.getComponent(ƒ.ComponentRigidbody).applyForce(
        new ƒ.Vector3(-2, 0, 0) );


    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP])) {
      blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(0.015);
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
      blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(-0.02);
    }

  }
}