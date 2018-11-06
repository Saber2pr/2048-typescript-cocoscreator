/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:29 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-04 13:15:51
 */
import IMathVec, { Point } from './IMathVec'

/**
 *获取随机直角坐标点
 *
 * @export
 * @class MathVec
 * @implements {IMathVec}
 */
export default class MathVec implements IMathVec {
  /**
   *Creates an instance of MathVec.
   * @param {number} start 初值
   * @param {number} step 步长
   * @param {number} num 最大阶数
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
}
/**
 *矩阵行列互换
 *
 * @export
 * @template Type
 * @param {Type[][]} arr
 * @returns {Type[][]}
 */
export function transformArray<Type>(arr: Type[][]): Type[][] {
  let newArray: Array<Array<Type>> = new Array<Array<Type>>()
  let raws = arr.length
  for (let raw = 0; raw < raws; raw++) {
    newArray.push([])
    let cols = arr[raw].length
    for (let col = 0; col < cols; col++) {
      newArray[raw][col] = arr[col][raw]
    }
  }
  return newArray
}
/**
 *遍历二维数组元素
 *
 * @export
 * @template Type
 * @param {Type[][]} arr
 * @param {(raw: number, col: number) => void} callback
 */
export function visitArray<Type>(
  arr: Type[][],
  callback: (raw: number, col: number) => void
) {
  let raws = arr.length
  for (let raw = 0; raw < raws; raw++) {
    let cols = arr[raw].length
    for (let col = 0; col < cols; col++) {
      callback(raw, col)
    }
  }
}
/**
 *随机访问二维数组元素
 *
 * @export
 * @template Type
 * @param {Type[][]} arr
 * @param {(raw: number, col: number) => void} callback
 */
export function visitArrayRand<Type>(
  arr: Type[][],
  callback: (raw: number, col: number) => void
) {
  let randRow = toInt(Math.random() * arr.length)
  let randCol = toInt(Math.random() * arr[randRow].length)
  callback(randRow, randCol)
}
/**
 *多次执行回调函数
 *
 * @export
 * @param {Function} callback
 * @param {number} [times=1] 执行次数
 */
export function moreFunc(callback: Function, times: number = 1): void {
  let count = 0
  let loop = (): void => {
    if (count >= times) {
      return
    }
    count++
    callback()
    loop()
  }
  loop()
}
/**
 *转为整型
 *
 * @export
 * @param {*} value
 * @returns
 */
export function toInt(value) {
  return parseInt(String(value))
}
/**
 *随机概率执行函数
 *
 * @export
 * @param {Function} callback
 * @param {number} [value=1.5] 值越大执行回调概率越大
 */
export function randFunc(callback: Function, value: number = 1.5): void {
  let rand = Boolean(toInt(Math.random() * value))
  if (rand) {
    callback(rand)
  }
}
/**
 *替换二维数组指定位置的值
 *
 * @export
 * @template Type
 * @param {Type[][]} arr
 * @param
 *   { raw: number
 *     col: number
 *   } pos
 * @param {*} value
 */
export function alterArray<Type>(
  arr: Type[][],
  pos: {
    /**
     *替换的元素所在行
     *
     * @type {number}
     */
    raw: number
    /**
     *替换的元素所在列
     *
     * @type {number}
     */
    col: number
    /**
     *替换后的值
     *
     * @type {*}
     */
    value: Type
  }
) {
  // arr[pos.raw].splice(pos.col, 1, pos.value)
  arr[pos.raw][pos.col] = pos.value
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
export function computed(v1: cc.Vec2, method: string, v2: cc.Vec2): cc.Vec2 {
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
/**
 *PointList得到二维坐标容器
 *
 * @export
 * @returns {Array<Point>}
 */
export function PointList(): Array<Point> {
  return new Array<Point>()
}
/**
 *判断两个点是否相等
 *
 * @export
 * @param {Point} pos1
 * @param {Point} pos2
 * @returns {boolean}
 */
export function judgePos(pos1: Point, pos2: Point): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y ? true : false
}
/**
 *得到填充数组
 *
 * @export
 * @template Type
 * @param {Type} value
 * @param {number} [length=1]
 * @returns {Type[]}
 */
export function fillArray<Type>(value: Type, length: number = 1): Type[] {
  let arr = new Array<Type>()
  for (let i = 0; i < length; i++) {
    arr.push(value)
  }
  return arr
}
/**
 *得到填充二维数组
 *
 * @export
 * @template Type
 * @param {Type} value
 * @param {{ raw: number; col: number }} size
 * @returns {Type[][]}
 */
export function fillArraySuper<Type>(
  value: Type,
  size: { raw: number; col: number }
): Type[][] {
  let arr = new Array<Array<Type>>()
  for (let raw = 0; raw < size.raw; raw++) {
    arr.push([])
    for (let col = 0; col < size.col; col++) {
      arr[raw][col] = value
    }
  }
  return arr
}
