/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:00 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-06 17:55:58
 */
import TouchFront from './ITouchFront'
import Layout from './ILayout'
import Data from './Data'
/**
 *建立触摸与block之间关系
//  *
 * @export
 * @class TouchBlock
 */
export default class TouchBlock {
  private touchFront: TouchFront
  private layout: Layout
  private DataStn: Data
  private result: boolean
  private _count: number
  private _score: cc.Label
  constructor(touchFront: TouchFront, layout: Layout, score: cc.Label) {
    this.touchFront = touchFront
    this.layout = layout
    this._count = 0
    this._score = score
    this.result = true
    this.DataStn = Data.getInstance()
  }
  /**
   *结果
   *
   * @readonly
   * @type {boolean}
   * @memberof TouchBlock
   */
  get Result(): boolean {
    return this.result
  }
  /**
   *加载触摸事件
   *
   * @memberof TouchBlock
   */
  public load = (): void => {
    // 触摸手势回调
    this.touchFront.submit(this.left, this.right, this.up, this.down).listen()
  }
  private layoutStep(command: string, speed: number = 0.3): void {
    let delta = this.DataStn.merge(command)
    this.result = this.DataStn.addRand()
    this.testResult()
    this.layout.action(command, delta, speed)
    new cc.Component().schedule(() => {
      this.layout.draw(this.DataStn.data)
    }, speed)
    // setTimeout(() => {

    // }, speed * 1000)
  }
  private left = (): void => {
    this.layoutStep('left')
  }
  private right = (): void => {
    this.layoutStep('right')
  }
  private up = (): void => {
    this.layoutStep('up')
  }
  private down = (): void => {
    this.layoutStep('down')
  }
  /**
   *四个方向都没合并
   *
   * @private
   * @memberof TouchBlock
   */
  private testResult = (): void => {
    this._score.string = String(this.DataStn.score)
    this._count++
    if (this._count > 4) {
      if (this.result === false) {
        this.gameEnd()
      } else {
        this._count = 0
      }
    }
    if (Math.abs(this.DataStn.score) % 2) {
      this.gameEnd()
    }
  }
  /**
   *游戏结果
   *
   * @private
   * @memberof TouchBlock
   */
  private gameEnd = (): void => {
    cc.director.loadScene('EndScene')
  }
  /**
   *输出调试信息
   *
   * @memberof TouchBlock
   */
  public log = (): void => {
    cc.log('result', this.result, 'count', this._count)
  }
}
