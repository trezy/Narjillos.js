import EventEmitter from 'events'





export default class Base extends EventEmitter {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  // Calculate the position between `min` and `max` for `value`
  // Set returnFixed to `true` to remove decimals
  _numGen (value, min, max, returnFixed = false) {
    max = parseInt(max)
    min = parseInt(min)
    value = parseInt(value)

    if (value >= 1) {
      value = value * 0.01
    }

    let num = value * (max - min) + min

    if (returnFixed) {
      num = num.toFixed()
    }

    return num
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()
    
    this.destroyExceptions = []
  }
  
  // Delete all ui elements
  destroy () {
    if (this.ui) {    
      Object.keys(this.ui).forEach(function (key) {
        if (!this._destroyExceptions || this._destroyExceptions.indexOf(key) === -1) {
          let element = this.ui[key]
          element.parentNode.removeChild(element)
        }
      }, this)
    }
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get destroyExceptions () {
    if (!this._destroyExceptions && this._destroyExceptions !== undefined) {
      Object.defineProperty(this, '_destroyExceptions', {
        value: []
      })
    }

    return this._destroyExceptions
  }

  get ui () {
    if (!this._ui && this._ui !== undefined) {
      Object.defineProperty(this, '_ui', {
        value: {}
      })
    }

    return this._ui
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set destroyExceptions (value) {
    if (!Array.isArray(value)) {
      throw new Error('destroyExceptions must be an array')
    } else {
      this._destroyExceptions = value
    }
  }

  set ui (value) {
    if (typeof value === 'object') {
      let keys = Object.keys(value)

      for (let i = 0; i < keys.length; i++) {
        let isHTMLElement = value[keys[i]] instanceof HTMLElement
        let isSVGElement = value[keys[i]] instanceof SVGElement


        if (!isHTMLElement && !isSVGElement) {
          throw new Error('all elements in ui must be DOM nodes')
        }
      }

      this._ui = value
    } else {
      throw new Error('ui must be an hash of DOM nodes')
    }
  }
}
