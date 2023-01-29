namespace Script {
  import ƒ = FudgeCore;
  //import ƒAid = FudgeAid;
  //import ƒui = FudgeUserInterface;

  let branch: ƒ.Node;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  let cmpCamera: ƒ.ComponentCamera;

  //blobs

  let redBlob: CharacterRed;
  let blueBlob: CharacterBlue;
  let net: ƒ.Node;
  let net_rigid: ƒ.ComponentRigidbody;
  let ball: ƒ.Node;
  let ball_rigid: ƒ.ComponentRigidbody;
  let wall_right: ƒ.Node;
  let wall_right_rigid: ƒ.ComponentRigidbody;
  let wall_left: ƒ.Node;
  let wall_left_rigid: ƒ.ComponentRigidbody;
  let posBall_rigid: ƒ.Vector3;
  let playedAudio: ƒ.ComponentAudio;
  let scoreBlue: number = 0;
  let scoreRed: number = 0;

  // export let controllerStats: StandingsCounter;


  export let config: config;



  document.addEventListener(
    "interactiveViewportStarted",
    <EventListener>(<unknown>start)
  );

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;
    cmpCamera = viewport.camera;
    branch = viewport.getBranch();
    config = await (await fetch("Script/Source/config.json")).json();

    // viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER; 

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    //start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, -1, 10));
    cmpCamera.mtxPivot.rotateY(180);
    redBlob = new CharacterRed();
    blueBlob = new CharacterBlue();




    //ball
    ball = branch.getChildrenByName("ball")[0];
    ball_rigid = ball.getComponent(ƒ.ComponentRigidbody);
    ball_rigid.mass = config.ballMass;
    ball_rigid.effectGravity = config.ballGravity;
    ball_rigid.effectRotation = new ƒ.Vector3(0, 0, 1);


    ball.getComponent(ƒ.ComponentRigidbody).addEventListener(
      ƒ.EVENT_PHYSICS.COLLISION_ENTER,
      (_event: any) => {
        let collisionPartner: string;
        //     console.log(_event);
        console.log(_event.cmpRigidbody.node.name);
        collisionPartner = _event.cmpRigidbody.node.name;

        if (collisionPartner === "character_red" || collisionPartner === "character_blue") {
          playedSound();
          console.log(collisionPartner);
        }

        if (collisionPartner === ("rigid_right_point")) {
          scoreRed++;
          // controllerStats.counterRed++;
        };

        //score Blue

        if (collisionPartner === ("rigid_left_point")) {
          scoreBlue++;
          //controllerStats.counterRed++;

        };



      }
    );

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

    // controllerStats = new StandingsCounter();

    ƒ.Loop.start();

  }

  function playedSound() {

    let audio = new ƒ.Audio("audio/ball_ hit1.mp3");
    playedAudio = new ƒ.ComponentAudio(audio, false, false);
    playedAudio.connect(true);
    playedAudio.volume = 0.2;
    console.log("AAAAAAAAAAAAAAAAAAADUSI")
    playedAudio.play(true);
  }

  function checkEnd() {
    if (controllerStats.counterBlue === config.maxScore || controllerStats.counterRed === config.maxScore)
      console.log("A player scored " + config.maxScore + " points. Game ends now.")
  }



  function update(_event: Event): void {
    ƒ.Physics.simulate();
    viewport.draw();
    ƒ.AudioManager.default.update();
    redBlob.movement();
    blueBlob.movement();
    // checkEnd();

    // console.log(ball.mtxLocal.translation.toString())
    posBall_rigid = ball_rigid.getPosition();
    posBall_rigid.z = 3;

    redBlob.pos_redBlob_rigid = redBlob.redBlob_rigid.getPosition();
    blueBlob.pos_blueBlob_rigid = blueBlob.blueBlob_rigid.getPosition();
    //   console.log(posBall_rigid);
    ball_rigid.setPosition(posBall_rigid);
    // console.log(pos_blueBlob_rigid.y);
  }
}