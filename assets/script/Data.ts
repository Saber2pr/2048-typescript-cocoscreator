/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:17 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-06 17:42:54
 */
import {
  transformArray,
  visitArray,
  visitArrayRand,
  alterArray,
  moreFunc,
  toInt,
  PointList,
  fillArraySuper,
  fillArray
} from './MathVec'
/**
 *一维数组与合并偏差
 *
 * @interface ArrAndDelta
 */
interface ArrAndDelta {
  arr: number[]
  delta: number[]
}
/**
 *二维数组与合并偏差
 *
 * @interface MapAndDelta
 */
interface MapAndDelta {
  map: number[][]
  delta: number[][]
}
/**
 *矩阵合并算法
 *
 * @export
 * @class Data
 */
export default class Data {
  private constructor() {}
  static instance: Data
  static getInstance(): Data {
    this.instance = !!this.instance ? this.instance : new Data()
    return this.instance
  }
  private map: Array<Array<number>>
  private __map: Array<Array<number>>
  private updateTimes: number
  private maxValue: number
  private hasNext: boolean
  /**
   *初始化矩阵数据
   *
   * @param {number} size 方阵边长
   * @param {number} [maxValue=2048] 数字最大值
   * @memberof Data
   */
  public init(size: number, maxValue: number = 2048): Data {
    this.updateTimes = 0
    this.maxValue = maxValue
    this.map = fillArraySuper(0, {
      raw: size,
      col: size
    })
    this.__map = fillArraySuper(0, {
      raw: size,
      col: size
    })
    return this
  }
  /**
   *当前矩阵
   *
   * @readonly
   * @type {number[][]}
   * @memberof Data
   */
  get data(): number[][] {
    return this.map
  }
  /**
   *分数
   *
   * @readonly
   * @type {number}
   * @memberof Data
   */
  get score(): number {
    return this.updateTimes
  }
  /**
   *最大值
   *
   * @readonly
   * @type {number}
   * @memberof Data
   */
  get MaxValue(): number {
    return this.maxValue
  }
  /**
   *检测数据是否变动
   *
   * @readonly
   * @type {boolean}
   * @memberof Data
   */
  get isChanged(): boolean {
    return this.__map.toString() !== this.map.toString()
  }
  /**
   *获取updateTimes状态
   *
   * @readonly
   * @type {boolean} 数字超过maxValue则返回true
   * @memberof Data
   */
  get result(): boolean {
    return Boolean(Math.abs(this.updateTimes) % 2)
  }
  /**
   *合并方向, 返回合并偏差二维数组
   *
   * @param {string} method
   * @param {number[][]} [arr=this.map]
   * @returns {Array<Array<number>>}
   * @memberof Data
   */
  public merge(
    method: string,
    arr: number[][] = this.map
  ): Array<Array<number>> {
    visitArray(this.map, (raw, col) => {
      this.__map[raw][col] = this.map[raw][col]
    })
    let delta: Array<Array<number>>
    switch (method) {
      case 'left':
        {
          let mapAndDelta = this.mergeSuper(arr, this.mergeLeft)
          this.map = mapAndDelta.map
          delta = mapAndDelta.delta
        }
        break
      case 'right':
        {
          let mapAndDelta = this.mergeSuper(arr, this.mergeRight)
          this.map = mapAndDelta.map
          delta = mapAndDelta.delta
        }
        break
      case 'up':
        {
          let mapAndDelta = this.mergeSuper(transformArray(arr), this.mergeLeft)
          delta = transformArray(mapAndDelta.delta)
          this.map = transformArray(mapAndDelta.map)
        }
        break
      case 'down':
        {
          let mapAndDelta = this.mergeSuper(
            transformArray(arr),
            this.mergeRight
          )
          delta = transformArray(mapAndDelta.delta)
          this.map = transformArray(mapAndDelta.map)
        }
        break
      default:
        throw new Error('Data merge method error')
    }
    return delta
  }
  /**
   *反转回调处理矩阵
   *
   * @private
   * @memberof Data
   */
  private mergeSuper = (
    arr: number[][],
    callback: (arr: number[]) => ArrAndDelta
  ): MapAndDelta => {
    let map: Array<Array<number>> = new Array<Array<number>>()
    let delta: Array<Array<number>> = new Array<Array<number>>()
    for (var raw of arr) {
      let arrAndDelta = callback(raw)
      map.push(arrAndDelta.arr)
      delta.push(arrAndDelta.delta)
    }
    return {
      map: map,
      delta: delta
    }
  }
  /**
   *检测矩阵数字是否都不为0
   *
   * @readonly
   * @type {boolean}
   * @memberof Data
   */
  get isFull(): boolean {
    this.hasNext = false
    visitArray(this.map, (raw, col) => {
      if (this.map[raw][col] === 0) {
        this.hasNext = true
      }
    })
    return !this.hasNext
  }
  /**
   *随机位置添加元素
   *
   * @param {number} [times=1]
   * @returns {boolean} 返回true, 若没有空位则返回false
   * @memberof Data
   */
  public addRand(times: number = 1): boolean {
    let points = PointList()
    moreFunc(() => {
      visitArray(this.map, (raw, col) => {
        if (this.map[raw][col] === 0) {
          points.push({ x: raw, y: col })
          this.hasNext = true
        }
      })
      if (this.hasNext) {
        let index = toInt(Math.random() * points.length)
        alterArray(this.map, {
          raw: points[index].x,
          col: points[index].y,
          value: 2
        })
      }
    }, times)
    return this.hasNext
  }
  /**
   *向左合并
   *
   * @private
   * @memberof Data
   */
  private mergeLeft = (arr: number[]): ArrAndDelta => {
    let i, nextI, m
    let len = arr.length
    let delta = fillArray(0, arr.length)
    for (i = 0; i < len; i++) {
      nextI = -1
      for (m = i + 1; m < len; m++) {
        if (arr[m] !== 0) {
          nextI = m
          if (arr[i] === arr[m]) {
            delta[m] = m - i
          } else {
            if (arr[i] === 0) {
              delta[m] = m - i
            } else {
              delta[m] = m - i - 1
            }
          }
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
          this.updateTimes =
            arr[i] < this.maxValue
              ? this.updateTimes + arr[i]
              : this.updateTimes + 1
          arr[nextI] = 0
        }
      }
    }
    return {
      arr: arr,
      delta: delta
    }
  }
  /**
   *向右合并
   *
   * @private
   * @memberof Data
   */
  private mergeRight = (arr: number[]): ArrAndDelta => {
    let i, nextI, m
    let len = arr.length
    let delta = fillArray(0, arr.length)
    for (i = len - 1; i >= 0; i--) {
      nextI = -1
      for (m = i - 1; m >= 0; m--) {
        if (arr[m] !== 0) {
          nextI = m
          if (arr[m] === arr[i]) {
            delta[m] = i - m
          } else {
            if (arr[i] === 0) {
              delta[m] = i - m
            } else {
              delta[m] = i - m - 1
            }
          }
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
          this.updateTimes =
            arr[i] < this.maxValue
              ? this.updateTimes + arr[i]
              : this.updateTimes + 1
          arr[nextI] = 0
        }
      }
    }
    return {
      arr: arr,
      delta: delta
    }
  }
}
