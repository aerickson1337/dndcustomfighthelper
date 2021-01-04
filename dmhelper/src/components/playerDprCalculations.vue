<template>
  <div>
    <playerDprInput
      v-bind.sync="inputs"
      :player="player"
      @updateDamageDice="updateDamageDice"
      @updateBonusDice="updateBonusDice"
      @updateReductionDice="updateReductionDice"
      @updateCriticalDice="updateCriticalDice">
    </playerDprInput>
    <dprDisplay
      v-bind="{inputs}"
      :targetAC="bossAC">
    </dprDisplay>
  </div>
</template>
<script>
import playerDprInput from '@/components/playerDprInput.vue'
import dprDisplay from '@/components/dprDisplay.vue'
export default {
  components: {
    playerDprInput,
    dprDisplay
  },
  props: {
    bossAC: {
      required: true
    },
    player: {
      type: String,
      required: true
    },
  },
  computed: {
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
    }
  },
  watch: {
    inputs: {
      deep: true,
      handler() {
        var playerData = { playerName: this.player, playerAC: this.inputs.acinput }
        this.$emit('updatePlayerAC', playerData)
      }
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