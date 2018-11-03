/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 11:16:12
 */
import IMathVec from './IMathVec'

export default class MathVec implements IMathVec {
  /**
   *Creates an instance of MathVec.
   * @param {number} start 初值
   * @param {number} step 步长
   * @param {number} num 最大次数
   * @example let rand = new MathVec(-150, 100, 4)
   * @memberof MathVec
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
   * @memberof MathVec
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

export let transformArray: <Type>(
  arr: Type[][]
) => Type[][] = function transformArray<Type>(arr: Type[][]): Type[][] {
  let newArray: Array<Array<Type>> = new Array<Array<Type>>()
  let raws = arr.length
  let raw = 0
  for (; raw < raws; raw++) {
    newArray.push([])
    let col = 0
    let cols = arr[raw].length
    for (; col < cols; col++) {
      newArray[raw][col] = arr[col][raw]
    }
  }
  return newArray
}

export let visitArray: <Type>(
  arr: Type[][],
  callback: (raw: number, col: number) => void
) => void = function visitArray<Type>(
  arr: Type[][],
  callback: (raw: number, col: number) => void
) {
  let raws = arr.length
  let raw = 0
  for (; raw < raws; raw++) {
    let cols = arr[raw].length
    let col = 0
    for (; col < cols; col++) {
      callback(raw, col)
    }
  }
}

export function toInt(value) {
  return parseInt(String(value))
}
