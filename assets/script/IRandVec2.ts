export default interface IRandVec2 {
  randPos(): cc.Vec2
  computed(v1: cc.Vec2, method: string, v2: cc.Vec2): cc.Vec2
}
