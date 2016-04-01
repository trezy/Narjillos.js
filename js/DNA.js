import config from '../config'
import Base from './Base'
import Chromosome from './Chromosome'





export default class DNA extends Base {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _generateChromosome () {
    // Generate a random value between 0 and 255
    let bit = Math.random() * 255

    // Verify that the bit hasn't done anything crazy and gone out of range
    if (0 > bit || bit > 255) {
      throw new Error('Bit is out of range')
      return
    }

    // Convert the bit to a string so we can add 0 padding
    bit = bit.toFixed()

    // Add 0 padding
    if (bit.length < 2) bit = 0 + bit
    if (bit.length < 3) bit = 0 + bit

    return bit
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()

    return this
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get color () {
    return [
      this.genes[3],
      this.genes[4],
      this.genes[5],
    ]
  }

  get energy () {
    return this.genes[2]
  }

  get genes () {
    if (!this._genes) {
      Object.defineProperty(this, '_genes', {
        value: []
      })

      for (let chromosomesGenerated = 0; chromosomesGenerated < config.DNA.chromosomeCount; chromosomesGenerated++) {
        this._genes.push(this._generateChromosome())
      }
    }

    return this._genes
  }

  get gestationPeriod () {
    return this.genes[0]
  }

  get size () {
    return this.genes[1]
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set color (value) {
    throw new Error('color cannot be set')
  }

  set energy (value) {
    throw new Error('energy cannot be set')
  }

  set gestationPeriod (value) {
    throw new Error('gestationPeriod cannot be set')
  }

  set size (value) {
    throw new Error('size cannot be set')
  }
}
