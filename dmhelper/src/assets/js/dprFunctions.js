let dprFunctions = {}

dprFunctions.foo = () => {
  return 'foo'
}

// hit and save are effectively the same, they are decoupled here in case more advanced things are needed in the future
dprFunctions.hit = (ac, hitbonus) => {
  return (21 - ac + hitbonus) / 20
}

dprFunctions.save = (dc, savebonus) => {
  return (21 - dc + savebonus) / 20
}

dprFunctions.targetfailsave = (dc, savebonus) => {
  return 1 - ((21 - dc + savebonus) / 20)
}

dprFunctions.advantage = (Phitorsave) => {
  return (1 - (Math.pow((1 - Phitorsave), 2)))
}

dprFunctions.disadvantage = (Phitorsave) => {
  return Math.pow(Phitorsave, 2)
}

dprFunctions.elvenaccuracy = (Phitorsave) => {
  return (1 - (Math.pow((1 - Phitorsave), 3)))
}

dprFunctions.halflinglucky = (Phitorsave) => {
  return Phitorsave + (1 / 20 * Phitorsave)
}

dprFunctions.halflingluckyadvantage = (Phitorsave) => {
  return dprFunctions.advantage(Phitorsave) + ((2 / 20 * (1 - Phitorsave)) - (1 / 400)) * Phitorsave
}

dprFunctions.halflingluckydisadvantage = (Phitorsave) => {
  return dprFunctions.disadvantage(Phitorsave) + ((2 / 20 * (Math.pow(Phitorsave, 2))))
}

// wrap this with adv, disadv, elven accuraccy, halfling lucky, etc...
// to get probability of crit under those effects
dprFunctions.critchance = (threshold) => {
  return ((21 - threshold) / 20)
}

// need to create a good way to make this generic and make sure
// it works with negative effects as well
// https://docs.google.com/document/d/11eTMZPPxWXHY0rQEhK1msO-40BcCGrzArSl4GX4CiJE/edit#
dprFunctions.bless = (ac, hitbonus) => {
  var bless = [1,2,3,4]
  // var bardic = [1,2,3,4,5,6]
  // var bane = [-1,-2,-3,-4,-5,-6]
  // var fullset = [1,2,3,4][1,2,3,4,5,6][-1,-2,-3,-4]
  var cthwb = bless.map(bonus => { 
    return ((1 / bless.length) * dprFunctions.hit(ac, hitbonus+bonus)) 
  })
  return cthwb.reduce((a, b) => a + b, 0) // sum chances
}

// two or more arrays
// 1. get min of both arrays and sum, get max of both arrays and sum
// 2. create an array of min -> max e.g. bless+bardic(1d6variant) -> 2min-10max, finally do fucntion
dprFunctions.genericBBB = (ac, hitbonus, fullset) => {
  // var bless = [1,2,3,4]
  // var bardic = [1,2,3,4,5,6]
  // var bane = [-1,-2,-3,-4]
  // var fullset = [bless, bardic, bane]

  var min = 0
  var max = 0
  fullset.forEach(bonus => {
    min += Math.min(...bonus)
    max += Math.max(...bonus)
  })

  var bonusarray = []
  for (var i=min; i <= max; i++) {
    bonusarray.push(i)
  }

  var cthwb = bonusarray.map(bonus => { 
    return ((1 / bonusarray.length) * dprFunctions.hit(ac, hitbonus+bonus)) 
  })
  return cthwb.reduce((a, b) => a + b, 0) // sum chances
}

dprFunctions.avgdamage = (dice) => {
  var dicerange = []
  for (var i = 1; i <= dice; i++) {
    dicerange.push(i)
  }
  var totals = dicerange.reduce((a, b) => a + b, 0)
  return (totals / dice)
}

export default dprFunctions