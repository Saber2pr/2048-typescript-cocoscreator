/*
 * @Author: AK-12
 * @Date: 2018-11-10 10:55:46
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-10 11:23:21
 */
import IScoreManager from './IScoreManager'
/**
 *管理分数动画
 *
 * 接口类
 * @export
 * @class ScoreManager
 * @implements {IScoreManager}
 */
export default class ScoreManager implements IScoreManager {
  private p_ori: cc.Vec2

  private score: cc.Label

  constructor(score: cc.Label) {
    this.score = score
    this.p_ori = this.score.node.children[0].position
    this.score.node.children[0].opacity = 0
    return this
  }

  public play(score: number) {
    this.score.node.children[0]
      .RunAction(this.action())
      .onStart(() => {
        this.score.node.children[0].opacity = 255
        this.score.node.children[0].getComponent(cc.Label).string =
          '+' + String(score)
      })
      .onStoped(() => {
        this.score.node.children[0].setPosition(this.p_ori)
        this.score.node.children[0].opacity = 0
      })
  }

  private action(): ezaction.HAction {
    return ezaction.sequence([
      ezaction.spawn([
        ezaction.moveBy(0.5, cc.v2(0, 10)),
        ezaction.fadeOut(0.5)
      ]),
      ezaction.fadeIn(0)
    ])
  }
}
