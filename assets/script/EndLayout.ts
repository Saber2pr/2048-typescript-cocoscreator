const { ccclass, property } = cc._decorator
import Data from './Data'
import Model from './Model'
import CameraManager from './CameraManager'

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
    } else {
      this.title.string = 'Over'
      this.score.string = String(Data.getInstance().score)
    }
    this.restartBtn.node.on('click', () => {
      Model.getInstance().returnPreLayout(this.node)
      CameraManager.getInstance().reload(1)
    })
  }
}
