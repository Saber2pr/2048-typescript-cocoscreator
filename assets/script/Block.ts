/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 23:48:39
 */
import IBlock from './IBlock'
import Model from './Model'
import MathVec from './MathVec'
/**
 *Block节点对象的逻辑
 *
 * @export
 * @class Block
 * @implements {IBlock}
 */
export default class Block implements IBlock {
  private nodeList: cc.Node[]
  private background: cc.Node
  private offset: number
  private speed: number
  private edge: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }
  constructor(
    nodeList: cc.Node[],
    background: cc.Node,
    offset: number,
    speed: number = 0.2
  ) {
    this.nodeList = nodeList
    this.offset = offset
    this.speed = speed
    this.background = background
  }
  private all(callback: Function): void {
    for (const block of this.nodeList) {
      if (
        block.x >= this.edge.width.start &&
        block.x <= this.edge.width.end &&
        block.y >= this.edge.height.start &&
        block.y <= this.edge.height.end
      ) {
        callback(block)
      }
    }
  }
  public initEdge = (size: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }): void => {
    this.edge = size
  }

  private putNullNode(node: cc.Node, value: number) {
    value === 0 ? Model.getInstance().BlockPool.put(node) : null
  }

  private addBlock(num: number, array: cc.Node[]): void {
    let rand = new MathVec(-150, 100, 4)
    let flag: number = 0
    let handle = setInterval(() => {
      flag >= num ? clearInterval(handle) : null
      let block = Model.getInstance().BlockPool.get()
      block.setParent(this.background)
      block.setPosition(rand.randPos())
      array.push(block)
      flag++
    })
  }

  public goLeft = (): void => {
    this.all(block =>
      block.runAction(cc.moveBy(this.speed, cc.v2(-this.offset, 0)))
    )
  }

  public goRight = (): void => {
    this.all(block =>
      block.runAction(cc.moveBy(this.speed, cc.v2(this.offset, 0)))
    )
  }

  public goUp = (): void => {
    this.all(block =>
      block.runAction(cc.moveBy(this.speed, cc.v2(0, this.offset)))
    )
  }

  public goDown = (): void => {
    this.all(block =>
      block.runAction(cc.moveBy(this.speed, cc.v2(0, -this.offset)))
    )
  }
}
