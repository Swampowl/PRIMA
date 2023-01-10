declare namespace Script {
}
declare namespace Script {
    import ƒ = FudgeCore;
    class SpaceShipMovement extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        private rgdBodySpaceship;
        strafeThrust: number;
        forwardthrust: number;
        private relativeX;
        private relativeZ;
        constructor();
        hndEvent: (_event: Event) => void;
        update: () => void;
        private width;
        private height;
        private xAxis;
        private yAxis;
        handleMouse: (e: MouseEvent) => void;
        setRelativeAxes(): void;
        backwards(): void;
        thrust(): void;
        rollLeft(): void;
        rollRight(): void;
    }
}
