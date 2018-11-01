/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-01 21:52:54
 */
import IBlock from './IBlock'

export default class Block implements IBlock {
  private sprite: cc.Sprite
  constructor(sprite: cc.Sprite) {
    this.sprite = sprite
  }

  goLeft(this: Block): void {
    this.sprite.node.runAction(cc.moveBy(1, cc.v2(-100, 0)))
  }

  goRight(this: Block): void {
    this.sprite.node.runAction(cc.moveBy(1, cc.v2(100, 0)))
  }

  goUp(this: Block): void {
    this.sprite.node.runAction(cc.moveBy(1, cc.v2(0, 100)))
  }

  goDown(this: Block): void {
    this.sprite.node.runAction(cc.moveBy(1, cc.v2(0, -100)))
  }
}
