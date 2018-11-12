/*
 * @Author: AK-12
 * @Date: 2018-11-10 12:36:21
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-12 22:19:09
 */
import CameraManager from './CameraManager'
/**
 *场景切换动画管理
 *
 * 单例类
 * @export
 * @class SceneMediator
 */
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
        .then(
          ezaction
            .moveTo(movespeed, dpos)
            .easing(ezaction.ease.easeBackOut(1))
            .onStoped(onStoped)
        )
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
    movespeed: number = 1,
    callback?: Function
  ): void {
    this.go(
      1,
      () => {
        cc.Canvas.instance.node.RunAction(
          ezaction
            .scaleTo(scaleTospeed, { scale: scale })
            .easing(ezaction.ease.backEaseOut(1))
        )
      },
      scaleTospeed,
      movespeed,
      callback
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
      cc.Canvas.instance.node
        .RunAction(
          ezaction
            .scaleTo(scaleTospeed, { scale: 1 })
            .easing(ezaction.ease.backEaseOut(1))
        )
        .onStoped(callback)
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
  /**
   *重置canvas的缩放
   *
   * @param {number} testValue
   * @memberof SceneMediator
   */
  resetScale(testValue: number = 1) {
    cc.Canvas.instance.node.scale !== testValue
      ? cc.Canvas.instance.node.setScale(testValue)
      : null
  }
}
