/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:00 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 16:31:26
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
  constructor(touchFront: TouchFront, layout: Layout) {
    this.touchFront = touchFront
    this.layout = layout
    this._count = 0
  }

  public load = (): void => {
    // 触摸手势回调
    this.touchFront.submit(this.left, this.right, this.up, this.down).listen()
  }
  private left = (): void => {
    Data.getInstance().merge('left')
    this.result = Data.getInstance().addRand()
    this.testResult()
    this.layout.goLeft()
  }
  private right = (): void => {
    Data.getInstance().merge('right')
    this.result = Data.getInstance().addRand()
    this.testResult()
    this.layout.goRight()
  }
  private up = (): void => {
    Data.getInstance().merge('up')
    this.result = Data.getInstance().addRand()
    this.testResult()
    this.layout.goUp()
  }
  private down = (): void => {
    Data.getInstance().merge('down')
    this.result = Data.getInstance().addRand()
    this.testResult()
    this.layout.goDown()
  }
  /**
   *四个方向都没合并
   *
   * @private
   * @memberof TouchBlock
   */
  private testResult = (): void => {
    this._count++
    if (this._count > 4) {
      if (this.result === false) {
        this.gameOver()
      } else {
        this._count = 0
      }
    }
  }
  /**
   *游戏失败
   *
   * @private
   * @memberof TouchBlock
   */
  private gameOver = (): void => {
    cc.log('over!!')
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
