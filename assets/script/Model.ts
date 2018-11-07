/*
 * @Author: AK-12 
 * @Date: 2018-11-02 13:06:11 
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-07 17:41:37
 */
/**
 *对象池管理
 *
 * 单例类
 * @export
 * @class Model
 */
export default class Model {
  private constructor() {
    this._BlockPool = new cc.NodePool()
    this._nodeList = new Array<cc.Node>()
  }
  static instance: Model
  static getInstance(): Model {
    this.instance = !!this.instance ? this.instance : new Model()
    return this.instance
  }
  private _BlockPool: cc.NodePool
  private _prafab: cc.Prefab
  private _nodeList: cc.Node[]
  /**
   *加载prefab缓存
   *
   * @param {cc.Prefab} prefab
   * @param {number} size
   * @memberof Model
   */
  public initPool(prefab: cc.Prefab, size: number) {
    for (let i = 0; i < size; ++i) {
      let block = cc.instantiate(prefab)
      this._BlockPool.put(block)
    }
    this._prafab = prefab
  }
  /**
   *获取节点列表
   *
   * @readonly
   * @type {cc.Node[]}
   * @memberof Model
   */
  get NodeList(): cc.Node[] {
    return this._nodeList
  }
  /**
   *从缓存获取block节点
   *
   * @returns {cc.Node}
   * @memberof Model
   */
  public getBlock(): cc.Node {
    let block = null
    if (this._BlockPool.size() > 0) {
      block = this._BlockPool.get()
    } else {
      block = cc.instantiate(this._prafab)
    }
    return block
  }
  /**
   *保存节点引用
   *
   * @param {cc.Node} node
   * @memberof Model
   */
  public saveNode(node: cc.Node): void {
    this._nodeList.push(node)
  }
  /**
   *回收全部节点到缓存
   *
   * @memberof Model
   */
  public clearNodeList(): void {
    for (var node of this._nodeList) {
      this._BlockPool.put(node)
      this._nodeList = []
    }
  }
  /**
   *清空缓存
   *
   * @memberof Model
   */
  public ClearPool(): void {
    this._nodeList = []
    this._BlockPool.clear()
  }
}
