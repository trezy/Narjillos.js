import config from '../config'
import DNA from './DNA'





export default class Egg {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _generatePosition (maxX, maxY) {
    return this.position = {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    }
  }

  _hatch () {
    console.log('Hatched', this)
    let text = document.createSVGElement('text')
    text.innerHTML = `Hatched! My ID is ${this.id}.`
    this.group.appendChild(text)
  }

  _numgen (value, min, max) {
    max = parseInt(max)
    min = parseInt(min)
    value = parseInt(value)

    return (parseInt(value) * 0.001) * (max - min) + min
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (maxX, maxY) {
    this._generatePosition(maxX, maxY)

    this.group = document.createSVGElement('g')
    this.group.classList.add('egg')
    this.group.setAttribute('id', this.id)
    this.group.setAttribute('transform', `translate(${this.position.x},${this.position.y})`)

    this.shape = document.createSVGElement('circle')
    this.shape.setAttribute('fill', 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')')
    this.shape.setAttribute('r', this.radius)

    this.details = document.createSVGElement('title')
    this.details.innerHTML = this.genes.join(', ')

    this.group.appendChild(this.details)
    this.group.appendChild(this.shape)

    // Begin gestation
    this.gestation = setTimeout(this._hatch.bind(this), this.gestationPeriod)

    return this
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  // Proxy `color` from the prime DNA
  get color () {
    if (!this._color) {
      Object.defineProperty(this, '_color', {
        value: this.prime.color
      })
    }

    return this._color
  }

  get dnaMap () {
    if (!this._dnaMap) {
      Object.defineProperty(this, '_dnaMap', {
        value: []
      })

      for (let i = 0; i < config.egg.DNA.max; i++) {
        this._dnaMap.push(new DNA)
      }
    }

    return this._dnaMap
  }

  // Proxy `genes` from the prime DNA
  get genes () {
    if (!this._genes) {
      Object.defineProperty(this, '_genes', {
        value: this.prime.genes
      })
    }

    return this._genes
  }

  get gestationPeriod () {
    if (!this._gestationPeriod) {
      Object.defineProperty(this, '_gestationPeriod', {
        value: this._numgen(this.prime.gestationPeriod, config.egg.gestation.min, config.egg.gestation.max)
      })
    }

    return this._gestationPeriod
  }

  get id () {
    if (!this._id) {
      Object.defineProperty(this, '_id', {
        value: (Date.now() + parseInt(this.genes.join(''))).toString(36)
      })
    }

    return this._id
  }

  get position () {
    if (!this._position) {
      throw new Error('Must run _generatePosition() before attempting to access position')
    }

    return this._position
  }

  get prime () {
    if (!this._prime) {
      Object.defineProperty(this, '_prime', {
        value: this.dnaMap[(Math.random() * (this.dnaMap.length - 1)).toFixed()]
      })
    }

    return this._prime
  }

  get radius () {
    if (!this._radius) {
      Object.defineProperty(this, '_radius', {
        value: this._numgen(this.prime.size, config.egg.radius.min, config.egg.radius.max)
      })
    }

    return this._radius
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set color (value) {
    throw new Error('Cannot set color')
  }

  set dnaMap (value) {
    throw new Error('Cannot set dnaMap')
  }

  set genes (value) {
    throw new Error('Cannot set genes')
  }

  set gestationPeriod (value) {
    throw new Error('Cannot set gestationPeriod')
  }

  set id (value) {
    throw new Error('Cannot set ID')
  }

  set position (value) {
    Object.defineProperty(this, '_position', {
      value: value
    })
  }

  set prime (value) {
    throw new Error('Cannot set prime')
  }

  set radius (value) {
    Object.defineProperty(this, '_radius', {
      value: value
    })
  }
}
