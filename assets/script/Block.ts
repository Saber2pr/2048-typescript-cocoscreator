/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-01 23:16:05
 */
const { ccclass, property } = cc._decorator
import IBlock from './IBlock'

@ccclass
export default class Block extends cc.Component implements IBlock {
  public goLeft = (): void => {
    this.node.runAction(cc.moveBy(1, cc.v2(-100, 0)))
  }

  public goRight = (): void => {
    this.node.runAction(cc.moveBy(1, cc.v2(100, 0)))
  }

  public goUp = (): void => {
    this.node.runAction(cc.moveBy(1, cc.v2(0, 100)))
  }

  public goDown = (): void => {
    this.node.runAction(cc.moveBy(1, cc.v2(0, -100)))
  }

  onLoad(): void {
    this.node.on('left', this.goLeft)
    this.node.on('right', this.goRight)
    this.node.on('up', this.goUp)
    this.node.on('down', this.goDown)
    this.node.on('left', () => console.log('block,yes'))
    cc.log('block', this)
  }
}
