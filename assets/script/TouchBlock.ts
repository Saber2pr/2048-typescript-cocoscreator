/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:00 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 23:08:19
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
    Data.getInstance().init()
  }
  private left = (): void => {
    Data.getInstance().merge('left')
    Data.getInstance().log()
    this.block.goLeft()
  }
  private right = (): void => {
    Data.getInstance().merge('right')
    Data.getInstance().log()
    this.block.goRight()
  }
  private up = (): void => {
    Data.getInstance().merge('up')
    Data.getInstance().log()
    this.block.goUp()
  }
  private down = (): void => {
    Data.getInstance().merge('down')
    Data.getInstance().log()
    this.block.goDown()
  }
}
