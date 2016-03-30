export default class UUID {
  _generate () {
    let d0 = Math.random() * 0xffffffff | 0
    let d1 = Math.random() * 0xffffffff | 0
    let d2 = Math.random() * 0xffffffff | 0
    let d3 = Math.random() * 0xffffffff | 0

    return
      this.lut[d0 & 0xff] +
      this.lut[d0 >> 8 & 0xff] +
      this.lut[d0 >> 16 & 0xff] +
      this.lut[d0 >> 24 & 0xff] +
      '-' +
      this.lut[d1 & 0xff] +
      this.lut[d1 >> 8 & 0xff] +
      '-' +
      this.lut[d1 >> 16 & 0x0f | 0x40] +
      this.lut[d1 >> 24 & 0xff] +
      '-' +
      this.lut[d2 & 0x3f | 0x80] +
      this.lut[d2 >> 8 & 0xff] +
      '-' +
      this.lut[d2 >> 16 & 0xff] +
      this.lut[d2 >> 24 & 0xff] +
      this.lut[d3 & 0xff] +
      this.lut[d3 >> 8 & 0xff] +
      this.lut[d3 >> 16 & 0xff] +
      this.lut[d3 >> 24 & 0xff]
  }

  _generateLut () {
    let lut = []

    for (let i = 0; i < 256; i++) {
      lut[i] = (i < 16 ? '0' : '') + (i).toString(16)
    }
  }

  // Lookup Table
  get lut () {
    if (!this._lut) {
      this._generateLut()
    }

    return this._lut
  }

  set lut (value) {
    return this._lut = value
  }

  constructor () {
    this.value = this._generate()

    return this
  }
}
