import config from '../config'
import Base from './Base'





export default class Creature extends Base {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (egg) {
    super()

    this.egg = egg
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  // Proxy `dnaMap` from the egg
  get dnaMap () {
    return this._egg.dnaMap
  }

  get egg () {
    return this._egg
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  // Proxy `dnaMap` to the egg
  set egg (value) {
    if (!this._egg) {
      Object.defineProperty(this, '_egg', {
        value: value
      })
    } else {
      throw new Error('egg may only be set once')
    }
  }

  set dnaMap (value) {
    this._egg.dnaMap = value
  }
}
