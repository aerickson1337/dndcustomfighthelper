<template>
  <div>
    <b-btn @click="fightSimulation()">FIGHT!</b-btn>
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
      --- Party DPR Standard Deviation: {{standardDeviation(arrPartyDPR).toFixed(2)}}
      <br>
      Boss HP: {{bossHP}}
      --- Boss Mean DPR: {{mathMean(arrBossDPR).toFixed(2)}}
      --- Boss DPR Standard Deviation: {{ standardDeviation(arrBossDPR).toFixed(2) }}
      <br>
      Party dies in: {{(partyHP / bossDPR).toFixed(0)}} Rounds
      <br>
      Boss Dies in: {{(bossHP / mathSum(arrPartyDPR)).toFixed(0)}} Rounds
      <br>

      <br>
      Party Survival chance: {{ ((partyHP / bossDPR) / ((partyHP / bossDPR) + (bossHP / mathSum(arrPartyDPR))) * 100).toFixed(0) }}%
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
    arrBossDPR() {
      var bossDPR = []
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
        bossDPR.push(dpr)
      })
      return bossDPR
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
    },
    bossMeanDPR() {
      return mathMean(this.arrBossDPR).toFixed(2)
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
    standardDeviation(arrayToStdDev) {
      return dprFunctions.standardDeviation(arrayToStdDev)
    },
    mathSum() {
      if (this.arrPartyDPR == null || this.arrPartyDPR.length === 0) {
        return 0
      } else {
        return this.arrPartyDPR.reduce((a,b) => a + b)
      }
    },
    fightSimulation() {
      // var bossHasLife = true
      // var playersHaveLife = true
      var playerDataCopy = JSON.parse(JSON.stringify(this.playerData))
      // var bossDataCopy = Object.assign({}, this.bossData)
      var bossHP = this.bossHP
      var playerCount = Object.keys(playerDataCopy).length
      var playerDeaths = []
      
      // main loop, don't use a while so we don't loop to death
      for (var j = 0; j < 100; j++) {
        // make an array of indexs that contain living players
        var alivePlayerIndexes = []
        for (var k = 0; k < playerCount; k++) {
          if(!playerDeaths.some(item => item === k)) {
            alivePlayerIndexes.push(k)
          }
        }
        // use that array to determine who to attack next, that way we don't attack dead guys
        var attackedPlayer = alivePlayerIndexes[Math.floor(Math.random() * alivePlayerIndexes.length)]
        for (var i = 0; i < Object.keys(playerDataCopy).length; i++) {
          bossHP -= this.individualPlayerDPR(Object.keys(playerDataCopy)[i])
          // when we are on the bosses chosen player to attack we do the attack on that players turn to save compute cycles
          if (i === attackedPlayer) {
            playerDataCopy[Object.keys(playerDataCopy)[i]].inputs.hp -= this.bossMeanDPR
            // if the player dies add them to the death array so they get removed from the attack pool next iteration
            if (playerDataCopy[Object.keys(playerDataCopy)[i]].inputs.hp <= 0) {
              playerDeaths.push(i)
            }
          }
        }
        // if the boss is below 0, the players won!
        if (bossHP <= 0) {
          this.$swal({
            title: 'Players Won!',
            text: 'The Players were victorious. The Boss died on round: ' + j,
            icon: 'success',
            confirmButtonText: 'yay?'
          })
          break
        } else if (playerDeaths.length === playerCount) { // if all the players are dead the boss won
          this.$swal({
            title: 'The Boss Won!',
            text: 'whosyourdaddy didn\'t work?!?! Players Died on round: ' + j,
            icon: 'warning',
            confirmButtonText: 'Oh jeez'
          })
          break
        }
      }
      console.log('bosshp', bossHP)
      Object.keys(playerDataCopy).forEach(player => {
        console.log(player, playerDataCopy[player].inputs.hp)
      })
    },
    individualPlayerDPR(player) {
      var hitChance = dprFunctions.hit(this.bossAC, this.playerData[player].inputs.attackbonus)
      var critThreshold = dprFunctions.critchance(20)
      var averageDamage = (dprFunctions.avgdamage(this.playerData[player].inputs.d4.value, this.playerData[player].inputs.d4.damageCount) + 
                          dprFunctions.avgdamage(this.playerData[player].inputs.d6.value, this.playerData[player].inputs.d6.damageCount) + 
                          dprFunctions.avgdamage(this.playerData[player].inputs.d8.value, this.playerData[player].inputs.d8.damageCount) + 
                          dprFunctions.avgdamage(this.playerData[player].inputs.d10.value, this.playerData[player].inputs.d10.damageCount) + 
                          dprFunctions.avgdamage(this.playerData[player].inputs.d12.value, this.playerData[player].inputs.d12.damageCount) +
                          this.playerData[player].inputs.flatdamage)
      var dpr = (dprFunctions.damagePerRound(hitChance, critThreshold, averageDamage) * this.playerData[player].inputs.numberofattacks)
      return dpr
    }
  },
  data: () => ({
  })
}
</script>