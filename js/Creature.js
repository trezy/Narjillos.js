import config from '../config'
import Base from './Base'





export default class Creature extends Base {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _generatePhenotype () {
    this.ui.mouth
    console.log(this.dnaMap.length)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (egg) {
    super()

    this.birthDate = new Date
    this.egg = egg

    this._generatePhenotype()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  // Proxy `dnaMap` from the egg
  get egg () {
    return this._egg
  }

  get dnaMap () {
    return this._egg.dnaMap
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  // Proxy `dnaMap` to the egg
  set dnaMap (value) {
    this._egg.dnaMap = value
  }

  set egg (value) {
    if (!this._egg) {
      Object.defineProperty(this, '_egg', {
        value: value
      })
    } else {
      throw new Error('egg may only be set once')
    }
  }
}
