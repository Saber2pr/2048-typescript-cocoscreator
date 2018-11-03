const { ccclass, property } = cc._decorator

@ccclass
export default class NewClass extends cc.Component {
  @property({
    type: cc.Button,
    displayName: '切换按钮'
  })
  button: cc.Button = null

  @property({
    type: cc.SceneAsset,
    displayName: '目标场景'
  })
  target: cc.SceneAsset = null

  start() {
    this.button.node.on('click', () => {
      cc.director.loadScene(this.target.name)
    })
  }
}
