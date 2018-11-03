const { ccclass, property } = cc._decorator
import Data from './Data'

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  score: cc.Label = null
  @property(cc.Label)
  title: cc.Label = null

  onLoad() {
    this.score.string = String(Data.getInstance().score)
  }
  start() {
    this.title.string = Number(this.score.string) >= 2048 ? 'Win' : 'Over'
  }
}
