/*
 * @Author: AK-12
 * @Date: 2018-11-02 13:06:06
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-11 18:54:12
 */
export default interface ILayout {
  /**
   *初始化边界
   *
   * @param {{width: { start: number; end: number }
   *       height: { start: number; end: number }
   *     }} size
   * @param {number} [scale] 边界缩放
   * @returns {ILayout}
   * @memberof ILayout
   */
  initEdge(
    size: {
      width: { start: number; end: number }
      height: { start: number; end: number }
    },
    scale?: number
  ): ILayout
  /**
   *根据矩阵绘制block组
   *
   * @param {number[][]} data 矩阵数据
   * @memberof Layout
   */
  draw(data: number[][], step?: number): void
  /**
   *根据命令和偏移执行绘图动作
   *
   * @param {string} command
   * @param {number[][]} delta
   * @param {Function} callback 结束回调
   * @param {number} [speed]
   * @memberof Layout
   */
  action(
    command: string,
    delta: number[][],
    callback: Function,
    speed?: number
  ): void
  /**
   *设置block缩放
   *
   * @param {number} scale
   * @memberof ILayout
   */
  setBlockScale(scale: number): ILayout
}
