/*
 * @Author: AK-12
 * @Date: 2018-11-09 17:11:23
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-09 17:11:23
 */
const { ccclass, property } = cc._decorator
import Data from './src/singletons/Data'
import Model from './src/singletons/Model'
import CameraManager from './src/singletons/CameraManager'

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
