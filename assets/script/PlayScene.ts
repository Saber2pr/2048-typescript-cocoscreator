/*
 * @Author: AK-12 
 * @Date: 2018-11-01 12:51:23 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 21:34:36
 */
const { ccclass, property } = cc._decorator
import PhysicsManager from './PhysicsManager'
import TouchFront from './TouchFront'
import TouchBlock from './TouchBlock'
import Block from './Block'
import Model from './Model'
import MathVec, { transformArray } from './MathVec'
import Data from './Data'

@ccclass
export default class PlayScene extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  @property(cc.Sprite)
  background: cc.Sprite = null
  @property(cc.Prefab)
  blockPrefab: cc.Prefab = null

  onLoad() {
    // init Physics
    PhysicsManager.getInstance()
      .enabled(true)
      .gravity(cc.v2(0, -500))
    // init prefab cache
    Model.getInstance().initPool(this.blockPrefab, 16)
  }

  start() {
    // view
    let nodePool: cc.Node[] = []
    this.addBlock(3, nodePool)

    // controller
    new TouchBlock(
      new TouchFront(this.background.node, 100),
      new Block(nodePool, 50)
    ).load()

    Data.getInstance().init()
    let map = Data.getInstance().map
    cc.log(map, Data.getInstance().merge('left', map[0]))
    cc.log('trans', transformArray<number>(map))
  }

  addBlock(num: number, array: cc.Node[]): void {
    let rand = new MathVec(-150, 100, 4)
    this.schedule(
      () => {
        let block = Model.getInstance().BlockPool.get()
        block.setParent(this.background.node)
        block.setPosition(rand.randPos())
        array.push(block)
      },
      0,
      num
    )
  }

  // update (dt) {}
}
