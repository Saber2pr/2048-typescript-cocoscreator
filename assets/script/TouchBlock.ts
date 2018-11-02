/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:00 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-02 15:45:23
 */
import TouchFront from './ITouchFront'
import Block from './IBlock'
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
    this.touchFront
      .submit(
        this.block.goLeft,
        this.block.goRight,
        this.block.goUp,
        this.block.goDown
      )
      .listen()
  }
}
