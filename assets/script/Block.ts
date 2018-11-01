/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-01 21:02:07
 */
const { ccclass, property } = cc._decorator
import IBlock from './IBlock'

@ccclass
export default class Block extends cc.Component implements IBlock {
  @property(cc.Sprite)
  sprite: cc.Sprite = null

  goLeft(this: Block): void {
    console.log(this)
    this.sprite.node.runAction(cc.moveBy(1, cc.p(-100, 0)))
  }

  goRight(this: Block): void {
    this.sprite.node.runAction(cc.moveBy(1, cc.p(100, 0)))
  }

  goUp(this: Block): void {
    this.sprite.node.runAction(cc.moveBy(1, cc.p(0, 100)))
  }

  goDown(this: Block): void {
    this.sprite.node.runAction(cc.moveBy(1, cc.p(0, -100)))
  }
}
