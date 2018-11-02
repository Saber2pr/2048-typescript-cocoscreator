/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 13:45:28
 */
import IBlock from './IBlock'
/**
 *Block节点对象的逻辑
 *
 * @export
 * @class Block
 * @implements {IBlock}
 */
export default class Block implements IBlock {
  private nodeList: cc.Node[] = null
  private offset: number
  constructor(nodeList: cc.Node[], offset: number) {
    this.nodeList = nodeList
    this.offset = offset
  }
  private all(callback: Function): void {
    for (const block of this.nodeList) {
      callback(block)
    }
  }
  public goLeft = (): void => {
    this.all(block => block.runAction(cc.moveBy(1, cc.v2(-this.offset, 0))))
  }

  public goRight = (): void => {
    this.all(block => block.runAction(cc.moveBy(1, cc.v2(this.offset, 0))))
  }

  public goUp = (): void => {
    this.all(block => block.runAction(cc.moveBy(1, cc.v2(0, this.offset))))
  }

  public goDown = (): void => {
    this.all(block => block.runAction(cc.moveBy(1, cc.v2(0, -this.offset))))
  }
}
