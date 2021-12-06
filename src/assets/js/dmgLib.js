let dmgLib = {}

// hit and save are effectively the same, they are decoupled here in case more advanced things are needed in the future
dmgLib.hit = (ac, hitbonus) => {
  return (21 - ac + hitbonus) / 20
}

dmgLib.save = (dc, savebonus) => {
  return (21 - dc + savebonus) / 20
}

dmgLib.targetfailsave = (dc, savebonus) => {
  return 1 - ((21 - dc + savebonus) / 20)
}

dmgLib.advantage = (Phitorsave) => {
  return (1 - (Math.pow((1 - Phitorsave), 2)))
}

dmgLib.disadvantage = (Phitorsave) => {
  return Math.pow(Phitorsave, 2)
}

dmgLib.elvenaccuracy = (Phitorsave) => {
  return (1 - (Math.pow((1 - Phitorsave), 3)))
}

dmgLib.halflinglucky = (Phitorsave) => {
  return Phitorsave + (1 / 20 * Phitorsave)
}

dmgLib.halflingluckyadvantage = (Phitorsave) => {
  return dmgLib.advantage(Phitorsave) + ((2 / 20 * (1 - Phitorsave)) - (1 / 400)) * Phitorsave
}

dmgLib.halflingluckydisadvantage = (Phitorsave) => {
  return dmgLib.disadvantage(Phitorsave) + ((2 / 20 * (Math.pow(Phitorsave, 2))))
}

// wrap this with adv, disadv, elven accuraccy, halfling lucky, etc...
// to get probability of crit under those effects
dmgLib.critchance = (threshold) => {
  return ((21 - threshold) / 20)
}

// need to create a good way to make this generic and make sure
// it works with negative effects as well
// https://docs.google.com/document/d/11eTMZPPxWXHY0rQEhK1msO-40BcCGrzArSl4GX4CiJE/edit#
dmgLib.bless = (ac, hitbonus) => {
  var bless = [1,2,3,4]
  // var bardic = [1,2,3,4,5,6]
  // var bane = [-1,-2,-3,-4,-5,-6]
  // var fullset = [1,2,3,4][1,2,3,4,5,6][-1,-2,-3,-4]
  var cthwb = bless.map(tempbonus => { 
    return ((1 / bless.length) * dmgLib.hit(ac, hitbonus+tempbonus)) 
  })
  return cthwb.reduce((a, b) => a + b, 0) // sum chances
}

// two or more arrays
// 1. get min of both arrays and sum, get max of both arrays and sum
// 2. create an array of min -> max e.g. bless+bardic(1d6variant) -> 2min-10max, finally do fucntion
dmgLib.genericBBB = (ac, hitbonus, fullset) => {
  // var bless = [1,2,3,4]
  // var bardic = [1,2,3,4,5,6]
  // var bane = [-1,-2,-3,-4]
  // var fullset = [blessArr, bardicArr, baneArr]

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

  var cthwb = bonusarray.map(BBBbonus => { 
    return ((1 / bonusarray.length) * dmgLib.hit(ac, hitbonus+BBBbonus)) 
  })
  var hitchance = cthwb.reduce((a, b) => a + b, 0) // sum chances, return hit chance

  // handle hit bonuses going nuts
  if (hitchance > 1) return 1
  return hitchance
}

dmgLib.avgdamage = (dicesize, numdice) => {
  if (numdice === 0 || numdice === "") {
    return 0
  }
  var dicerange = []
  for (var i = 1; i <= dicesize; i++) {
    dicerange.push(i)
  }
  var totals = dicerange.reduce((a, b) => a + b, 0)
  return ((totals / dicesize) * numdice)
}

dmgLib.avgdamageGWF = (dicesize, numdice) => {
  if (numdice === 0 || numdice === "") {
    return 0
  }
  var dicerange = []
  for (var i = 1; i <= dicesize; i++) {
    dicerange.push(i)
  }
  var totals = dicerange.reduce((a, b) => a + b, 0)
  var averagefordicesize = ((totals / dicesize) * numdice)
  
  dicerange.length = 0
  for (i = 1; i <= dicesize; i++) {
    if (i <= 2) {
      dicerange.push(averagefordicesize)
    } else {
      dicerange.push(i)
    }
  }
  var totalsGWF = dicerange.reduce((a, b) => a + b, 0)

  return ((totalsGWF / dicesize) * numdice)
}

dmgLib.avgdamageEA = (dicesize, numdice) => {
  if (numdice === 0 || numdice === "") {
    return 0
  }

  var dicerange = []
  for (var i = 1; i <= dicesize; i++) {
    if (i <= 1) {
      dicerange.push(2)
    } else {
      dicerange.push(i)
    }
  }
  var totals = dicerange.reduce((a, b) => a + b, 0)
  return ((totals / dicesize) * numdice)
}

dmgLib.avgdamageGWFEA = (dicesize, numdice) => {
  if (numdice === 0 || numdice === "") {
    return 0
  }
  var dicerange = []
  for (var i = 1; i <= dicesize; i++) {
    if (i <= 1) {
      dicerange.push(2)
    } else {
      dicerange.push(i)
    }
  }

  var EAtotal = dicerange.reduce((a, b) => a + b, 0)

  dicerange.length = 0
  for (i = 1; i <= dicesize; i++) {
    if (i <= 2) {
      dicerange.push((EAtotal / dicesize))
    } else {
      dicerange.push(i)
    }
  }

  var totals = dicerange.reduce((a, b) => a + b, 0)
  return ((totals / dicesize) * numdice)
}

dmgLib.avgdamageFoP = (dicesize, numdice) => {
  if (numdice === 0 || numdice === "") {
    return 0
  }
  var dicerange = []
  for (var i = 1; i <= dicesize; i++) {
    dicerange.push(i)
  }
  var totals = dicerange.reduce((a, b) => a + b, 0)
  var averagefordicesize = ((totals / dicesize) * numdice)
  
  dicerange.length = 0
  for (i = 1; i <= dicesize; i++) {
    if (i <= 1) {
      dicerange.push(averagefordicesize)
    } else {
      dicerange.push(i)
    }
  }
  var totalsFoP = dicerange.reduce((a, b) => a + b, 0)

  return ((totalsFoP / dicesize) * numdice)
}

dmgLib.mindamage = (numdice) => {
  if (numdice == 0) {
    return 0
  }
  return (1 * numdice)
}

dmgLib.maxdamage = (dicesize, numdice) => {
  if (numdice == 0) {
    return 0
  }
  return (dicesize * numdice)
}

dmgLib.damagePerRound = (hitchance, critthreshold, avgdamage) => {
  var P = hitchance
  var C = critthreshold
  var DPH = avgdamage
  var DPC = DPH*2
  return (((P - C) * DPH) + (C * DPC))
}

dmgLib.standardDeviation = (values) => {
  if (values == null) {
    return 0
  }

  var avg = mathMean(values)
  
  var squareDiffs = values.map((value) => {
    var diff = value - avg
    var sqrDiff = diff * diff
    return sqrDiff
  })
  
  var avgSquareDiff = mathMean(squareDiffs)

  var stdDev = Math.sqrt(avgSquareDiff)
  return stdDev
}

export function mathMean(data) {
  if (data == null) {
    return 0
  }

  var sum = data.reduce((sum, value) => {
    return sum + value
  }, 0)

  var avg = sum / data.length
  return avg
}

export default dmgLib