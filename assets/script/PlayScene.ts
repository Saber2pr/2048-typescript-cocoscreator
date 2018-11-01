/*
 * @Author: AK-12 
 * @Date: 2018-11-01 12:51:23 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-01 23:35:55
 */
const { ccclass, property } = cc._decorator
import PhysicsManager from './PhysicsManager'
import TouchFront from './TouchFront'
import TouchBlock from './TouchBlock'
import Block from './Block'
import Model from './Model'

@ccclass
export default class PlayScene extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  @property(cc.Sprite)
  background: cc.Sprite = null
  @property(cc.Prefab)
  block: cc.Prefab = null

  onLoad() {
    PhysicsManager.getInstance()
      .enabled(true)
      .gravity(cc.v2(0, -500))
    Model.getInstance().initPool(this.block, 16)
  }

  start() {
    new TouchBlock(new TouchFront(this.background.node, 100)).load()
    this.node.on('left', () => console.log('yes'))
    let node = Model.getInstance().BlockPool.get()
    node.setParent(this.node)
  }

  // update (dt) {}
}
