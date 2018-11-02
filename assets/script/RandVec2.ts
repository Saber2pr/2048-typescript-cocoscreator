import IRandVec2 from './IRandVec2'

export default class RandVec2 implements IRandVec2 {
  /**
   *Creates an instance of RandVec2.
   * @param {number} start 初值
   * @param {number} step 步长
   * @param {number} num 最大次数
   * @example let rand = new RandVec2(-150, 100, 4)
   * @memberof RandVec2
   */
  constructor(start: number, step: number, num: number) {
    this.start = start
    this.step = step
    this.num = num
  }
  private start: number
  private step: number
  private num: number
  public randPos(): cc.Vec2 {
    let rand =
      this.start + parseInt(String(Math.random() * this.num)) * this.step
    return cc.v2(rand, rand)
  }
  public randVaule(): number {
    return this.start + parseInt(String(Math.random() * this.num * this.step))
  }
  /**
   *cc.Vec2的基础运算
   *
   * @param {cc.Vec2} v1
   * @param {string} method
   * @param {cc.Vec2} v2
   * @returns {cc.Vec2}
   * @example computed(cc.v2(0, 0), '+', cc.v2(1, 1))
   * @memberof RandVec2
   */
  public computed(v1: cc.Vec2, method: string, v2: cc.Vec2): cc.Vec2 {
    let result
    switch (method) {
      case '+':
        result = cc.v2(v1.x + v2.x, v1.y + v2.y)
        break
      case '-':
        result = cc.v2(v1.x - v2.x, v1.y - v2.y)
        break
      case '*':
        result = cc.v2(v1.x * v2.x, v1.y * v2.y)
        break
      case '/':
        result = cc.v2(v1.x / v2.x, v1.y / v2.y)
        break

      default:
        throw new Error('computed method unknown')
    }
    return result
  }
}
