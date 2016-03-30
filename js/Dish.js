import Egg from './Egg'

export default class Dish {
  _bindEvents () {
    // Bind initialize to the Start button
    this.ui.start.addEventListener('click', this._initialize.bind(this))

    // Automatically update the size of the petri dish when the window is resized
    window.addEventListener('resize', this._resizeDish.bind(this))
  }

  _createSVGElement (element) {
    return document.createElementNS(this.xmlns, element)
  }

  _initialize () {
    let eggsToSpawn = this.ui.eggSlider.value
    this._resizeDish()

    for (let eggsSpawned = 0; eggsSpawned < eggsToSpawn; eggsSpawned++) {
      this._spawnEgg()
    }
  }

  _resizeDish () {
    let dish = this.ui.dish
    let parent = dish.parentNode

    dish.setAttribute('height', parent.scrollHeight)
    dish.setAttribute('width', parent.scrollWidth)
  }

  _spawnEgg () {
    let maxX = this.ui.dish.scrollWidth
    let maxY = this.ui.dish.scrollHeight

    let egg = new Egg(maxX, maxY)

    this.eggs.push(egg)

    this.ui.dish.appendChild(egg.group)
  }

  constructor (options) {
    // Set default options
    this.options = options || {}

    // Gather references to commonly used UI elements
    this.ui = {
      dish: document.querySelector('#dish'),
      eggSlider: document.querySelector('input[name=egg-count]'),
      start: document.querySelector('button[name=start]')
    }

    // Create an array for storing eggs so they can be referenced later
    this.eggs = []

    // Bind events for the application
    this._bindEvents()
  }
}
