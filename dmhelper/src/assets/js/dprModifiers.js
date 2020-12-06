let dprModifiers = {}

dprModifiers.bless = () => {
  return [1,2,3,4]
}

dprModifiers.bane = () => {
  return [-1,-2,-3,-4]
}

dprModifiers.bardic = (diceSize) => {
  if (!(diceSize)) {
    diceSize = 6
  }
  var bardicArray = []
  for (var i = 1; i <= diceSize; i++) {
    bardicArray.push(i)
  }
  return bardicArray
}

export default dprModifiers