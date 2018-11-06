/*
 * @Author: AK-12 
 * @Date: 2018-11-01 20:07:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-06 17:58:40
 */
import ILayout from './ILayout'
import Model from './Model'
import { visitArray } from './MathVec'
/**
 *Block节点视图的逻辑
 *
 * @export
 * @class Layout
 * @implements {ILayout}
 */
export default class Layout implements ILayout {
  private background: cc.Node
  private edge: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }
  private start: cc.Vec2
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
  constructor(background: cc.Node) {
    this.background = background
    return this
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
    this.start = cc.v2(size.width.start, -size.height.start)
    return this
  }
  /**
   *根据矩阵绘制block组
   *
   * @param {number[][]} data 矩阵数据
   * @param {number} [step=100] 方块间隔
   * @memberof Layout
   */
  public draw(data: number[][], step: number = 100): void {
    Model.getInstance().clearNodeList()
    // 遍历block组
    visitArray(data, (raw, col) => {
      if (data[raw][col] !== 0) {
        // 映射锚点位置
        let pos = cc.v2(this.start.x + step * col, this.start.y - step * raw)
        // 取对象池节点
        let block = Model.getInstance().getBlock()
        block.setParent(this.background)
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
   * @param {number} [speed]
   * @memberof Layout
   */
  public action(command: string, delta: number[][], speed?: number): void {
    visitArray(delta, (raw, col) => {
      if (delta[raw][col] !== 0) {
        let node = this.getNodeByTarget(this.background, {
          raw: raw,
          col: col
        })
        node.runAction(this.getAction(command, delta[raw][col] * 100, speed))
      }
    })
  }
  /**
   *调度节点动作
   *
   * @private
   * @param {number} dt
   * @param {cc.Node} node
   * @memberof Layout
   */
  private runAction(dt: number, node: cc.Node) {
    new cc.Component().schedule(() => {
      node.position
    }, dt)
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
    delta: number,
    speed: number = 0.5
  ): cc.Action {
    switch (command) {
      case 'left':
        return cc.moveBy(speed, cc.v2(-delta, 0))
      case 'right':
        return cc.moveBy(speed, cc.v2(-delta, 0))
      case 'up':
        return cc.moveBy(speed, cc.v2(0, delta))
      case 'down':
        return cc.moveBy(speed, cc.v2(0, delta))
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
  /**
   *打印调试信息
   *
   * @memberof Layout
   */
  public log(): void {
    cc.log('nodelist:', Model.getInstance().NodeList.length)
  }
}
