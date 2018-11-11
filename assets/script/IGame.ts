/*
 * @Author: AK-12
 * @Date: 2018-11-11 19:41:52
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-11 21:22:53
 */
/**
 *边界数据结构
 *
 * @interface Edge
 */
export interface Edge {
  width: {
    start: number
    end: number
  }
  height: {
    start: number
    end: number
  }
}
/**
 *layout数据
 *
 * @export
 * @interface LayoutType
 */
export interface LayoutType {
  size: number
  num: number
  edgeScale: number
  blockScale: number
}
/**
 *game数据
 *
 * @interface layout
 */
export default interface Game {
  edge: Edge
  type: LayoutType[]
}
