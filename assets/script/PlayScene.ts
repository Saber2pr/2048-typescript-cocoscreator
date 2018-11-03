/*
 * @Author: AK-12 
 * @Date: 2018-11-01 12:51:23 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 12:17:39
 */
const { ccclass, property } = cc._decorator
import PhysicsManager from './PhysicsManager'
import TouchFront from './TouchFront'
import TouchBlock from './TouchBlock'
import Layout from './Layout'
import Model from './Model'
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
    //init Data
    Data.getInstance().init()
  }

  start() {
    // controller
    let layout = new Layout(this.background.node, 100)
    layout
      .initEdge({
        width: {
          start: -150,
          end: 150
        },
        height: {
          start: -150,
          end: 150
        }
      })
      .draw()
    new TouchBlock(new TouchFront(this.background.node), layout).load()
  }

  // update (dt) {}
}
