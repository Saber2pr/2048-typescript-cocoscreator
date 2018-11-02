/*
 * @Author: AK-12 
 * @Date: 2018-11-01 12:51:23 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 23:57:38
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

    // controller
    let blocker = new Block(nodePool, this.background.node, 100)
    blocker.initEdge({
      width: {
        start: -150,
        end: 150
      },
      height: {
        start: -150,
        end: 150
      }
    })
    blocker.addBlock(3, nodePool)
    new TouchBlock(new TouchFront(this.background.node), blocker).load()
  }

  // update (dt) {}
}
