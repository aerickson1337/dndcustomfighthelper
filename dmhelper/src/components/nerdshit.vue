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
      --- Party Round DPR: {{mathSum(arrPartyDPR).toFixed(2)}}
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
      <br>
      <div v-for="(log, index) in fightLog" :key="index">
        <!-- {{log}} -->
      </div>
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
import dmgLib from '@/assets/js/dmgLib.js'
import { mathMean } from '@/assets/js/dmgLib.js'
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
        var hitChance = dmgLib.hit(this.bossAC, this.playerData[player].inputs.attackbonus)
        var critThreshold = dmgLib.critchance(20)
        var averageDamage = (dmgLib.avgdamage(this.playerData[player].inputs.d4.value, this.playerData[player].inputs.d4.damageCount) + 
                            dmgLib.avgdamage(this.playerData[player].inputs.d6.value, this.playerData[player].inputs.d6.damageCount) + 
                            dmgLib.avgdamage(this.playerData[player].inputs.d8.value, this.playerData[player].inputs.d8.damageCount) + 
                            dmgLib.avgdamage(this.playerData[player].inputs.d10.value, this.playerData[player].inputs.d10.damageCount) + 
                            dmgLib.avgdamage(this.playerData[player].inputs.d12.value, this.playerData[player].inputs.d12.damageCount) +
                            this.playerData[player].inputs.flatdamage)
        var dpr = (dmgLib.damagePerRound(hitChance, critThreshold, averageDamage) * this.playerData[player].inputs.numberofattacks)
        partyDPR.push(dpr)
      })
      return partyDPR
    },
    arrBossDPR() {
      var bossDPR = []
      Object.keys(this.bossData).forEach(bossAttack => {
        var hitChance = dmgLib.hit(this.bossAC, this.bossData[bossAttack].inputs.attackbonus)
        var critThreshold = dmgLib.critchance(20)
        var averageDamage = (dmgLib.avgdamage(this.bossData[bossAttack].inputs.d4.value, this.bossData[bossAttack].inputs.d4.damageCount) + 
                            dmgLib.avgdamage(this.bossData[bossAttack].inputs.d6.value, this.bossData[bossAttack].inputs.d6.damageCount) + 
                            dmgLib.avgdamage(this.bossData[bossAttack].inputs.d8.value, this.bossData[bossAttack].inputs.d8.damageCount) + 
                            dmgLib.avgdamage(this.bossData[bossAttack].inputs.d10.value, this.bossData[bossAttack].inputs.d10.damageCount) + 
                            dmgLib.avgdamage(this.bossData[bossAttack].inputs.d12.value, this.bossData[bossAttack].inputs.d12.damageCount) +
                            this.bossData[bossAttack].inputs.flatdamage)
        var dpr = (dmgLib.damagePerRound(hitChance, critThreshold, averageDamage) * this.bossData[bossAttack].inputs.numberofattacks)
        bossDPR.push(dpr)
      })
      return bossDPR
    },
    bossDPR() {
      var bossDPR = 0
      Object.keys(this.bossData).forEach(bossAttack => {
        var hitChance = dmgLib.hit(this.bossAC, this.bossData[bossAttack].inputs.attackbonus)
        var critThreshold = dmgLib.critchance(20)
        var averageDamage = (dmgLib.avgdamage(this.bossData[bossAttack].inputs.d4.value, this.bossData[bossAttack].inputs.d4.damageCount) + 
                            dmgLib.avgdamage(this.bossData[bossAttack].inputs.d6.value, this.bossData[bossAttack].inputs.d6.damageCount) + 
                            dmgLib.avgdamage(this.bossData[bossAttack].inputs.d8.value, this.bossData[bossAttack].inputs.d8.damageCount) + 
                            dmgLib.avgdamage(this.bossData[bossAttack].inputs.d10.value, this.bossData[bossAttack].inputs.d10.damageCount) + 
                            dmgLib.avgdamage(this.bossData[bossAttack].inputs.d12.value, this.bossData[bossAttack].inputs.d12.damageCount) +
                            this.bossData[bossAttack].inputs.flatdamage)
        var dpr = (dmgLib.damagePerRound(hitChance, critThreshold, averageDamage) * this.bossData[bossAttack].inputs.numberofattacks)
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
      var givenDPR = dmgLib.damagePerRound(hitChance, dmgLib.critchance(critChance), averageDamage)
      return givenDPR * numberOfAttacks
    },
    standardDeviation(arrayToStdDev) {
      return dmgLib.standardDeviation(arrayToStdDev)
    },
    mathSum() {
      if (this.arrPartyDPR == null || this.arrPartyDPR.length === 0) {
        return 0
      } else {
        return this.arrPartyDPR.reduce((a,b) => a + b)
      }
    },
    fightSimulation() {
      this.fightLog = []
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
          this.fightLog.push(Object.keys(playerDataCopy)[i] + ' attacked the boss for:' + this.individualPlayerDPR(Object.keys(playerDataCopy)[i]))
          // when we are on the bosses chosen player to attack we do the attack on that players turn to save compute cycles
          if (i === attackedPlayer) {
            playerDataCopy[Object.keys(playerDataCopy)[i]].inputs.hp -= this.bossMeanDPR
            this.fightLog.push('The Boss attacked ' + Object.keys(playerDataCopy)[i] + ' for ' + this.bossMeanDPR)
            // if the player dies add them to the death array so they get removed from the attack pool next iteration
            if (playerDataCopy[Object.keys(playerDataCopy)[i]].inputs.hp <= 0) {
              playerDeaths.push(i)
              this.fightLog.push(Object.keys(playerDataCopy)[i] + ' Died!')
            }
          }
        }
        // if the boss is below 0, the players won!
        if (bossHP <= 0) {
          this.fightLog.push('The Boss was slain!')
          this.$swal({
            title: 'Players Won!',
            text: 'The Players were victorious. The Boss died on round: ' + j,
            icon: 'success',
            confirmButtonText: 'yay?'
          })
          break
        } else if (playerDeaths.length === playerCount) { // if all the players are dead the boss won
          this.fightLog.push('All the players died!')
          this.$swal({
            title: 'The Boss Won!',
            text: 'whosyourdaddy didn\'t work?!?! Players Died on round: ' + j,
            icon: 'warning',
            confirmButtonText: 'Oh jeez'
          })
          break
        }
      }
      Object.keys(playerDataCopy).forEach(player => {
        console.log(player, playerDataCopy[player].inputs.hp)
      })
    },
    individualPlayerDPR(player) {
      var hitChance = dmgLib.hit(this.bossAC, this.playerData[player].inputs.attackbonus)
      var critThreshold = dmgLib.critchance(20)
      var averageDamage = (dmgLib.avgdamage(this.playerData[player].inputs.d4.value, this.playerData[player].inputs.d4.damageCount) + 
                          dmgLib.avgdamage(this.playerData[player].inputs.d6.value, this.playerData[player].inputs.d6.damageCount) + 
                          dmgLib.avgdamage(this.playerData[player].inputs.d8.value, this.playerData[player].inputs.d8.damageCount) + 
                          dmgLib.avgdamage(this.playerData[player].inputs.d10.value, this.playerData[player].inputs.d10.damageCount) + 
                          dmgLib.avgdamage(this.playerData[player].inputs.d12.value, this.playerData[player].inputs.d12.damageCount) +
                          this.playerData[player].inputs.flatdamage)
      var dpr = (dmgLib.damagePerRound(hitChance, critThreshold, averageDamage) * this.playerData[player].inputs.numberofattacks)
      return dpr
    }
  },
  data: () => ({
    fightLog: []
  })
}
</script>