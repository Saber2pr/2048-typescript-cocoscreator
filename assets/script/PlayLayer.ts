/*
 * @Author: AK-12
 * @Date: 2018-11-01 12:51:23
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-09 16:02:48
 */
const { ccclass, property } = cc._decorator
import TouchBlock from './src/TouchBlock'
import TouchFront from './src/interface/TouchFront'
import Layout from './src/interface/Layout'
import Model from './src/singletons/Model'
import Data from './src/singletons/Data'
import CameraManager from './src/singletons/CameraManager'
import SceneMediator from './src/singletons/SceneMediator'

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
      SceneMediator.getInstance().backto(1, () => {
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
      this.score
    ).load()
  }

  onDestroy(): void {
    // remove cache
    Model.getInstance().ClearPool()
  }
}
