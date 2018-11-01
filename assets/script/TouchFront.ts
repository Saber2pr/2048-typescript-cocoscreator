/*
 * @Author: AK-12 
 * @Date: 2018-11-01 13:31:42 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-01 20:54:18
 */
export default class TouchFront {
  private node: cc.Node
  private size: number

  private callbackLeft: Function
  private callbackRight: Function
  private callbackUp: Function
  private callbackDown: Function

  constructor(node: cc.Node, size: number) {
    this.node = node
    this.size = size
  }

  public submit(
    callbackLeft?: Function,
    callbackRight?: Function,
    callbackUp?: Function,
    callbackDown?: Function
  ): TouchFront {
    this.callbackLeft = callbackLeft
    this.callbackRight = callbackRight
    this.callbackUp = callbackUp
    this.callbackDown = callbackDown
    return this
  }

  public listen(): void {
    let originPos: cc.Vec2
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      touch => (originPos = touch.getLocation())
    )
    this.node.on(cc.Node.EventType.TOUCH_MOVE, touch =>
      this.testPos(originPos, touch.getLocation())
    )
  }

  private testPos(originPos: cc.Vec2, touchPos: cc.Vec2): void {
    if (Math.abs(touchPos.x - originPos.x) < this.size) {
      return
    }
    if (touchPos.x - originPos.x > 0) {
      !!this.callbackRight ? this.callbackRight() : null
    } else {
      !!this.callbackLeft ? this.callbackLeft() : null
    }
    if (touchPos.y - originPos.y > 0) {
      !!this.callbackUp ? this.callbackUp() : null
    } else {
      !!this.callbackDown ? this.callbackDown() : null
    }
  }
}
