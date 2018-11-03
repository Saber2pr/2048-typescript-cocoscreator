/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:17 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 11:29:36
 */
import IData from './IData'
import { transformArray, visitArray, toInt } from './MathVec'
/**
 *矩阵合并算法
 *
 * @export
 * @class Data
 * @implements {IData}
 */
export default class Data implements IData {
  private constructor() {
    this.map = new Array<Array<number>>()
    this.logInfor = ''
  }
  static instance: Data
  static getInstance(): Data {
    this.instance = !!this.instance ? this.instance : new Data()
    return this.instance
  }
  private map: Array<Array<number>>
  private logInfor: string
  public init(size: number = 4): void {
    let raw: number = 0
    for (; raw < size; raw++) {
      this.map.push([0, 2, 2, 4])
      // let col: number = 0
      // for (; col < size; col++) {
      //   this.map[raw].push(0)
      // }
    }
  }

  get data(): number[][] {
    return this.map
  }

  public merge(method: string, arr: number[][] = this.map): number[][] {
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
    return this.map
  }

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

  public addRand(): void {
    visitArray(this.map, (raw, col) => {
      if (this.map[raw][col] === 0) {
        if (Boolean(Math.random() * 2)) {
          let randRaw = toInt(Math.random() * this.map.length)
          let randCol = toInt(Math.random() * this.map[randRaw].length)
          cc.log('rand', randRaw, randCol)
          this.map[randRaw].splice(randCol, 1, 2)
        }
      }
    })
  }

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
    console.log(this.map, this.logInfor)
  }
}
