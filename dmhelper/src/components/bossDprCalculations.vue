<template>
  <div>
    <bossDprInput
      v-bind.sync="inputs"
      @updateDamageDice="updateDamageDice"
      @updateBonusDice="updateBonusDice"
      @updateReductionDice="updateReductionDice"
      @updateCriticalDice="updateCriticalDice">
    </bossDprInput>
    <div class="row">
      <div class="col">Chance to Hit:</div>
      <div class="col">{{ roundToPercent(chanceToHit) }}%</div>
    </div>
    <div class="row">
      <div class="col">Chance to Save:</div>
      <div class="col">{{ roundToPercent(chanceToSave) }}%</div>
    </div>
    <div class="row">
      <div class="col">Chance for target to Save:</div>
      <div class="col">{{ roundToPercent(targetChanceToFail) }}%</div>
    </div>
    <div class="row">
      <div class="col">Chance to Hit with Advantage:</div>
      <div class="col">{{ roundToPercent(chanceToHitAdvantage) }}%</div>
    </div>
    <div class="row">
      <div class="col">Chance to hit with Disadvantage:</div>
      <div class="col">{{ roundToPercent(chanceToHitDisadvantage) }}%</div>
    </div>
    <div class="row">
      <div class="col">base DPR:</div>
      <div class="col">{{ DPR }}</div>
    </div>
    <div class="row">
      <div class="col">Modified DPR:</div>
      <div class="col">{{ buffToggles.toFixed(2) }}</div>
    </div>
    debug: {{inputs.selectedExtras}}
  </div>
</template>
<script>
import bossDprInput from '@/components/bossDprInput.vue'
import dprFunctions from '@/assets/js/dprFunctions.js'
export default {
  components: {
    bossDprInput
  },
  computed: {
    chanceToHit() {
      return dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus)
    },
    chanceToSave() {
      return dprFunctions.save(this.inputs.acinput, this.inputs.attackbonus)
    },
    targetChanceToFail() {
      return dprFunctions.targetfailsave(this.inputs.acinput, this.inputs.attackbonus)
    },
    chanceToHitAdvantage() {
      return dprFunctions.advantage(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    chanceToHitDisadvantage() {
      return dprFunctions.disadvantage(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    elvenAccuracy() {
      return dprFunctions.elvenaccuracy(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    halflingLucky() {
      return dprFunctions.halflinglucky(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    halflingLuckyAdvantage() {
      return dprFunctions.halflingluckyadvantage(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    halflingLuckyDisadvantage() {
      return dprFunctions.halflingluckydisadvantage(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    bless() {
      return dprFunctions.bless(this.inputs.acinput, this.inputs.attackbonus)
    },
    buffToggles() {
      var avgDamage = this.averageDamage
      var allBonuses = this.generateBonusDiceArray(this.inputs.diceTypes)
      var hitchance = dprFunctions.genericBBB(this.inputs.acinput, this.inputs.attackbonus, allBonuses)

      hitchance = this.determineModifiedHitchance(hitchance)
      avgDamage = this.determineModifiedDamage(avgDamage)

      var buffedDPR = dprFunctions.damagePerRound(hitchance, dprFunctions.critchance(20), avgDamage)
      return buffedDPR * this.inputs.numberofattacks
    },
    averageDamage() {
      var avgDamage = dprFunctions.avgdamage(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                      dprFunctions.avgdamage(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                      dprFunctions.avgdamage(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                      dprFunctions.avgdamage(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                      dprFunctions.avgdamage(this.inputs.d12.value, this.inputs.d12.damageCount) +
                      this.inputs.flatdamage
      return avgDamage
    },
    averageDamageGWF() {
      var avgDamage = dprFunctions.avgdamageGWF(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                dprFunctions.avgdamageGWF(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                dprFunctions.avgdamageGWF(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                dprFunctions.avgdamageGWF(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                dprFunctions.avgdamageGWF(this.inputs.d12.value, this.inputs.d12.damageCount) +
                this.inputs.flatdamage
      return avgDamage
    },
    averageDamageEA() {
      var avgDamage = dprFunctions.avgdamageEA(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                dprFunctions.avgdamageEA(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                dprFunctions.avgdamageEA(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                dprFunctions.avgdamageEA(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                dprFunctions.avgdamageEA(this.inputs.d12.value, this.inputs.d12.damageCount) +
                this.inputs.flatdamage
      return avgDamage
    },
    averageDamageGWFEA() {
      var avgDamage = dprFunctions.avgdamageGWFEA(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                dprFunctions.avgdamageGWFEA(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                dprFunctions.avgdamageGWFEA(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                dprFunctions.avgdamageGWFEA(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                dprFunctions.avgdamageGWFEA(this.inputs.d12.value, this.inputs.d12.damageCount) +
                this.inputs.flatdamage

      return avgDamage
    },
    maxDamage() {
      var maxDamage = dprFunctions.maxdamage(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                dprFunctions.maxdamage(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                dprFunctions.maxdamage(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                dprFunctions.maxdamage(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                dprFunctions.maxdamage(this.inputs.d12.value, this.inputs.d12.damageCount) +
                this.inputs.flatdamage
      return maxDamage
    },
    minDamage() {
      var minDamage = dprFunctions.mindamage(this.inputs.d4.damageCount) + 
                dprFunctions.mindamage(this.inputs.d6.damageCount) + 
                dprFunctions.mindamage(this.inputs.d8.damageCount) + 
                dprFunctions.mindamage(this.inputs.d10.damageCount) + 
                dprFunctions.mindamage(this.inputs.d12.damageCount) +
                this.inputs.flatdamage
      return minDamage
    },
    DPR() {
      var givenDPR = dprFunctions.damagePerRound(this.chanceToHit, dprFunctions.critchance(20), this.averageDamage)
      return givenDPR
    }
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
    },
    updateDamageDice(event) {
      var diceKey = Object.keys(event)[0]
      this.inputs[diceKey].damageCount = event[diceKey].damageCount
    },
    updateBonusDice(event) {
      var diceKey = Object.keys(event)[0]
      this.inputs[diceKey].bonusCount = event[diceKey].bonusCount
    },
    updateReductionDice(event) {
      var diceKey = Object.keys(event)[0]
      this.inputs[diceKey].reductionCount = event[diceKey].reductionCount
    },
    updateCriticalDice(event) {
      var diceKey = Object.keys(event)[0]
      this.inputs[diceKey].criticalCount = event[diceKey].criticalCount
    },
    generateBonusDiceArray(diceTypes) {
      // all buffs stored here
      var allBonuses = []
      diceTypes.forEach(dice => {
        var bonusDiceArray = [] // create an array for each dice size, reset the array each iteration
        for (var i = 1; i <= this.inputs[dice].value; i++) {
          bonusDiceArray.push(i)
        }
        // if that dice size has inputs, push that many bonus inputs to allBonuses for math later
        if (this.inputs[dice].bonusCount > 0) {
          for (var j = 0; j < this.inputs[dice].bonusCount; j++) {
            allBonuses.push([...bonusDiceArray])
          }
        }
        // while we do this get the reduction/debuff values as well and push them to allBonuses for math later
        if (this.inputs[dice].reductionCount > 0) {
          for (var k = 0; k < this.inputs[dice].reductionCount; k++) {
            allBonuses.push([...bonusDiceArray].map(x => x * -1))
          }
        }
      })
      // returns [[1,2,3,4],[-1,-2,-3,-4]] if 1d4 bonus and 1d4 reduction selected, 
      // scales to any dice input and returns logical outcome of selection
      return allBonuses
    },
    determineModifiedHitchance(hitchance) {
      if (this.inputs.selectedExtras.includes('elvenaccuracy')) {
        hitchance = dprFunctions.elvenaccuracy(hitchance)
      }
      else if (this.inputs.selectedExtras.includes('halflinglucky')) {
        hitchance = dprFunctions.halflinglucky(hitchance)
      }

      return hitchance
    },
    determineModifiedDamage(avgDamage) {
      if (this.inputs.selectedExtras.includes('avgdamageGWF')) {
        avgDamage = this.averageDamageGWF
        console.log(avgDamage)
      }
      if (this.inputs.selectedExtras.includes('avgdamageEA')) {
        avgDamage = this.averageDamageEA
        console.log(avgDamage)
      }
      if (this.inputs.selectedExtras.includes('avgdamageEA') && this.inputs.selectedExtras.includes('avgdamageGWF')) {
        avgDamage = this.averageDamageGWFEA
        console.log(avgDamage)
      }

      return avgDamage
    }
  },
  data: () => ({
    inputs: {
      acinput: 20,
      attackbonus: 7,
      numberofattacks: 1,
      selectedExtras: [],
      diceTypes: ['d4','d6','d8','d10','d12'],
      d4: { value: 4, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d6: { value: 6, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d8: { value: 8, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d10: { value: 10, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d12: { value: 12, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      flatdamage: ''
    }
  })
}
</script>