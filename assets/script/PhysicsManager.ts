/*
 * @Author: AK-12 
 * @Date: 2018-11-01 12:51:35 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-01 13:26:53
 */
export default class PhysicsManager {
  static instance: PhysicsManager
  private constructor() {}
  static getInstance(): PhysicsManager {
    this.instance = !!this.instance ? this.instance : new PhysicsManager()
    return this.instance
  }
  public enabled(bool: boolean): PhysicsManager {
    cc.director.getPhysicsManager().enabled = bool
    return PhysicsManager.instance
  }
  public gravity(vec2: cc.Vec2): PhysicsManager {
    cc.director.getPhysicsManager().gravity = vec2
    return PhysicsManager.instance
  }
}
