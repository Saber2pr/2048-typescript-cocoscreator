/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 10:21:56
 */
import IBlock from './IBlock'
import Model from './Model'
import MathVec from './MathVec'
import Data from './Data'
/**
 *Block节点对象的逻辑
 *
 * @export
 * @class Block
 * @implements {IBlock}
 */
export default class Block implements IBlock {
  private background: cc.Node
  private offset: number
  private speed: number
  private edge: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }

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
  public initEdge = (size: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }): Block => {
    this.edge = size
    return this
  }

  private putNullNode(node: cc.Node, value: number) {
    value === 0 ? Model.getInstance().putBlock(node) : null
  }

  public draw(): void {
    Model.getInstance().clearNodeList()
    let data = Data.getInstance().data
    let raws = data.length
    let raw = 0
    let step = 100
    let start = cc.v2(-150, 150)
    for (; raw < raws; raw++) {
      let cols = data[raw].length
      let col = 0
      for (; col < cols; col++) {
        let pos = cc.v2(start.x + step * col, start.y - step * raw)
        let block = Model.getInstance().getBlock()
        block.setParent(this.background)
        block.setPosition(pos)
        block.getChildByName('label').getComponent(cc.Label).string = String(
          data[raw][col]
        )
        Model.getInstance().saveNode(block)
      }
    }
    cc.log('nodelist:', Model.getInstance().NodeList.length)
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
}
