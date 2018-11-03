/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:00 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 12:33:12
 */
import TouchFront from './ITouchFront'
import Layout from './ILayout'
import Data from './Data'
/**
 *建立触摸与block之间关系
 *
 * @export
 * @class TouchBlock
 */
export default class TouchBlock {
  private touchFront: TouchFront
  private layout: Layout
  constructor(touchFront: TouchFront, layout: Layout) {
    this.touchFront = touchFront
    this.layout = layout
  }

  public load = (): void => {
    // 触摸手势回调
    this.touchFront.submit(this.left, this.right, this.up, this.down).listen()
  }
  private left = (): void => {
    Data.getInstance().merge('left')
    Data.getInstance().addRand()
    Data.getInstance().log()
    // this.layout.goLeft()
    this.layout.draw()
  }
  private right = (): void => {
    Data.getInstance().merge('right')
    Data.getInstance().addRand()
    Data.getInstance().log()
    // this.layout.goRight()
    this.layout.draw()
  }
  private up = (): void => {
    Data.getInstance().merge('up')
    Data.getInstance().addRand()
    Data.getInstance().log()
    // this.layout.goUp()
    this.layout.draw()
  }
  private down = (): void => {
    Data.getInstance().merge('down')
    Data.getInstance().addRand()
    Data.getInstance().log()
    // this.layout.goDown()
    this.layout.draw()
  }
}
