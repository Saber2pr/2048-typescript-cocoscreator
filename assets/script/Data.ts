/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:17 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 22:50:11
 */
import IData from './IData'
import { transformArray } from './MathVec'
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

  public merge(method: string, arr: number[][] = this.map): number[] {
    let result
    switch (method) {
      case 'left':
        this.mergeSuper(arr, this.mergeLeft)
        this.logInfor += 'mergeLeft--'
        break
      case 'right':
        this.mergeSuper(arr, this.mergeRight)
        this.logInfor += 'mergeRight--'
        break
      case 'up':
        this.mergeSuper(transformArray(arr), this.mergeLeft)
        this.logInfor += 'mergeUp--'
        break
      case 'down':
        this.mergeSuper(transformArray(arr), this.mergeRight)
        this.logInfor += 'mergeDown--'
        break
      default:
        throw new Error('Data merge method error')
        break
    }
    return result
  }

  private mergeSuper = (arr: number[][], callback: Function): void => {
    for (var raw of arr) {
      callback(raw)
    }
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
  public log(): void {
    console.log(this.map, this.logInfor)
  }
}
