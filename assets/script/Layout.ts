/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 18:59:57
 */
import ILayout from './ILayout'
import Model from './Model'
import { visitArray, computed, judgePos } from './MathVec'
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
  private color = {
    2: cc.color(237, 241, 21, 255),
    4: cc.color(241, 180, 21, 255),
    8: cc.color(171, 241, 21, 255),
    16: cc.color(149, 160, 216, 255),
    32: cc.color(187, 149, 216, 255),
    64: cc.color(216, 149, 209, 255),
    128: cc.color(28, 118, 156, 255),
    256: cc.color(16, 74, 99, 255),
    512: cc.color(168, 85, 25, 255),
    1024: cc.color(236, 122, 38, 255),
    2048: cc.color(236, 86, 33, 255)
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
      setTimeout(() => {
        this.draw()
      }, this.speed * 1000)
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
  /**
   *根据矩阵绘制block组
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
        block.color = this.color[String(data[raw][col])]
        this.setPos(block, cc.v2(raw, col))
        Model.getInstance().saveNode(block, cc.v2(raw, col))
      }
    })
  }
  /**
   *设置block索引
   *
   * @private
   * @param {cc.Node} node
   * @param {cc.Vec2} vec2
   * @memberof Layout
   */
  private setPos(node: cc.Node, vec2: cc.Vec2): void {
    node.getChildByName('x').getComponent(cc.Label).string = String(vec2.x)
    node.getChildByName('y').getComponent(cc.Label).string = String(vec2.y)
  }
  /**
   *获取block索引
   *
   * @private
   * @param {*} node
   * @returns {cc.Vec2}
   * @memberof Layout
   */
  private getPos(node): cc.Vec2 {
    let x = Number(node.getChildByName('x').getComponent(cc.Label).string)
    let y = Number(node.getChildByName('y').getComponent(cc.Label).string)
    return cc.v2(x, y)
  }

  /**
   *判断边界,如果点在范围内，则执行回调
   *
   * @private
   * @param {cc.Vec2} vec2
   * @param {(vec2: cc.Vec2) => cc.Vec2} callback
   * @returns {cc.Vec2}
   * @memberof Layout
   */
  private judgeEdge(
    vec2: cc.Vec2,
    delta: cc.Vec2,
    callback: (vec2: cc.Vec2) => void
  ): void {
    let desPos: cc.Vec2 = computed(vec2, '+', delta)
    if (
      desPos.x >= this.edge.width.start &&
      desPos.x <= this.edge.width.end &&
      desPos.y >= this.edge.height.start &&
      desPos.y <= this.edge.height.end
    ) {
      callback(desPos)
    } else {
      callback(vec2)
    }
  }

  public goLeft = (): void => {
    this.all(block => {
      this.judgeEdge(
        cc.v2(block.x, block.y),
        cc.v2(-this.offset, 0),
        desPos => {
          // judgePos(
          //   this.getPos(block)
          //   )
          let pos = this.getPos(block)
          let nextPos = cc.v2(pos.x, pos.y + 1)
          let test = Model.getInstance().PointList
          cc.log(test, nextPos)
          block.runAction(cc.moveTo(this.speed, desPos))
        }
      )
    })
  }

  public goRight = (): void => {
    this.all(block => {
      this.judgeEdge(cc.v2(block.x, block.y), cc.v2(this.offset, 0), desPos => {
        block.runAction(cc.moveTo(this.speed, desPos))
      })
    })
  }

  public goUp = (): void => {
    this.all(block => {
      this.judgeEdge(cc.v2(block.x, block.y), cc.v2(0, this.offset), desPos => {
        block.runAction(cc.moveTo(this.speed, desPos))
      })
    })
  }

  public goDown = (): void => {
    this.all(block => {
      this.judgeEdge(
        cc.v2(block.x, block.y),
        cc.v2(0, -this.offset),
        desPos => {
          block.runAction(cc.moveTo(this.speed, desPos))
        }
      )
    })
  }

  public log(): void {
    cc.log('nodelist:', Model.getInstance().NodeList.length)
  }
}
