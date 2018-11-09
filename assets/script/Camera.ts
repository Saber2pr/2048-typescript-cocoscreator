/*
 * @Author: AK-12
 * @Date: 2018-11-09 17:11:19
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-09 21:16:51
 */
const { ccclass, property } = cc._decorator
import CameraManager from '../lib/singletons/CameraManager'

@ccclass
export default class Camera extends cc.Component {
  @property({
    type: [cc.Node],
    displayName: 'layer节点'
  })
  layerList: Array<cc.Node> = []
  @property({
    type: cc.SceneAsset,
    displayName: '场景'
  })
  scene: cc.SceneAsset = null
  onLoad() {
    CameraManager.getInstance().initCamera(
      this.node,
      this.layerList,
      this.scene
    )
  }
}
