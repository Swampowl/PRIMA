namespace Script {
  import ƒ = FudgeCore;
 

  let branch: ƒ.Node;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let cmpCamera: ƒ.ComponentCamera;

  //blobs
  let redBlob: ƒ.Node;
  let blueBlob: ƒ.Node;
  let characters: ƒ.Node;
  


  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
  cmpCamera= viewport.camera;
  branch = viewport.getBranch();

    

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    cmpCamera.mtxPivot.translate(new ƒ.Vector3(0, -1, 9));
    cmpCamera.mtxPivot.rotateY(180);
    console.log(branch);

    characters = branch.getChildrenByName("g_character")[0];
    console.log(characters);
    //characters.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(+1);
    redBlob = characters.getChildrenByName("character_red")[0];
    console.log(redBlob);
    blueBlob = characters.getChildrenByName("character_blue")[0];
    console.log(blueBlob);
    

    

  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
    movement();
  }

  function movement () {
    if (ƒ.Keyboard.isPressedOne([ ƒ.KEYBOARD_CODE.D])) {
      redBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(0.02);
      console.log(redBlob.mtxLocal.getX().x);

    }
    if (ƒ.Keyboard.isPressedOne([ ƒ.KEYBOARD_CODE.A])) {
        redBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-0.015);

  }
  if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
    blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(0.015);
  }
  if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
      blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateX(-0.02);

 
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP])) {
      blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(0.015);
    }
    if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
        blueBlob.getComponent(ƒ.ComponentTransform).mtxLocal.translateY(-0.02); 
 }

}
}