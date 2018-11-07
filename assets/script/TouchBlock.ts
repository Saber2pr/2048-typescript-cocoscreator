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
  private _score: cc.Label
  constructor(touchFront: TouchFront, layout: Layout, score: cc.Label) {
    this.touchFront = touchFront
    this.layout = layout
    this._score = score
    this.DataStn = Data.getInstance()
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
  private layoutStep(command: string, speed: number = 0.2): void {
    let delta = this.DataStn.merge(command)
    this.layout.action(command, delta, speed)
    // 等待节点动作完成
    setTimeout(() => {
      this.layout.draw(this.DataStn.data)
    }, speed * 1100)
    if (this.DataStn.isChanged) {
      this.DataStn.addRand()
    }
    this.testResult()
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
   *判断结果
   *
   * @private
   * @memberof TouchBlock
   */
  private testResult = (): void => {
    this._score.string = String(this.DataStn.score)
    if (this.DataStn.result || this.DataStn.isFull) {
      this.gameEnd()
    }
  }
  /**
   *游戏结果
   *
   * @private
   * @memberof TouchBlock
   */
  private gameEnd = (speed: number = 0.2): void => {
    // 等待节点动作完成
    setTimeout(() => {
      cc.director.loadScene('EndScene')
    }, speed * 1100)
  }
}
