const { ccclass, property } = cc._decorator
import SceneMediator from './SceneMediator'

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
