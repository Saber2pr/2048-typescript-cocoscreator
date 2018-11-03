/*
 * @Author: AK-12 
 * @Date: 2018-11-01 13:31:42 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 19:25:20
 */
import ITouchFront from './ITouchFront'
/**
 *触摸方向执行对应回调
 *
 * @export
 * @class TouchFront
 * @implements {ITouchFront}
 */
export default class TouchFront implements ITouchFront {
  private node: cc.Node
  private offset: number
  private delta: number
  private _lock: number

  private callbackLeft: Function
  private callbackRight: Function
  private callbackUp: Function
  private callbackDown: Function

  /**
   *Creates an instance of TouchFront.
   * @param {cc.Node} node 监听节点
   * @param {number} [offset=100] 触摸偏移 ? 100
   * @param {number} [delta=200] 灵敏度 ? 200
   * @memberof TouchFront
   */
  constructor(node: cc.Node, offset: number = 100, delta: number = 200) {
    this.node = node
    this.offset = offset
    this._lock = 0
    this.delta = delta
  }
  /**
   *注册手势回调
   *
   * @memberof TouchFront
   */
  public submit = (
    callbackLeft?: Function,
    callbackRight?: Function,
    callbackUp?: Function,
    callbackDown?: Function
  ): TouchFront => {
    this.callbackLeft = callbackLeft
    this.callbackRight = callbackRight
    this.callbackUp = callbackUp
    this.callbackDown = callbackDown
    return this
  }
  /**
   *监听触摸
   *
   * @memberof TouchFront
   */
  public listen = (): void => {
    let originPos: cc.Vec2
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      touch => (originPos = touch.getLocation())
    )
    this.node.on(cc.Node.EventType.TOUCH_MOVE, touch => {
      this._lock++
    })
    this.node.on(cc.Node.EventType.TOUCH_END, touch => {
      this._lock < this.delta
        ? this.testPos(originPos, touch.getLocation())
        : null
      this._lock = 0
    })
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, touch => {
      this._lock < this.delta
        ? this.testPos(originPos, touch.getLocation())
        : null
      this._lock = 0
    })
  }
  /**
   *检测偏移执行回调
   *
   * @private
   * @memberof TouchFront
   */
  private testPos = (originPos: cc.Vec2, touchPos: cc.Vec2): void => {
    if (
      Math.abs(touchPos.x - originPos.x) < this.offset &&
      Math.abs(touchPos.y - originPos.y) < this.offset
    ) {
      return
    }
    if (
      Math.abs(touchPos.x - originPos.x) > Math.abs(touchPos.y - originPos.y)
    ) {
      if (touchPos.x - originPos.x > this.offset) {
        !!this.callbackRight ? this.callbackRight() : null
      } else if (touchPos.x - originPos.x < -this.offset) {
        !!this.callbackLeft ? this.callbackLeft() : null
      }
    } else {
      if (touchPos.y - originPos.y > this.offset) {
        !!this.callbackUp ? this.callbackUp() : null
      } else if (touchPos.y - originPos.y < -this.offset) {
        !!this.callbackDown ? this.callbackDown() : null
      }
    }
  }
}
