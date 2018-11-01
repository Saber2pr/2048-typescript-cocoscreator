export default interface ITouchFront {
  submit(
    callbackLeft?: Function,
    callbackRight?: Function,
    callbackUp?: Function,
    callbackDown?: Function
  ): ITouchFront
  listen(): void
}
