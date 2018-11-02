/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:11 
 * @Last Modified by:   AK-12 
 * @Last Modified time: 2018-11-02 13:06:11 
 */
/**
 * 获取单例
 * @function getInstance
 * ***
 * 加载prefab缓存
 * @function initPool
 * ***
 * 获取cc.NodePool对象
 * @param BlockPool cc.NodePool
 * ***
 * @export
 * @class Model
 */
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
}
