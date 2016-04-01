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
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/





  /******************************************************************************\
    Setters
  \******************************************************************************/
}
