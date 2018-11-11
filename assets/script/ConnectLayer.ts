/*
 * @Author: AK-12
 * @Date: 2018-11-09 17:11:30
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-11 22:14:21
 */
const { ccclass, property } = cc._decorator
import SceneMediator from './SceneMediator'

@ccclass
export default class ConnectLayer extends cc.Component {
  @property(cc.Button)
  beforeBtn: cc.Button = null
  @property(cc.Button)
  nextBtn: cc.Button = null
  @property(cc.Prefab)
  PlayLayer: cc.Prefab = null
  @property(cc.Node)
  PlayLayerAnchor: cc.Node = null

  start() {
    this.nextBtn.node.on('click', () => {
      SceneMediator.getInstance().go(
        1,
        () => {
          let PlayLayer = cc.instantiate(this.PlayLayer)
          PlayLayer.setParent(this.PlayLayerAnchor)
          PlayLayer.setPosition(0, 0)
        },
        undefined,
        undefined,
        undefined
      )
    })
    this.beforeBtn.node.on('click', () => {
      SceneMediator.getInstance().backto()
    })
  }
}
