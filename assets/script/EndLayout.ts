/*
 * @Author: AK-12
 * @Date: 2018-11-09 17:11:23
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-13 16:05:21
 */
const { ccclass, property } = cc._decorator
import Data from './Data'
import Model from './Model'
import SceneMediator from './SceneMediator'
import State from './State'

@ccclass
export default class EndLayer extends cc.Component {
  @property(cc.Label)
  score: cc.Label = null
  @property(cc.Label)
  title: cc.Label = null
  @property(cc.Button)
  restartBtn: cc.Button = null

  maxValue: number = null

  onLoad() {
    this.maxValue = Data.getInstance().MaxValue
  }
  start() {
    if (Data.getInstance().result) {
      this.title.string = 'Win! ' + this.maxValue + '!'
      this.score.string = String(Data.getInstance().score - 1)
      this.restartBtn.node
        .getChildByName('Label')
        .getComponent(cc.Label).string = 'continue!'
      this.restartBtn.node.on('click', () => {
        Model.getInstance().returnPreLayout(this.node)
      })
    } else {
      this.title.string = 'Over'
      this.score.string = String(Data.getInstance().score)
      this.restartBtn.node
        .getChildByName('Label')
        .getComponent(cc.Label).string = 'restart'
      this.restartBtn.node.on('click', () => {
        Model.getInstance().returnPreLayout(this.node)
        SceneMediator.getInstance().go(
          -1,
          undefined,
          undefined,
          undefined,
          () => {
            State.getInstance().isActionStop = true
            Model.getInstance()
              .getLayerNode()
              .destroy()
          }
        )
      })
    }
  }
}
