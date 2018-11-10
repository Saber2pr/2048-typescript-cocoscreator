/*
 * @Author: AK-12
 * @Date: 2018-11-10 12:35:49
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-10 12:35:49
 */
/**
 *摄像机控制
 *
 * 单例类
 * @export
 * @class CameraManager
 */
export default class CameraManager {
  private constructor() {}
  static instance: CameraManager
  static getInstance(): CameraManager {
    this.instance = !!this.instance ? this.instance : new CameraManager()
    return this.instance
  }
  /**
   *摄像机节点
   *
   * @private
   * @type {cc.Node}
   * @memberof CameraManager
   */
  private _camera: cc.Node = null
  /**
   *摄像机所在场景资源
   *
   * @private
   * @type {cc.SceneAsset}
   * @memberof CameraManager
   */
  private scene: cc.SceneAsset
  /**
   *顺序节点列表
   *
   * @private
   * @type {Array<cc.Node>}
   * @memberof CameraManager
   */
  private layerList: Array<cc.Node> = null
  /**
   *节点列表长度
   *
   * @private
   * @type {number}
   * @memberof CameraManager
   */
  private _length: number
  /**
   *当前节点序号
   *
   * @private
   * @type {number}
   * @memberof CameraManager
   */
  private currentIndex: number = null
  /**
   *摄像机缩放比率
   *
   * @memberof CameraManager
   */
  set zoomRatio(value: number) {
    this.camera.zoomRatio = value
  }
  /**
   *上一个Layer节点
   *
   * @readonly
   * @type {cc.Node}
   * @memberof CameraManager
   */
  get LastLayer(): cc.Node {
    return this.layerList[this.currentIndex - 1]
  }
  /**
   *当前可视节点
   *
   * @readonly
   * @type {cc.Node}
   * @memberof CameraManager
   */
  get CurrentLayer(): cc.Node {
    return this.layerList[this.currentIndex]
  }
  /**
   *下一个Layer节点
   *
   * @readonly
   * @type {cc.Node}
   * @memberof CameraManager
   */
  get NextLayer(): cc.Node {
    return this.layerList[this.currentIndex + 1]
  }
  /**
   *获取摄像机组件
   *
   * @readonly
   * @type {cc.Camera}
   * @memberof CameraManager
   */
  get camera(): cc.Camera {
    return this._camera.getComponent(cc.Camera)
  }
  /**
   *摄像机所在场景名字
   *
   * @readonly
   * @type {string}
   * @memberof CameraManager
   */
  get sceneName(): string {
    return this.scene.name
  }
  /**
   *更新摄像机注视位置
   *
   * @private
   * @param {(camera: cc.Node, dpos: cc.Vec2) => void} [callback]
   * @memberof CameraManager
   */
  private update(callback?: (camera: cc.Node, dpos: cc.Vec2) => void): void {
    !!callback
      ? callback(this._camera, this.layerList[this.currentIndex].position)
      : (this._camera.position = this.layerList[this.currentIndex].position)
  }
  /**
   *初始化摄像机
   *
   * @param {cc.Node} _camera
   * @param {Array<cc.Node>} layerList
   * @param {cc.SceneAsset} scene
   * @memberof CameraManager
   */
  public initCamera(
    _camera: cc.Node,
    layerList: Array<cc.Node>,
    scene: cc.SceneAsset
  ) {
    this.currentIndex = 0
    this._length = layerList.length
    this.layerList = layerList
    this._camera = _camera
    this.scene = scene
  }
  /**
   *切换当前显示的节点，
   * @param -1: 后退
   * @param 0: 保持
   * @param 1: 前进
   *
   * @param {number} value
   * @param {(camera: cc.Node, dpos: cc.Vec2) => void} [callback] 是否自定义摄像机移动? go之后调用
   * @memberof CameraManager
   */
  public go(
    value: number,
    callback?: (camera: cc.Node, dpos: cc.Vec2) => void
  ): void {
    switch (value) {
      case -1:
        {
          if (this.currentIndex > 0) {
            this.currentIndex--
            this.update(callback)
          }
        }
        break
      case 0:
        this.update(callback)
        break
      case 1:
        {
          if (this.currentIndex < this._length - 1) {
            this.currentIndex++
            this.update(callback)
          }
        }
        break
      default:
        throw new Error('CameraManager go error')
    }
  }
  /**
   *重载所有layout,然后移动注视
   * @param -1: 后退
   * @param 0: 保持
   * @param 1: 前进
   *
   * @param {number} value
   * @param {Function} callback
   * @memberof CameraManager
   */
  public reload(value: number, callback?: Function): void {
    cc.director.loadScene(this.scene.name, () => {
      this.go(value)
      !!callback ? callback() : null
    })
  }
}
