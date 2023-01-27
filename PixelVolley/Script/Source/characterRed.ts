namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;

    export class CharacterRed extends ƒ.Node {
        redBlob: ƒ.Node;
        redBlob_rigid: ƒ.ComponentRigidbody;
        animationRed: ƒAid.SpriteSheetAnimation;
        pos_redBlob_rigid: ƒ.Vector3;

        constructor() {
            super("Blobb")
            this.initBlob();
        }

        async initBlob() {
            await this.valueAnimation();

        }
        movement() {
            //redBlobb
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                this.redBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyForce(new ƒ.Vector3(config.forwardForceRed, 0, 0));
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                this.redBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyForce(new ƒ.Vector3(config.backwardForceRed, 0, 0));
            }
            if (
                ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) &&
                this.pos_redBlob_rigid.y < -1.81
            ) {
                this.redBlob
                    .getComponent(ƒ.ComponentRigidbody)
                    .applyLinearImpulse(new ƒ.Vector3(0, config.jumpImpulse, 0));
            }
        }

        async valueAnimation() {
            //char //red
            this.redBlob = viewport.getBranch().getChildrenByName("g_character")[0].getChildrenByName("character_red")[0];
            // console.log(redBlob);
            this.redBlob_rigid = this.redBlob.getComponent(ƒ.ComponentRigidbody);
            this.redBlob_rigid.effectRotation = new ƒ.Vector3(0, 0, 0);
            this.redBlob.addChild(this.createNewSpriteNode());
            this.animationRed = await this.buildAnimation("Images/Red_blobb.png", "redBlobb", 2, 0, 28, 31, 4, 31);
            const spriteRed = this.redBlob.getChildrenByName("Sprite")[0] as ƒAid.NodeSprite;
            spriteRed.setAnimation(this.animationRed);
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