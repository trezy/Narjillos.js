import Dish from './Dish'

// Bootstrapping some junk
document.xmlns = 'http://www.w3.org/2000/svg'
document.createSVGElement = function (element) {
  return document.createElementNS(document.xmlns, element)
}

new Dish
