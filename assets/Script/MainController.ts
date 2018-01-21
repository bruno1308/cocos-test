// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainController extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    public static terrainSize: cc.Size = cc.size(126, 63);
    public currentBlockPos: cc.Vec2;
    @property(cc.Prefab)
    private prefab: cc.Prefab = null;
    private blockIndex = 0;
    private bigNumber = 10000000;

    start () {

        const winSize = cc.winSize;
        this.currentBlockPos = cc.p(-winSize.width / 2.0 + MainController.terrainSize.width / 4.0 +   MainController.terrainSize.width / 2.0,
                                    0.4 * (-winSize.height / 2.0));
        for(let i = 0; i < 10; ++i){
            this.createNewTerrainWithReusableNode(i % 2 == 0 ? 1 : -1);
        }

    }

    private createNewTerrainWithReusableNode(fixedDirection: number) {
        let terrainDirection = Math.random() >= 0.5 ? -1 : 1;

        if (fixedDirection !== 0) {
            terrainDirection = fixedDirection;
        }
        const nextIncrement = cc.p((MainController.terrainSize.width / 2) * terrainDirection,
        MainController.terrainSize.height / 2);
        this.currentBlockPos.add(nextIncrement, this.currentBlockPos);
        const newTerrain = cc.instantiate(this.prefab);

        newTerrain.setPosition(cc.p(this.currentBlockPos.x, this.currentBlockPos.y));
        newTerrain.zIndex = this.bigNumber - this.blockIndex;
        this.node.addChild(newTerrain);
        this.blockIndex++;

        return newTerrain;
    }

    

    // update (dt) {},
}
