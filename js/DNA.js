import config from '../config'
import Chromosome from './Chromosome'

export default class DNA {
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

  constructor () {
    this.genes = []

    for (let chromosomesGenerated = 0; chromosomesGenerated < config.DNA.chromosomeCount; chromosomesGenerated++) {
      this.genes.push(this._generateChromosome())
    }

    this.color = [
      this.genes[2],
      this.genes[3],
      this.genes[4],
    ]
    this.gestationPeriod = this.genes[0]
    this.size = this.genes[1]

    return this
  }
}
