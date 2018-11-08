export default interface ITouchFront {
  /**
   *触摸方向执行对应回调
   *
   * @param {Function} [callbackLeft]
   * @param {Function} [callbackRight]
   * @param {Function} [callbackUp]
   * @param {Function} [callbackDown]
   * @returns {ITouchFront}
   * @memberof ITouchFront
   */
  submit(
    callbackLeft?: Function,
    callbackRight?: Function,
    callbackUp?: Function,
    callbackDown?: Function
  ): ITouchFront
  /**
   *监听触摸
   *
   * @memberof TouchFront
   */
  listen(): void
}
