/*
 * @Author: AK-12
 * @Date: 2018-11-02 13:06:11
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-12 22:44:19
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
    this._layoutCache = new cc.NodePool()
    this._nodeList = new Array<cc.Node>()
  }
  static instance: Model
  static getInstance(): Model {
    this.instance = !!this.instance ? this.instance : new Model()
    return this.instance
  }
  /**
   *对象池
   *
   * @private
   * @type {cc.NodePool}
   * @memberof Model
   */
  private _BlockPool: cc.NodePool
  /**
   *保留预置资源引用
   *
   * @private
   * @type {cc.Prefab}
   * @memberof Model
   */
  private _prafab: cc.Prefab
  /**
   *节点引用组
   *
   * @private
   * @type {cc.Node[]}
   * @memberof Model
   */
  private _nodeList: cc.Node[]
  /**
   *layer引用
   *
   * @private
   * @type {cc.Node}
   * @memberof Model
   */
  private _playLayer: cc.Node
  /**
   *预制窗口缓存
   *
   * @private
   * @type {cc.Node}
   * @memberof Model
   */
  private _layoutCache: cc.NodePool
  /**
   *加载prefab缓存
   *
   * @param {cc.Prefab} prefab
   * @param {number} size
   * @memberof Model
   */
  public initPool(prefab: cc.Prefab, size: number): Model {
    for (let i = 0; i < size; ++i) {
      let block = cc.instantiate(prefab)
      this._BlockPool.put(block)
    }
    this._prafab = prefab
    return this
  }
  /**
   *加载预制窗口缓存, 只保存一个实例
   *
   * @param {cc.Prefab} prefab
   * @returns {Model}
   * @memberof Model
   */
  public initPreLayout(prefab: cc.Prefab): Model {
    let layout = cc.instantiate(prefab)
    this._layoutCache.put(layout)
    return this
  }
  /**
   *获取预制窗口
   *
   * @readonly
   * @type {cc.Node}
   * @memberof Model
   */
  public getPreLayout(): cc.Node {
    if (this._layoutCache.size() > 0) {
      return this._layoutCache.get()
    } else {
      return null
    }
  }
  /**
   *返还预制窗口
   *
   * @param {cc.Node} node
   * @memberof Model
   */
  public returnPreLayout(node: cc.Node): void {
    this._layoutCache.put(node)
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
   *获取layer引用
   *
   * @returns {cc.Node}
   * @memberof Model
   */
  public getLayerNode(): cc.Node {
    return this._playLayer
  }
  /**
   *保存layer引用
   *
   * @param {cc.Node} layer
   * @memberof Model
   */
  public saveLayerNode(layer: cc.Node): void {
    this._playLayer = layer
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
    this._layoutCache.clear()
    this._playLayer.destroy()
  }
}
