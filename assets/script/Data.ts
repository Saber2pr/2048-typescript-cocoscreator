/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:17 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 20:31:56
 */
import IData from './IData'

export default class Data implements IData {
  private constructor() {
    this.map = new Array<Array<number>>()
  }
  static instance: Data
  static getInstance(): Data {
    this.instance = !!this.instance ? this.instance : new Data()
    return this.instance
  }
  public map: Array<Array<number>>
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

  public merge(arr: number[], method: string): number[] {
    return method === 'left' ? this.mergeLeft(arr) : this.mergeRight(arr)
  }

  private mergeLeft = (arr: number[]): number[] => {
    let i, nextI, m
    let len = arr.length
    for (i = 0; i < len; i++) {
      //先找nextI
      nextI = -1
      for (m = i + 1; m < len; m++) {
        if (arr[m] !== 0) {
          nextI = m
          break
        }
      }
      if (nextI !== -1) {
        //存在下个不为0的位置
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
      //先找nextI
      nextI = -1
      for (m = i - 1; m >= 0; m--) {
        if (arr[m] !== 0) {
          nextI = m
          break
        }
      }
      if (nextI !== -1) {
        //存在下个不为0的位置
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
}
