/*
 * @Author: AK-12 
 * @Date: 2018-11-01 12:51:23 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 22:48:49
 */
const { ccclass, property } = cc._decorator
import PhysicsManager from './PhysicsManager'
import TouchFront from './TouchFront'
import TouchBlock from './TouchBlock'
import Block from './Block'
import Model from './Model'
import MathVec from './MathVec'

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
      new TouchFront(this.background.node),
      new Block(nodePool, 50)
    ).load()
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
