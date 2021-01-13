<template>
  <div>
      <!-- <br>
      ------------
      <br>
      {{bossData}}
      <br>
      {{bossAC}}
      <br>
      {{bossHP}}
      <br>  -->
      Party HP: {{partyHP}}
      --- Party DPR: {{mathSum(arrPartyDPR).toFixed(2)}}
      --- Party Mean DPR: {{mathMean(arrPartyDPR).toFixed(2)}}
      --- Party DPR Standard Deviation: {{standardDeviation().toFixed(2)}}
      <br>
      Boss HP: {{bossHP}}
      --- Boss DPR: {{bossDPR.toFixed(2)}}
      <br>
      Party dies in: {{(partyHP / bossDPR).toFixed(0)}} Rounds
      <br>
      Boss Dies in: {{(bossHP / mathMean(arrPartyDPR)).toFixed(0)}} Rounds
      <br>
      Party Survival chance: {{ ((partyHP / bossDPR) / ((partyHP / bossDPR) + (bossHP / mathMean(arrPartyDPR))) * 100).toFixed(0) }}%
    <!-- <b-table striped :items="tableItems">
      <template #cell(Hit)="data">
        {{ data.item.Hit }}%
      </template>
      <template #cell(HitA)="data">
        {{ data.item.HitA }}%
      </template>
      <template #cell(HitD)="data">
        {{ data.item.HitD }}%
      </template>
    </b-table> -->
  </div>
</template>
<script>
import dprFunctions from '@/assets/js/dprFunctions.js'
import { mathMean } from '@/assets/js/dprFunctions.js'
export default {
  props: {
    playerData: {
      required: true
    },
    bossData: {
      required: true
    },
    bossAC: {
      required: true
    },
    bossHP: {
      required: true
    }
  },
  components: {
  },
  computed: {
    partyHP() {
      var totalHP = 0
      Object.keys(this.playerData).forEach(player => {
        totalHP += this.playerData[player].inputs.hp
      })
      return totalHP
    },
    arrPartyDPR() {
      var partyDPR = []
      Object.keys(this.playerData).forEach(player => {
        var hitChance = dprFunctions.hit(this.bossAC, this.playerData[player].inputs.attackbonus)
        var critThreshold = dprFunctions.critchance(20)
        var averageDamage = (dprFunctions.avgdamage(this.playerData[player].inputs.d4.value, this.playerData[player].inputs.d4.damageCount) + 
                            dprFunctions.avgdamage(this.playerData[player].inputs.d6.value, this.playerData[player].inputs.d6.damageCount) + 
                            dprFunctions.avgdamage(this.playerData[player].inputs.d8.value, this.playerData[player].inputs.d8.damageCount) + 
                            dprFunctions.avgdamage(this.playerData[player].inputs.d10.value, this.playerData[player].inputs.d10.damageCount) + 
                            dprFunctions.avgdamage(this.playerData[player].inputs.d12.value, this.playerData[player].inputs.d12.damageCount) +
                            this.playerData[player].inputs.flatdamage)
        var dpr = (dprFunctions.damagePerRound(hitChance, critThreshold, averageDamage) * this.playerData[player].inputs.numberofattacks)
        partyDPR.push(dpr)
      })
      return partyDPR
    },
    bossDPR() {
      var bossDPR = 0
      Object.keys(this.bossData).forEach(bossAttack => {
        var hitChance = dprFunctions.hit(this.bossAC, this.bossData[bossAttack].inputs.attackbonus)
        var critThreshold = dprFunctions.critchance(20)
        var averageDamage = (dprFunctions.avgdamage(this.bossData[bossAttack].inputs.d4.value, this.bossData[bossAttack].inputs.d4.damageCount) + 
                            dprFunctions.avgdamage(this.bossData[bossAttack].inputs.d6.value, this.bossData[bossAttack].inputs.d6.damageCount) + 
                            dprFunctions.avgdamage(this.bossData[bossAttack].inputs.d8.value, this.bossData[bossAttack].inputs.d8.damageCount) + 
                            dprFunctions.avgdamage(this.bossData[bossAttack].inputs.d10.value, this.bossData[bossAttack].inputs.d10.damageCount) + 
                            dprFunctions.avgdamage(this.bossData[bossAttack].inputs.d12.value, this.bossData[bossAttack].inputs.d12.damageCount) +
                            this.bossData[bossAttack].inputs.flatdamage)
        var dpr = (dprFunctions.damagePerRound(hitChance, critThreshold, averageDamage) * this.bossData[bossAttack].inputs.numberofattacks)
        bossDPR += dpr
      })
      return bossDPR
    }
  },
  methods: {
    mathMean,
    roundToPercent(num) {
      return Math.round(num * 100)
    },
    DPR(hitChance, critChance, averageDamage, numberOfAttacks) {
      var givenDPR = dprFunctions.damagePerRound(hitChance, dprFunctions.critchance(critChance), averageDamage)
      return givenDPR * numberOfAttacks
    },
    standardDeviation() {
      return dprFunctions.standardDeviation(this.arrPartyDPR)
    },
    mathSum() {
      if (this.arrPartyDPR == null || this.arrPartyDPR.length === 0) {
        return 0
      } else {
        return this.arrPartyDPR.reduce((a,b) => a + b)
      }
    }
  },
  data: () => ({
  })
}
</script>