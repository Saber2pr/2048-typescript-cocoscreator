/*
 * @Author: AK-12
 * @Date: 2018-11-01 12:51:23
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-07 23:57:06
 */
const { ccclass, property } = cc._decorator
import TouchBlock from './TouchBlock'
import TouchFront from './TouchFront'
import Layout from './Layout'
import Model from './Model'
import Data from './Data'
import { hasTwiceSuper } from './MathVec'

@ccclass
export default class PlayScene extends cc.Component {
  @property(cc.Sprite)
  background: cc.Sprite = null
  @property(cc.Sprite)
  layout: cc.Sprite = null
  @property(cc.Prefab)
  blockPrefab: cc.Prefab = null
  @property(cc.Prefab)
  gameEnd: cc.Prefab = null
  @property(cc.Label)
  score: cc.Label = null

  onLoad() {
    // init prefab cache
    Model.getInstance()
      .initPool(this.blockPrefab, 16)
      .initPreLayout(this.gameEnd)
    //init Data
    Data.getInstance()
      .init(4, 8)
      .addRand(2)
  }

  start() {
    // view
    let layout = new Layout(this.layout.node)
    layout
      .initEdge({
        width: {
          start: -150,
          end: 150
        }
      })
      .draw(Data.getInstance().data)
    // controller
    new TouchBlock(
      new TouchFront(this.background.node),
      layout,
      this.score
    ).load()
  }

  onDestroy(): void {
    // remove cache
    Model.getInstance().ClearPool()
  }
}
