const { ccclass, property } = cc._decorator
import CameraManager from './CameraManager'

@ccclass
export default class StartLayer extends cc.Component {
  @property(cc.Button)
  startBtn: cc.Button = null

  start() {
    this.startBtn.node.on('click', () => {
      CameraManager.getInstance().go(1, (camera, dpos) => {
        CameraManager.getInstance().LastLayer.runAction(cc.scaleTo(1, 1.1))
        camera
          .RunAction(ezaction.moveBy(1, cc.v2(0, 0)))
          .then(ezaction.moveTo(1, dpos))
      })
    })
  }
}
