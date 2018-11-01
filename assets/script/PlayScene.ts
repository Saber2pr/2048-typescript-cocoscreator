/*
 * @Author: AK-12 
 * @Date: 2018-11-01 12:51:23 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-01 21:42:22
 */
const { ccclass, property } = cc._decorator
import PhysicsManager from './PhysicsManager'
import TouchFront from './TouchFront'
import TouchBlock from './TouchBlock'
import Block from './Block'

@ccclass
export default class PlayScene extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  @property(cc.Sprite)
  background: cc.Sprite = null

  onLoad() {
    PhysicsManager.getInstance()
      .enabled(true)
      .gravity(cc.p(0, -500))
  }

  start() {
    new TouchBlock(
      new Block(),
      new TouchFront(this.background.node, 100)
    ).load()
  }

  // update (dt) {}
}
