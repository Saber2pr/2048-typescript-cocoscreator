import TouchFront from './ITouchFront'
import Model from './Model'

export default class TouchBlock {
  private touchFront: TouchFront
  constructor(touchFront: TouchFront) {
    this.touchFront = touchFront
  }

  public load = (): void => {
    this.touchFront.submit(this.foo).listen()
  }

  foo() {}
}
