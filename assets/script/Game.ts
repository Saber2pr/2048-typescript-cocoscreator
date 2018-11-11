/*
 * @Author: AK-12
 * @Date: 2018-11-11 19:41:48
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-11 22:16:38
 */
import Game from './IGame'
/**
 * layout数据
 */
let game: Game = {
  edge: {
    width: {
      start: -150,
      end: 150
    },
    height: {
      start: -150,
      end: 150
    }
  },
  type: [
    {
      size: 3,
      num: 3 * 3,
      edgeScale: 0.9,
      blockScale: 1.1
    },
    {
      size: 4,
      num: 4 * 4,
      edgeScale: 1,
      blockScale: 1
    },
    {
      size: 8,
      num: 8 * 8,
      edgeScale: 1.1,
      blockScale: 0.5
    }
  ]
}
export default game
