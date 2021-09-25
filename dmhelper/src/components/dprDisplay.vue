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
import dmgLib from '@/assets/js/dmgLib.js'
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
      return dmgLib.hit(this.targetAC, this.inputs.attackbonus)
    },
    chanceToSave() {
      return dmgLib.save(this.targetAC, this.inputs.attackbonus)
    },
    targetChanceToFail() {
      return dmgLib.targetfailsave(this.targetAC, this.inputs.attackbonus)
    },
    chanceToHitAdvantage() {
      return dmgLib.advantage(dmgLib.hit(this.targetAC, this.inputs.attackbonus))
    },
    chanceToHitDisadvantage() {
      return dmgLib.disadvantage(dmgLib.hit(this.targetAC, this.inputs.attackbonus))
    },
    elvenAccuracy() {
      return dmgLib.elvenaccuracy(dmgLib.hit(this.targetAC, this.inputs.attackbonus))
    },
    halflingLucky() {
      return dmgLib.halflinglucky(dmgLib.hit(this.targetAC, this.inputs.attackbonus))
    },
    halflingLuckyAdvantage() {
      return dmgLib.halflingluckyadvantage(dmgLib.hit(this.targetAC, this.inputs.attackbonus))
    },
    halflingLuckyDisadvantage() {
      return dmgLib.halflingluckydisadvantage(dmgLib.hit(this.targetAC, this.inputs.attackbonus))
    },
    bless() {
      return dmgLib.bless(this.targetAC, this.inputs.attackbonus)
    },
    buffToggles() {
      var avgDamage = this.averageDamage
      var allBonuses = this.generateBonusDiceArray(this.inputs.diceTypes)
      var hitchance = dmgLib.genericBBB(this.targetAC, this.inputs.attackbonus, allBonuses)

      hitchance = this.determineModifiedHitchance(hitchance)
      avgDamage = this.determineModifiedDamage(avgDamage)

      var buffedDPR = dmgLib.damagePerRound(hitchance, dmgLib.critchance(20), avgDamage)
      return buffedDPR * this.inputs.numberofattacks
    },
    averageDamage() {
      var avgDamage = dmgLib.avgdamage(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                      dmgLib.avgdamage(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                      dmgLib.avgdamage(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                      dmgLib.avgdamage(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                      dmgLib.avgdamage(this.inputs.d12.value, this.inputs.d12.damageCount) +
                      this.inputs.flatdamage
      return avgDamage
    },
    averageDamageGWF() {
      var avgDamage = dmgLib.avgdamageGWF(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                      dmgLib.avgdamageGWF(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                      dmgLib.avgdamageGWF(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                      dmgLib.avgdamageGWF(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                      dmgLib.avgdamageGWF(this.inputs.d12.value, this.inputs.d12.damageCount) +
                      this.inputs.flatdamage
      return avgDamage
    },
    averageDamageEA() {
      var avgDamage = dmgLib.avgdamageEA(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                      dmgLib.avgdamageEA(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                      dmgLib.avgdamageEA(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                      dmgLib.avgdamageEA(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                      dmgLib.avgdamageEA(this.inputs.d12.value, this.inputs.d12.damageCount) +
                      this.inputs.flatdamage
      return avgDamage
    },
    averageDamageGWFEA() {
      var avgDamage = dmgLib.avgdamageGWFEA(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                      dmgLib.avgdamageGWFEA(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                      dmgLib.avgdamageGWFEA(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                      dmgLib.avgdamageGWFEA(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                      dmgLib.avgdamageGWFEA(this.inputs.d12.value, this.inputs.d12.damageCount) +
                      this.inputs.flatdamage

      return avgDamage
    },
    maxDamage() {
      var maxDamage = dmgLib.maxdamage(this.inputs.d4.value, this.inputs.d4.damageCount) + 
                      dmgLib.maxdamage(this.inputs.d6.value, this.inputs.d6.damageCount) + 
                      dmgLib.maxdamage(this.inputs.d8.value, this.inputs.d8.damageCount) + 
                      dmgLib.maxdamage(this.inputs.d10.value, this.inputs.d10.damageCount) + 
                      dmgLib.maxdamage(this.inputs.d12.value, this.inputs.d12.damageCount) +
                      this.inputs.flatdamage
      return maxDamage
    },
    minDamage() {
      var minDamage = dmgLib.mindamage(this.inputs.d4.damageCount) + 
                      dmgLib.mindamage(this.inputs.d6.damageCount) + 
                      dmgLib.mindamage(this.inputs.d8.damageCount) + 
                      dmgLib.mindamage(this.inputs.d10.damageCount) + 
                      dmgLib.mindamage(this.inputs.d12.damageCount) +
                      this.inputs.flatdamage
      return minDamage
    },
    DPR() {
      var givenDPR = dmgLib.damagePerRound(this.chanceToHit, dmgLib.critchance(20), this.averageDamage)
      return givenDPR * this.inputs.numberofattacks
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
        hitchance = dmgLib.elvenaccuracy(hitchance)
      }
      else if (this.inputs.selectedExtras.includes('halflinglucky')) {
        hitchance = dmgLib.halflinglucky(hitchance)
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