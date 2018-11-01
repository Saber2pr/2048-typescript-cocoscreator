export default class Model {
  private constructor() {
    this._BlockPool = new cc.NodePool()
  }
  static instance: Model
  static getInstance(): Model {
    this.instance = !!this.instance ? this.instance : new Model()
    return this.instance
  }
  private _BlockPool: cc.NodePool
  initPool(prefab: cc.Prefab, size: number) {
    for (let i = 0; i < size; ++i) {
      let block = cc.instantiate(prefab)
      this._BlockPool.put(block)
    }
  }
  get BlockPool(): cc.NodePool {
    return this._BlockPool
  }
  public clear(): void {
    this._BlockPool.clear()
  }
}
