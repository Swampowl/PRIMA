namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class SunRotationScript extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(SunRotationScript);
    // Properties may be mutated by users in the editor via the automatically created user interface

    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.rotate);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    public rotate = (_event: Event): void => {

      // console.log(viewport.getBranch().getChildrenByName("sun")[0].getComponent(ƒ.ComponentTransform).mtxLocal.rotate(new ƒ.Vector3(100, 100, (100 * ƒ.Loop.timeFrameGame) / 1000)));
      viewport.getBranch().getChildrenByName("sun")[0].getComponent(ƒ.ComponentTransform).mtxLocal.rotate(new ƒ.Vector3(1, 1, (-.1 * ƒ.Loop.timeFrameGame) / 1000000000000));

      // this.node.getComponent(ƒ.ComponentTransform).mtxLocal.rotate(new ƒ.Vector3(100, 100, (100 * ƒ.Loop.timeFrameGame) / 1000));

    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}