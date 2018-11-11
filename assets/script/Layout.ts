/*
 * @Author: AK-12
 * @Date: 2018-11-01 20:07:29
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-11 18:57:08
 */
import ILayout from './ILayout'
import Model from './Model'
import { visitArray } from './MathVec'
/**
 *Block节点视图的逻辑
 *
 * 接口类
 * @export
 * @class Layout
 * @implements {ILayout}
 */
export default class Layout implements ILayout {
  /**
   *layout根节点
   *
   * @private
   * @type {cc.Node}
   * @memberof Layout
   */
  private background: cc.Node
  /**
   *锚点方形边界
   *
   * @private
   * @type {{width: { start: number; end: number } height: { start: number; end: number } }}
   * @memberof Layout
   */
  private edge: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }
  /**
   *锚点边界宽度
   *
   * @private
   * @type {number}
   * @memberof Layout
   */
  private width: number
  /**
   *锚点边界高度
   *
   * @private
   * @type {number}
   * @memberof Layout
   */
  private height: number
  /**
   *方块缩放
   *
   * @private
   * @type {number}
   * @memberof Layout
   */
  private blockScale: number = 1
  /**
   *边界原点
   *
   * @private
   * @type {cc.Vec2}
   * @memberof Layout
   */
  private origin: cc.Vec2
  /**
   *颜色组
   *
   * @private
   * @memberof Layout
   */
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
   * @memberof Layout
   */
  constructor(background: cc.Node) {
    this.background = background
    return this
  }
  /**
   *初始化边界
   *
   * @memberof Layout
   */
  public initEdge = (
    size: {
      width: { start: number; end: number }
      height: { start: number; end: number }
    },
    scale: number = 1
  ): Layout => {
    this.edge = size
    this.origin = cc.v2(size.width.start * scale, -size.width.start * scale)
    this.width = (this.edge.width.end - this.edge.width.start) * scale
    this.height = (this.edge.height.end - this.edge.height.start) * scale
    return this
  }
  /**
   *设置block缩放
   *
   * @param {number} scale
   * @memberof Layout
   */
  public setBlockScale(scale: number): Layout {
    this.blockScale = scale
    return this
  }
  /**
   *根据矩阵绘制block组
   *
   * @param {number[][]} data 矩阵数据
   * @memberof Layout
   */
  public draw(data: number[][]): void {
    let stepX = this.width / (data[0].length - 1)
    let stepY = this.height / (data.length - 1)
    Model.getInstance().clearNodeList()
    // 遍历block组
    visitArray(data, (raw, col) => {
      if (data[raw][col] !== 0) {
        // 映射锚点位置
        let pos = cc.v2(
          this.origin.x + stepX * col,
          this.origin.y - stepY * raw
        )
        // 取对象池节点
        let block = Model.getInstance().getBlock()
        block.setParent(this.background)
        block.setScale(this.blockScale)
        block.setPosition(pos)
        this.setNodeTarget(block, {
          raw: raw,
          col: col
        })
        block.getChildByName('label').getComponent(cc.Label).string = String(
          data[raw][col]
        )
        block.color = this.color[String(data[raw][col])]
        Model.getInstance().saveNode(block)
      }
    })
  }
  /**
   *根据命令和偏移执行绘图动作
   *
   * @param {string} command
   * @param {number[][]} delta
   * @param {Function} callback 结束回调
   * @param {number} [speed]
   * @memberof Layout
   */
  public action(
    command: string,
    delta: number[][],
    callback: Function,
    speed?: number
  ): void {
    visitArray(delta, (raw, col) => {
      let stepX = this.width / (delta[0].length - 1)
      let stepY = this.height / (delta.length - 1)
      if (delta[raw][col] !== 0) {
        let node = this.getNodeByTarget(this.background, {
          raw: raw,
          col: col
        })
        node
          .RunAction(
            this.getAction(
              command,
              {
                deltaX: delta[raw][col] * stepX,
                deltaY: delta[raw][col] * stepY
              },
              speed
            ).easing(ezaction.ease.cubicEaseOut(1))
          )
          .onStoped(callback)
      }
    })
  }
  /**
   *获取方向偏移动作
   *
   * @private
   * @param {string} command
   * @param {number} delta
   * @param {number} [speed=0.5]
   * @returns {cc.Action}
   * @memberof Layout
   */
  private getAction(
    command: string,
    delta: { deltaX: number; deltaY: number },
    speed: number = 0.5
  ): ezaction.HActionTweenBy {
    switch (command) {
      case 'left':
        return ezaction.moveBy(speed, cc.v2(-delta.deltaX, 0))
      case 'right':
        return ezaction.moveBy(speed, cc.v2(delta.deltaX, 0))
      case 'up':
        return ezaction.moveBy(speed, cc.v2(0, delta.deltaY))
      case 'down':
        return ezaction.moveBy(speed, cc.v2(0, -delta.deltaY))
      default:
        throw new Error('action command error')
    }
  }
  /**
   *设置坐标索引
   *
   * @private
   * @param {cc.Node} node
   * @param {{ raw: number; col: number }} pos
   * @memberof Layout
   */
  private setNodeTarget(
    node: cc.Node,
    pos: { raw: number; col: number }
  ): void {
    node.name = String(pos.raw + '' + pos.col)
  }
  /**
   *根据坐标索引获取节点
   *
   * @private
   * @param {cc.Node} parent
   * @param {{ raw: number; col: number }} pos
   * @returns {cc.Node}
   * @memberof Layout
   */
  private getNodeByTarget(
    parent: cc.Node,
    pos: { raw: number; col: number }
  ): cc.Node {
    return parent.getChildByName(String(pos.raw + '' + pos.col))
  }
}
