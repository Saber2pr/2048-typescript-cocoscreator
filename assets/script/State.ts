/*
 * @Author: AK-12
 * @Date: 2018-11-11 21:08:26
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-11 22:47:57
 */

/**
 *状态管理
 *
 * 单例类
 * @export
 * @class State
 */
export default class State {
  private constructor() {}
  private static instance: State
  static getInstance(): State {
    this.instance = !!this.instance ? this.instance : new State()
    return this.instance
  }
  private _layoutTypeIndex: number = 0
  private _bestScore: number = 0
  /**
   *layout类型
   *
   * @readonly
   * @memberof State
   */
  get layoutTypeIndex() {
    return this._layoutTypeIndex
  }
  set layoutTypeIndex(value: number) {
    this._layoutTypeIndex = value
  }
  /**
   *最高分
   *
   * @memberof State
   */
  get bestScore() {
    return this._bestScore
  }
  set bestScore(value: number) {
    this._bestScore = value
  }
}
