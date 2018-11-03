/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 13:14:48
 */
import ILayout from './ILayout'
import Model from './Model'
import MathVec, { visitArray } from './MathVec'
import Data from './Data'
/**
 *Block节点视图的逻辑
 *
 * @export
 * @class Layout
 * @implements {ILayout}
 */
export default class Layout implements ILayout {
  private background: cc.Node
  private offset: number
  private speed: number
  private edge: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }
  /**
   *Creates an instance of Layout.
   * @param {cc.Node} background
   * @param {number} offset
   * @param {number} [speed=0.2]
   * @memberof Layout
   */
  constructor(background: cc.Node, offset: number, speed: number = 0.2) {
    this.offset = offset
    this.speed = speed
    this.background = background
    return this
  }

  private all(callback: Function): void {
    for (const block of Model.getInstance().NodeList) {
      callback(block)
    }
  }
  /**
   *初始化边界
   *
   * @memberof Layout
   */
  public initEdge = (size: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }): Layout => {
    this.edge = size
    return this
  }

  private putNullNode(node: cc.Node, value: number) {
    value === 0 ? Model.getInstance().putBlock(node) : null
  }
  /**
   *绘制block组
   *
   * @param {number} [step=100]
   * @memberof Layout
   */
  public draw(step: number = 100): void {
    Model.getInstance().clearNodeList()
    let data = Data.getInstance().data
    let start = cc.v2(this.edge.width.start, -this.edge.height.start)
    visitArray(data, (raw, col) => {
      if (data[raw][col] !== 0) {
        let pos = cc.v2(start.x + step * col, start.y - step * raw)
        let block = Model.getInstance().getBlock()
        block.setParent(this.background)
        block.setPosition(pos)
        block.getChildByName('label').getComponent(cc.Label).string = String(
          data[raw][col]
        )
        Model.getInstance().saveNode(block)
      }
    })
  }

  public addBlock(num: number, array: cc.Node[]): void {
    let rand = new MathVec(-150, 100, 4)
    let flag: number = 0
    let handle = setInterval(() => {
      flag >= num ? clearInterval(handle) : null
      let block = Model.getInstance().getBlock()
      block.setParent(this.background)
      block.setPosition(rand.randPos())
      array.push(block)
      flag++
    })
  }
  /**
   *判断边界
   *
   * @private
   * @param {cc.Vec2} vec2
   * @param {(vec2: cc.Vec2) => cc.Vec2} callback
   * @returns {cc.Vec2}
   * @memberof Layout
   */
  private judgeEdge(
    vec2: cc.Vec2,
    callback: (vec2: cc.Vec2) => cc.Vec2
  ): cc.Vec2 {
    let desPos: cc.Vec2
    if (
      vec2.x >= this.edge.width.start &&
      vec2.x <= this.edge.width.end &&
      vec2.y >= this.edge.height.start &&
      vec2.y <= this.edge.height.end
    ) {
      cc.log('in edge', vec2)
      desPos = callback(vec2)
    } else {
      cc.log('on edge', vec2)
      desPos = cc.v2(vec2.x, vec2.y)
    }
    return desPos
  }

  public goLeft = (): void => {
    cc.log('left')
    this.all(block => {
      let desPos = this.judgeEdge(cc.v2(block.x, block.y), vec2 => {
        return cc.v2(vec2.x - this.offset, vec2.y)
      })
      block.runAction(cc.moveTo(this.speed, desPos))
    })
  }

  public goRight = (): void => {
    this.all(block => {
      let desPos = this.judgeEdge(cc.v2(block.x, block.y), vec2 => {
        return cc.v2(vec2.x + this.offset, vec2.y)
      })
      block.runAction(cc.moveTo(this.speed, desPos))
    })
  }

  public goUp = (): void => {
    this.all(block => {
      let desPos = this.judgeEdge(cc.v2(block.x, block.y), vec2 => {
        return cc.v2(vec2.x, vec2.y + this.offset)
      })
      block.runAction(cc.moveTo(this.speed, desPos))
    })
  }

  public goDown = (): void => {
    this.all(block => {
      let desPos = this.judgeEdge(cc.v2(block.x, block.y), vec2 => {
        return cc.v2(vec2.x, vec2.y - this.offset)
      })
      block.runAction(cc.moveTo(this.speed, desPos))
    })
  }

  public log(): void {
    cc.log('nodelist:', Model.getInstance().NodeList.length)
  }
}
