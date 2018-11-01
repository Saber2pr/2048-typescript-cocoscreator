const { ccclass, property } = cc._decorator
import Block from './IBlock'
import TouchFront from './ITouchFront'

@ccclass
export default class TouchBlock {
  private block: Block
  private touchFront: TouchFront

  constructor(block: Block, touchFront: TouchFront) {
    this.block = block
    this.touchFront = touchFront
  }

  public load(): void {
    this.touchFront.submit(() => this.block.goLeft()).listen()
  }
}
