/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:00 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-03 11:08:05
 */
import TouchFront from './ITouchFront'
import Block from './IBlock'
import Data from './Data'
/**
 *建立触摸与block之间关系
 *
 * @export
 * @class TouchBlock
 */
export default class TouchBlock {
  private touchFront: TouchFront
  private block: Block
  constructor(touchFront: TouchFront, block: Block) {
    this.touchFront = touchFront
    this.block = block
  }

  public load = (): void => {
    // 触摸手势回调
    this.touchFront.submit(this.left, this.right, this.up, this.down).listen()
  }
  private left = (): void => {
    Data.getInstance().merge('left')
    Data.getInstance().addRand()
    Data.getInstance().log()
    // this.block.goLeft()
    this.block.draw()
  }
  private right = (): void => {
    Data.getInstance().merge('right')
    Data.getInstance().addRand()
    Data.getInstance().log()
    // this.block.goRight()
    this.block.draw()
  }
  private up = (): void => {
    Data.getInstance().merge('up')
    Data.getInstance().addRand()
    Data.getInstance().log()
    // this.block.goUp()
    this.block.draw()
  }
  private down = (): void => {
    Data.getInstance().merge('down')
    Data.getInstance().addRand()
    Data.getInstance().log()
    // this.block.goDown()
    this.block.draw()
  }
}
