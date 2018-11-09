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
   * @param {number} value 命令值
   * @param {Function} [onStart] 延时前回调
   * @param {number} [delay=0] 延时时长
   * @param {number} [movespeed=1] move动画速度
   * @param {Function} [onStoped] move结束回调
   * @memberof SceneMediator
   */
  go(
    value: number,
    onStart?: Function,
    delay: number = 0,
    movespeed: number = 1,
    onStoped?: Function
  ): void {
    CameraManager.getInstance().go(value, (camera, dpos) => {
      camera
        .RunAction(ezaction.moveBy(delay, cc.v2(0, 0)))
        .onStart(onStart)
        .then(ezaction.moveTo(movespeed, dpos).onStoped(onStoped))
    })
  }
  /**
   *layer前进
   *
   * @param {number} [scaleTospeed=1] 缩放动画速度
   * @param {number} [scale=0.9] 缩放动画幅度
   * @param {number} [movespeed=1] move动画速度
   * @memberof SceneMediator
   */
  goto(
    scaleTospeed: number = 1,
    scale: number = 0.9,
    movespeed: number = 1
  ): void {
    this.go(
      1,
      () => {
        cc.Canvas.instance.node.runAction(cc.scaleTo(scaleTospeed, scale))
      },
      scaleTospeed,
      movespeed
    )
  }
  /**
   *layer后退
   *
   * @param {number} [scaleTospeed=1] 缩放动画速度
   * @param {number} [movespeed=1] move动画速度
   * @param {Function} [callback] 结束回调
   * @memberof SceneMediator
   */
  backto(
    scaleTospeed: number = 1,
    movespeed: number = 1,
    callback?: Function
  ): void {
    this.go(-1, undefined, 0, movespeed, () => {
      cc.Canvas.instance.node.runAction(cc.scaleTo(scaleTospeed, 1))
      !!callback ? setTimeout(callback, scaleTospeed * 1000) : null
    })
  }
  /**
   *重载layer
   *
   * @memberof SceneMediator
   */
  reload() {
    let scale = cc.Canvas.instance.node.scale
    CameraManager.getInstance().reload(1, () => {
      cc.Canvas.instance.node.scale = scale
    })
  }
}
