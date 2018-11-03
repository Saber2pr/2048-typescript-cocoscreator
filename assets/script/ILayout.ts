/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:06 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 19:03:38
 */
export default interface ILayout {
  initEdge(size: {
    width: { start: number; end: number }
    height: { start: number; end: number }
  }): void
  draw(step?: number): void
  log(): void
}
