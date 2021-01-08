<template>
  <div>
    <b-table striped :items="tableItems">
      <template #cell(Hit)="data">
        {{ data.item.Hit }}%
      </template>
      <template #cell(HitA)="data">
        {{ data.item.HitA }}%
      </template>
      <template #cell(HitD)="data">
        {{ data.item.HitD }}%
      </template>
    </b-table>
  </div>
</template>
<script>
import dprFunctions from '@/assets/js/dprFunctions.js'
export default {
  props: {
    targetAC: {
      type: Number,
      required: true,
      default: 16
    },
    inputs: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  computed: {
    tableItems() {
      return [{
        Hit: this.roundToPercent(this.chanceToHit),
        HitA: this.roundToPercent(this.chanceToHitAdvantage),
        HitD: this.roundToPercent(this.chanceToHitDisadvantage),
        BaseDPR: this.DPR.toFixed(2),
        BuffedDPR: this.buffToggles.toFixed(2)
      }]
    },
    chanceToHit() {
      return dprFunctions.hit(this.targetAC, this.inputs.attackbonus)
    },
    chanceToSave() {
      return dprFunctions.save(this.targetAC, this.inputs.attackbonus)
    },
    targetChanceToFail() {
      return dprFunctions.targetfailsave(this.targetAC, this.inputs.attackbonus)
    },
    chanceToHitAdvantage() {
      return dprFunctions.advantage(dprFunctions.hit(this.targetAC, this.inputs.attackbonus))
    },
    chanceToHitDisadvantage() {
      return dprFunctions.disadvantage(dprFunctions.hit(this.targetAC, this.inputs.attackbonus))
    },
    elvenAccuracy() {
      return dprFunctions.elvenaccuracy(dprFunctions.hit(this.targetAC, this.inputs.attackbonus))
    },
    halflingLucky() {
      return dprFunctions.halflinglucky(dprFunctions.hit(this.targetAC, this.inputs.attackbonus))
    },
    halflingLuckyAdvantage() {
      return dprFunctions.halflingluckyadvantage(dprFunctions.hit(this.targetAC, this.inputs.attackbonus))
    },
    halflingLuckyDisadvantage() {
      return dprFunctions.halflingluckydisadvantage(dprFunctions.hit(this.targetAC, this.inputs.attackbonus))
    },
    bless() {
      return dprFunctions.bless(this.targetAC, this.inputs.attackbonus)
    },
    buffToggles() {
      var avgDamage = this.averageDamage
      var allBonuses = this.generateBonusDiceArray(this.inputs.diceTypes)
      var hitchance = dprFunctions.genericBBB(this.targetAC, this.inputs.attackbonus, allBonuses)

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
      console.log(this.chanceToHit)
      var givenDPR = dprFunctions.damagePerRound(this.chanceToHit, dprFunctions.critchance(20), this.averageDamage)
      console.log(givenDPR)
      return givenDPR
    }
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
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
      }
      if (this.inputs.selectedExtras.includes('avgdamageEA')) {
        avgDamage = this.averageDamageEA
      }
      if (this.inputs.selectedExtras.includes('avgdamageEA') && this.inputs.selectedExtras.includes('avgdamageGWF')) {
        avgDamage = this.averageDamageGWFEA
      }

      return avgDamage
    }
  },
  data: () => ({
  })
}
</script>