namespace Script {
  import ƒ = FudgeCore;


  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let marioPos : ƒ.Node;
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
}