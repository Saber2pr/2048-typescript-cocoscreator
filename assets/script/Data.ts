/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:17 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 19:07:57
 */
import {
  transformArray,
  visitArray,
  visitArrayRand,
  alterArray,
  moreFunc,
  toInt,
  PointList
} from './MathVec'
/**
 *矩阵合并算法
 *
 * @export
 * @class Data
 */
export default class Data {
  private constructor() {
    this.map = new Array<Array<number>>()
    this.logInfor = ''
    this.updateTimes = 0
  }
  static instance: Data
  static getInstance(): Data {
    this.instance = !!this.instance ? this.instance : new Data()
    return this.instance
  }
  private map: Array<Array<number>>
  private logInfor: string
  private updateTimes: number
  /**
   *初始化数据
   *
   * @param {number} [size=4]
   * @memberof Data
   */
  public init(size: number = 4): void {
    let raw: number = 0
    for (; raw < size; raw++) {
      this.map.push([0, 0, 0, 0])
    }
    moreFunc(() => {
      visitArrayRand(this.map, (raw, col) => {
        alterArray(
          this.map,
          {
            raw: raw,
            col: col
          },
          2
        )
      })
    }, 2)
  }
  /**
   *获取当前矩阵
   *
   * @readonly
   * @type {number[][]}
   * @memberof Data
   */
  get data(): number[][] {
    return this.map
  }
  /**
   *获取分数
   *
   * @readonly
   * @type {number}
   * @memberof Data
   */
  get score(): number {
    return this.updateTimes
  }

  /**
   *合并方向
   *
   * @param {string} method
   * @param {number[][]} [arr=this.map]
   * @memberof Data
   */
  public merge(method: string, arr: number[][] = this.map): void {
    switch (method) {
      case 'left':
        this.map = this.mergeSuper(arr, this.mergeLeft)
        this.logInfor += 'mergeLeft--'
        break
      case 'right':
        this.map = this.mergeSuper(arr, this.mergeRight)
        this.logInfor += 'mergeRight--'
        break
      case 'up':
        this.map = this.mergeSuper(transformArray(arr), this.mergeLeft)
        this.map = transformArray(this.map)
        this.logInfor += 'mergeUp--'
        break
      case 'down':
        this.map = this.mergeSuper(transformArray(arr), this.mergeRight)
        this.map = transformArray(this.map)
        this.logInfor += 'mergeDown--'
        break
      default:
        throw new Error('Data merge method error')
        break
    }
    this.logInfor = this.logInfor.length > 50 ? '' : this.logInfor
  }
  /**
   *反转回调处理矩阵
   *
   * @private
   * @memberof Data
   */
  private mergeSuper = (
    arr: number[][],
    callback: (arr: number[]) => number[]
  ): number[][] => {
    let newArray: Array<Array<number>> = new Array<Array<number>>()
    for (var raw of arr) {
      newArray.push(callback(raw))
    }
    return newArray
  }
  /**
   *随机位置添加元素
   *
   * @returns {boolean} 返回true, 若没有空位则返回false
   * @memberof Data
   */
  public addRand(): boolean {
    let hasNext = false
    let points = PointList()
    visitArray(this.map, (raw, col) => {
      if (this.map[raw][col] === 0) {
        points.push({ x: raw, y: col })
        hasNext = true
      }
      this.updateTimes += 2
    })
    if (hasNext) {
      let index = toInt(Math.random() * points.length)
      alterArray(
        this.map,
        {
          raw: points[index].x,
          col: points[index].y
        },
        2
      )
    }
    return hasNext
  }
  /**
   *向左合并
   *
   * @private
   * @memberof Data
   */
  private mergeLeft = (arr: number[]): number[] => {
    let i, nextI, m
    let len = arr.length
    for (i = 0; i < len; i++) {
      nextI = -1
      for (m = i + 1; m < len; m++) {
        if (arr[m] !== 0) {
          nextI = m
          break
        }
      }
      if (nextI !== -1) {
        if (arr[i] === 0) {
          arr[i] = arr[nextI]
          arr[nextI] = 0
          i -= 1
        } else if (arr[i] === arr[nextI]) {
          arr[i] = arr[i] * 2
          arr[nextI] = 0
        }
      }
    }
    return arr
  }
  /**
   *向右合并
   *
   * @private
   * @memberof Data
   */
  private mergeRight = (arr: number[]): number[] => {
    let i, nextI, m
    let len = arr.length
    for (i = len - 1; i >= 0; i--) {
      nextI = -1
      for (m = i - 1; m >= 0; m--) {
        if (arr[m] !== 0) {
          nextI = m
          break
        }
      }
      if (nextI !== -1) {
        if (arr[i] === 0) {
          arr[i] = arr[nextI]
          arr[nextI] = 0
          i -= 1
        } else if (arr[i] === arr[nextI]) {
          arr[i] = arr[i] * 2
          arr[nextI] = 0
        }
      }
    }
    return arr
  }
  /**
   *输出调试信息
   *
   * @memberof Data
   */
  public log(): void {
    console.log(this.map, this.logInfor, this.updateTimes)
  }
}
