/*
 * @Author: AK-12
 * @Date: 2018-11-02 13:06:00
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-09 13:36:11
 */
import TouchFront from './ITouchFront'
import Layout from './ILayout'
import Data from './Data'
import Model from './Model'
import CameraManager from './CameraManager'
/**
 *建立触摸与block之间关系
 *
 * @export
 * @class TouchBlock
 */
export default class TouchBlock {
  /**
   *触摸手势api
   *
   * @private
   * @type {TouchFront}
   * @memberof TouchBlock
   */
  private touchFront: TouchFront
  /**
   *layout绘图api
   *
   * @private
   * @type {Layout}
   * @memberof TouchBlock
   */
  private layout: Layout
  /**
   *矩阵api
   *
   * @private
   * @type {Data}
   * @memberof TouchBlock
   */
  private DataStn: Data
  /**
   *场景score组件label
   *
   * @private
   * @type {cc.Label}
   * @memberof TouchBlock
   */
  private _score: cc.Label
  /**
   *Creates an instance of TouchBlock.
   * @param {TouchFront} touchFront
   * @param {Layout} layout
   * @param {cc.Label} score
   * @memberof TouchBlock
   */
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
  /**
   *layout绘图引擎
   *
   * @private
   * @param {string} command
   * @param {number} [speed=0.2]
   * @memberof TouchBlock
   */
  private layoutStep(command: string, speed: number = 0.2): void {
    let delta = this.DataStn.merge(command)
    this.layout.action(
      command,
      delta,
      () => {
        this.layout.draw(this.DataStn.data)
        this.testResult()
      },
      speed
    )
    if (this.DataStn.isChanged) {
      this.DataStn.addRand()
    }
  }
  /**
   *绘图任务
   *
   * @private
   * @memberof TouchBlock
   */
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
    if (this.DataStn.result) {
      this.gameEnd()
      this._score.string = String(this.DataStn.score - 1)
    } else if (this.DataStn.isFull) {
      if (!this.DataStn.hasTwice) {
        this._score.string = String(this.DataStn.score)
        this.gameEnd()
      }
    }
  }
  /**
   *游戏结果
   *
   * @private
   * @memberof TouchBlock
   */
  private gameEnd = (): void => {
    let end = Model.getInstance().getPreLayout()
    if (end !== null) {
      end.setParent(CameraManager.getInstance().CurrentLayer)
    }
  }
}
