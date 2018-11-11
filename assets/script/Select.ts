/*
 * @Author: AK-12
 * @Date: 2018-11-11 22:53:29
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-11 22:53:29
 */
const { ccclass, property } = cc._decorator
import State from './State'

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  left: cc.Node = null
  @property(cc.Node)
  right: cc.Node = null
  @property([cc.Label])
  currentList: cc.Label[] = []

  currentIndex: number = null
  onLoad() {
    this.currentIndex = 1
    this.updateCurrent()
  }

  start() {
    this.left.on('touchstart', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
      this.updateCurrent()
    })
    this.right.on('touchstart', () => {
      if (this.currentIndex < this.currentList.length - 1) {
        this.currentIndex++
      }
      this.updateCurrent()
    })
  }

  updateCurrent(): void {
    for (let item of this.currentList) {
      item.node.active = false
    }
    if (this.currentIndex >= 0 && this.currentIndex < this.currentList.length) {
      this.currentList[this.currentIndex].node.active = true
    } else {
      throw new Error('current select error: ' + this.currentIndex)
    }
    State.getInstance().layoutTypeIndex = this.currentIndex
  }
}
