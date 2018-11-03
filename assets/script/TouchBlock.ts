/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:00 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 20:35:54
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
  private result: boolean
  private _count: number
  private _score: cc.Label
  constructor(touchFront: TouchFront, layout: Layout, score: cc.Label) {
    this.touchFront = touchFront
    this.layout = layout
    this._count = 0
    this._score = score
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
  private left = (): void => {
    Data.getInstance().merge('left')
    this.result = Data.getInstance().addRand()
    this.testResult()
    this.layout.draw()
  }
  private right = (): void => {
    Data.getInstance().merge('right')
    this.result = Data.getInstance().addRand()
    this.testResult()
    this.layout.draw()
  }
  private up = (): void => {
    Data.getInstance().merge('up')
    this.result = Data.getInstance().addRand()
    this.testResult()
    this.layout.draw()
  }
  private down = (): void => {
    Data.getInstance().merge('down')
    this.result = Data.getInstance().addRand()
    this.testResult()
    this.layout.draw()
  }
  /**
   *四个方向都没合并
   *
   * @private
   * @memberof TouchBlock
   */
  private testResult = (): void => {
    this._score.string = String(Data.getInstance().score)
    this._count++
    if (this._count > 4) {
      if (this.result === false) {
        this.gameEnd()
      } else {
        this._count = 0
      }
    }
    if (Number(this._score.string) >= 2048) {
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
