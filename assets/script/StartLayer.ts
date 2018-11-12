/*
 * @Author: AK-12
 * @Date: 2018-11-09 17:11:30
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-12 15:06:07
 */
const { ccclass, property } = cc._decorator
import SceneMediator from './SceneMediator'

@ccclass
export default class StartLayer extends cc.Component {
  @property(cc.Node)
  background: cc.Node = null

  isTouchOnce: boolean = true

  start() {
    this.background.on('touchend', () => {
      if (this.isTouchOnce) {
        SceneMediator.getInstance().goto(0.7, undefined, 0.4, () => {
          this.isTouchOnce = true
        })
      }
      this.isTouchOnce = false
    })
  }
}
