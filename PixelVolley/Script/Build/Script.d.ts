declare namespace Script {
    import ƒ = FudgeCore;
    let viewport: ƒ.Viewport;
    let config: config;
}
declare namespace Script {
    import ƒ = FudgeCore;
    import ƒui = FudgeUserInterface;
    class StandingsCounter extends ƒ.Mutable {
        controller: ƒui.Controller;
        counterRed: number;
        counterBlue: number;
        constructor();
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class SunRotationScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        constructor();
        hndEvent: (_event: Event) => void;
        rotate: (_event: Event) => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class CharacterBlue extends ƒ.Node {
        blueBlob: ƒ.Node;
        blueBlob_rigid: ƒ.ComponentRigidbody;
        animationBlue: ƒAid.SpriteSheetAnimation;
        pos_blueBlob_rigid: ƒ.Vector3;
        constructor();
        initBlob(): Promise<void>;
        movement(): void;
        valueAnimation(): Promise<void>;
        buildAnimation(path: string, name: string, startX: number, startY: number, width: number, height: number, frames: number, distanceBetweenSprites: number): Promise<ƒAid.SpriteSheetAnimation>;
        loadTextureFromSpriteSheet(pathSpriteSheet: string): Promise<ƒ.CoatTextured>;
        createNewSpriteNode(): ƒAid.NodeSprite;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class CharacterRed extends ƒ.Node {
        redBlob: ƒ.Node;
        redBlob_rigid: ƒ.ComponentRigidbody;
        animationRed: ƒAid.SpriteSheetAnimation;
        pos_redBlob_rigid: ƒ.Vector3;
        constructor();
        initBlob(): Promise<void>;
        movement(): void;
        valueAnimation(): Promise<void>;
        buildAnimation(path: string, name: string, startX: number, startY: number, width: number, height: number, frames: number, distanceBetweenSprites: number): Promise<ƒAid.SpriteSheetAnimation>;
        loadTextureFromSpriteSheet(pathSpriteSheet: string): Promise<ƒ.CoatTextured>;
        createNewSpriteNode(): ƒAid.NodeSprite;
    }
}
declare namespace Script {
    interface config {
        jumpImpulse: number;
        forwardForceBlue: number;
        backwardForceBlue: number;
        forwardForceRed: number;
        backwardForceRed: number;
        ballMass: number;
        ballGravity: number;
        maxScore: number;
    }
}
