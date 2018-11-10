/*
 * @Author: AK-12
 * @Date: 2018-11-01 12:51:23
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-10 11:31:22
 */
const { ccclass, property } = cc._decorator
import TouchBlock from './TouchBlock'
import TouchFront from './TouchFront'
import Layout from './Layout'
import Model from './Model'
import Data from './Data'
import CameraManager from './CameraManager'
import SceneMediator from './SceneMediator'
import ScoreManager from './ScoreManager'

@ccclass
export default class PlayLayer extends cc.Component {
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
  @property(cc.Button)
  backBtn: cc.Button = null

  onLoad() {
    // init prefab cache
    Model.getInstance()
      .initPool(this.blockPrefab, 16)
      .initPreLayout(this.gameEnd)
    //init Data
    Data.getInstance()
      .init(4, 2048)
      .addRand(2)
  }

  start() {
    // view
    this.backBtn.node.on('click', () => {
      SceneMediator.getInstance().backto(0.7, 0.4, () => {
        CameraManager.getInstance().reload(0)
      })
    })
    let layout = new Layout(this.layout.node)
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
      .draw(Data.getInstance().data)
    // controller
    new TouchBlock(
      new TouchFront(this.background.node),
      layout,
      this.score,
      new ScoreManager(this.score)
    ).load()
  }

  onDestroy(): void {
    // remove cache
    Model.getInstance().ClearPool()
  }
}
