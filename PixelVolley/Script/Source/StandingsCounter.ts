namespace Script {
    import ƒ = FudgeCore;
    //import ƒAid = FudgeAid;
    import ƒui = FudgeUserInterface;

    export class StandingsCounter extends ƒ.Mutable {
        
        controller: ƒui.Controller;
        counterRed: number;
        counterBlue: number;


        constructor() {
            super();

            this.controller = new ƒui.Controller(
                this, document.querySelector("#vui"));

        }
        protected reduceMutator(_mutator: ƒ.Mutator): void {
        }

    }
}