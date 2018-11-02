/*
 * @Author: AK-12 
 * @Date: 2018-11-02 17:06:17 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 17:43:49
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
  getData(arr: []) {
    //遍历数组从数组的的当前位置的下一个开始遍历，找不是0的位置()
    // 如果没找到什么也不做
    // 如果找到
    //如果当前位置是0，那么像当前位置与下一个进行互换（当前位置获得下一个位置的数据，并且将下一个位置数据置为0，将下标减一）
    //如果当前位置和下一个位置相等，将当前位置数据*2，下个位置数据置0
    var i, nextI, len, m
    len = arr.length
    for (i = 0; i < len; i += 1) {
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
}
