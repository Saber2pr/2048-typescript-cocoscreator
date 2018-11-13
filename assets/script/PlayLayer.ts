/*
 * @Author: AK-12
 * @Date: 2018-11-01 12:51:23
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-13 16:07:25
 */
const { ccclass, property } = cc._decorator
import TouchBlock from './TouchBlock'
import TouchFront from './TouchFront'
import Layout from './Layout'
import Model from './Model'
import Data from './Data'
import SceneMediator from './SceneMediator'
import ScoreManager from './ScoreManager'
import { LayoutType, Edge } from './IGame'
import game from './Game'
import State from './State'

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
  @property(cc.Label)
  bestScore: cc.Label = null
  @property(cc.Button)
  backBtn: cc.Button = null

  edge: Edge = null
  layoutType: LayoutType = null

  onLoad() {
    // init game type
    ;[this.edge, this.layoutType] = [
      game.edge,
      game.type[State.getInstance().layoutTypeIndex]
    ]
    // init prefab cache
    Model.getInstance()
      .initPool(this.blockPrefab, this.layoutType.num)
      .initPreLayout(this.gameEnd)
    //init Data
    Data.getInstance()
      .init(this.layoutType.size, 2048)
      .addRand(2)
    this.bestScore.string = String(State.getInstance().bestScore)
    // reset the canvas scale
    SceneMediator.getInstance().resetScale(0.9)
  }

  start() {
    // view
    this.backBtn.node.on('click', () => {
      SceneMediator.getInstance().go(
        -1,
        undefined,
        undefined,
        undefined,
        () => {
          this.onDestroy()
          State.getInstance().isActionStop = true
        }
      )
    })
    let layout = new Layout(this.layout.node)
    layout
      .initEdge(this.edge, this.layoutType.edgeScale)
      .setBlockScale(this.layoutType.blockScale)
      .draw(Data.getInstance().data)
    // controller
    new TouchBlock(
      new TouchFront(this.background.node),
      layout,
      this.score,
      this.bestScore,
      new ScoreManager(this.score)
    ).load()
  }

  onDestroy(): void {
    // remove cache
    Model.getInstance().ClearPool()
  }
}
