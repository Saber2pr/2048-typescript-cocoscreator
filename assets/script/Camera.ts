const { ccclass, property } = cc._decorator
import CameraManager from './CameraManager'

@ccclass
export default class NewClass extends cc.Component {
  @property({
    type: [cc.Node],
    displayName: 'layer节点'
  })
  layerList: Array<cc.Node> = []
  onLoad() {
    CameraManager.getInstance().initCamera(this.node, this.layerList)
  }
}
