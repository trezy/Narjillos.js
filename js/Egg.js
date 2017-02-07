import config from '../config'
import Base from './Base'
import Creature from './Creature'
import DNA from './DNA'





export default class Egg extends Base {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _consume () {
    this.emit('consume')

    if (this.energy) {
      this.energy = this.energy - 1

    } else {
      this._die()
    }
  }

  _destroy () {
    if (this.consumption) {
      clearInterval(this.consumption)
    }

    if (this.gestation) {
      clearTimeout(this.gestation)
    }
  }

  _die () {
    this.emit('death', this)

    this._destroy()
  }

  _generatePosition (maxX, maxY) {
    return this.position = {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    }
  }

  _hatch () {
    this._destroy()
    new Creature(this)
    this.emit('hatch', this)
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (maxX, maxY) {
    super()

    this._generatePosition(maxX, maxY)

    this.ui = {
      details: document.createSVGElement('title'),
      group: document.createSVGElement('g'),
      shape: document.createSVGElement('circle'),
      tooltip: document.createElement('div')
    }

    this.ui.group.classList.add('egg')
    this.ui.group.setAttribute('id', this.id)
    this.ui.group.setAttribute('transform', `translate(${this.position.x},${this.position.y})`)

    this.ui.shape.setAttribute('fill', 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')')
    this.ui.shape.setAttribute('r', this.size)

    this.dnaMap.forEach(function (dna) {
      if (this.ui.details.innerHTML !== '') {
        this.ui.details.innerHTML += ' | '
      }

      this.ui.details.innerHTML += dna.genes.join(', ')
    }, this)

    this.ui.group.appendChild(this.ui.details)
    this.ui.group.appendChild(this.ui.shape)
    this.ui.group.appendChild(this.ui.tooltip)

    this.gestation = setTimeout(this._hatch.bind(this), this.gestationPeriod)
    this.consumption = setInterval(this._consume.bind(this), this.consumptionRate)

    return this
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  // Proxy `color` from the prime DNA
  get color () {
    return this.prime.color
  }

  // Proxy `size` from the prime DNA
  // This may need adjusting
  get consumptionRate () {
    return this.size * 10
  }

  get dnaMap () {
    if (!this._dnaMap && this._dnaMap === undefined) {
      let dnaCount = this._numGen(Math.random() * 100, config.egg.DNA.min, config.egg.DNA.max, true)

      Object.defineProperty(this, '_dnaMap', {
        value: []
      })

      for (let i = 0; i < dnaCount; i++) {
        this._dnaMap.push(new DNA)
      }
    }

    return this._dnaMap
  }

  // Proxy `energy` from the prime DNA
  get energy () {
    if (!this._energy && this._energy === undefined) {
      Object.defineProperty(this, '_energy', {
        value: this.prime.energy,
        writable: true
      })
    }

    return this._energy
  }

  // Proxy `genes` from the prime DNA
  get genes () {
    return this.prime.genes
  }

  get gestationPeriod () {
    if (!this._gestationPeriod && this._gestationPeriod === undefined) {
      Object.defineProperty(this, '_gestationPeriod', {
        value: this._numGen(this.prime.gestationPeriod, config.egg.gestation.min, config.egg.gestation.max)
      })
    }

    return this._gestationPeriod
  }

  get id () {
    if (!this._id && this._id === undefined) {
      Object.defineProperty(this, '_id', {
        value: (Date.now() + parseInt(this.genes.join(''))).toString(36)
      })
    }

    return this._id
  }

  get position () {
    if (!this._position && this._position === undefined) {
      throw new Error('_generatePosition() hasn\'t been run yet')
    }

    return this._position
  }

  get prime () {
    if (!this._prime && this._prime === undefined) {
      // Generate a random index to select our prime DNS strand for the egg
      let primeIndex = (Math.random() * (this.dnaMap.length - 1)).toFixed()

      Object.defineProperty(this, '_prime', {
        value: this.dnaMap[primeIndex]
      })
    }

    return this._prime
  }

  get size () {
    if (!this._size && this._size === undefined) {
      Object.defineProperty(this, '_size', {
        value: this._numGen(this.prime.size, config.egg.size.min, config.egg.size.max)
      })
    }

    return this._size
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  // Proxy `color` to the prime DNA
  set color (value) {
    this.prime.color = value
  }

  set dnaMap (value) {
    throw new Error('dnaMap cannot be set')
  }

  // Proxy `energy` to the prime DNA
  set energy (value) {
    this._energy = value
  }

  // Proxy `genes` to the prime DNA
  set genes (value) {
    this.prime.genes = value
  }

  set gestationPeriod (value) {
    throw new Error('gestationPeriod cannot be set')
  }

  set id (value) {
    throw new Error('ID cannot be set')
  }

  set position (value) {
    Object.defineProperty(this, '_position', {
      value: value
    })
  }

  set prime (value) {
    throw new Error('prime cannot be set')
  }

  set size (value) {
    Object.defineProperty(this, '_size', {
      value: value
    })
  }
}
