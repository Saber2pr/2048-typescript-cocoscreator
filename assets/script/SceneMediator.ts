import CameraManager from './CameraManager'

export default class SceneMediator {
  private constructor() {}
  static instance: SceneMediator
  static getInstance(): SceneMediator {
    this.instance = !!this.instance ? this.instance : new SceneMediator()
    return this.instance
  }
  /**
   *延时移动
   *
   * @param {number} value
   * @param {number} [delay=0]
   * @param {Function} [onStart]
   * @param {Function} [onStoped]
   * @param {number} [movespeed=1]
   * @memberof SceneMediator
   */
  go(
    value: number,
    delay: number = 0,
    onStart?: Function,
    onStoped?: Function,
    movespeed: number = 1
  ): void {
    CameraManager.getInstance().go(value, (camera, dpos) => {
      camera
        .RunAction(ezaction.moveBy(delay, cc.v2(0, 0)))
        .onStart(onStart)
        .then(ezaction.moveTo(movespeed, dpos).onStoped(onStoped))
    })
  }
  /**
   *
   *
   * @param {number} [delay=1]
   * @param {number} [scale=0.9]
   * @memberof SceneMediator
   */
  goto(delay: number = 1, scale: number = 0.9): void {
    this.go(1, delay, () => {
      cc.Canvas.instance.node.runAction(cc.scaleTo(1, scale))
    })
  }
  /**
   *
   *
   * @param {number} [speed=1] scaleTo speed
   * @param {Function} [callback]
   * @memberof SceneMediator
   */
  backto(speed: number = 1, callback?: Function): void {
    this.go(-1, 0, undefined, () => {
      cc.Canvas.instance.node.runAction(cc.scaleTo(speed, 1))
      !!callback ? setTimeout(callback, speed * 1000) : null
    })
  }
}
