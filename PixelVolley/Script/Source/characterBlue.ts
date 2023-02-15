namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;

    export class CharacterBlue extends ƒ.Node {
        blueBlob: ƒ.Node;
        blueBlob_rigid: ƒ.ComponentRigidbody;
        animationBlue: ƒAid.SpriteSheetAnimation;
        pos_blueBlob_rigid: ƒ.Vector3;

        constructor() {
            super("Blobb")
            this.initBlob();

        }

        async initBlob() {
            await this.valueAnimation();

        }

        movement() {
            //blueBlobb
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                this.blueBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyForce(new ƒ.Vector3(config.forwardForceBlue, 0, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                this.blueBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyForce(new ƒ.Vector3(config.backwardForceBlue, 0, 0));
            }
            if (
                ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]) &&
                this.pos_blueBlob_rigid.y < -1.81
            ) {
                this.blueBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyLinearImpulse(new ƒ.Vector3(0, config.jumpImpulse, 0));
            }
        }

        async valueAnimation() {
            //char //blue
            this.blueBlob = viewport.getBranch().getChildrenByName("g_character")[0].getChildrenByName("character_blue")[0];
            // console.log(blueBlob);
            this.blueBlob_rigid = this.blueBlob.getComponent(ƒ.ComponentRigidbody);
            this.blueBlob_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
            this.blueBlob.addChild(this.createNewSpriteNode());
            this.animationBlue = await this.buildAnimation("Images/blue_blobb.png", "blueBlobb", 2, 1, 31, 30, 5, 31);
            const spriteBlue = this.blueBlob.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
            spriteBlue.setAnimation(this.animationBlue);
        }

        async buildAnimation(
            path: string,
            name: string,
            startX: number,
            startY: number,
            width: number,
            height: number,
            frames: number,
            distanceBetweenSprites: number
        ): Promise<ƒAid.SpriteSheetAnimation> {
            let coat: ƒ.CoatTextured = await this.loadTextureFromSpriteSheet(path);
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

        async loadTextureFromSpriteSheet(
            pathSpriteSheet: string
        ): Promise<ƒ.CoatTextured> {
            let imgSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
            await imgSpriteSheet.load(pathSpriteSheet);
            let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, imgSpriteSheet);
            return coat;
        }
        createNewSpriteNode(): ƒAid.NodeSprite {
            let spriteNode = new ƒAid.NodeSprite("Sprite");
            spriteNode.addComponent(new ƒ.ComponentTransform());
            spriteNode.mtxLocal.translateY(-0.25);
            spriteNode.mtxLocal.scale(new ƒ.Vector3(0.7, 0.7, 1))
            return spriteNode;
        }

    }



}  