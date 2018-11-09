/*
 * @Author: AK-12
 * @Date: 2018-11-09 17:11:30
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-09 17:11:30
 */
const { ccclass, property } = cc._decorator
import SceneMediator from './src/singletons/SceneMediator'

@ccclass
export default class StartLayer extends cc.Component {
  @property(cc.Button)
  startBtn: cc.Button = null

  start() {
    this.startBtn.node.on('click', () => {
      SceneMediator.getInstance().goto()
    })
  }
}
