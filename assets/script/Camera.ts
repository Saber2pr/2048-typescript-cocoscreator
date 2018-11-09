/*
 * @Author: AK-12
 * @Date: 2018-11-09 17:11:19
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-09 17:11:19
 */
const { ccclass, property } = cc._decorator
import CameraManager from './src/singletons/CameraManager'

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
