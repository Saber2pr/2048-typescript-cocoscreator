const { ccclass, property } = cc._decorator
import Data from './Data'

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  score: cc.Label = null
  @property(cc.Label)
  title: cc.Label = null

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
  }
}
