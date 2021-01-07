<template>
  <div>
    <div class="form-group row my-1" style="margin-bottom: 0rem;">
      <b-input-group>
        <b-button variant="success" @click="addAttack()">Add Attack</b-button>
        <b-input v-model="attackName" placeholder="Attack Name"></b-input>
      </b-input-group>
    </div>
    <div class="form-group row">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">AC</span>
        </b-input-group-prepend>
        <b-form-input
          v-model.number="inputs.bossAC"
          type="number"
          id="boss-ac"
          size="xs"
          class="ACABinput"
          placeholder="Boss AC">
        </b-form-input>
        <b-input-group-prepend>
          <span class="input-group-text">HP</span>
        </b-input-group-prepend>
        <b-form-input
          v-model.number="inputs.bossHP"
          type="number"
          id="boss-hp"
          size="xs"
          class="ACABinput"
          placeholder="Boss HP">
        </b-form-input>
      </b-input-group>
    </div>
    <!-- need distinct inputs for each attack -->
    <div v-for="attack in attackList" :key="attack">
      <bossDprInput
        :attackName="attack"
        v-bind.sync="dataObj[attack]"
        @updateDamageDice="updateDamageDice"
        @updateBonusDice="updateBonusDice"
        @updateReductionDice="updateReductionDice"
        @updateCriticalDice="updateCriticalDice">
      </bossDprInput>
      <div v-for="player in Object.keys(playerData)" :key="player">
        DPS VS {{player}}
        <dprDisplay
          v-bind="dataObj[attack]"
          :targetAC="playerData[player].playerAC">
        </dprDisplay>
        <hr/>
      </div>
    </div>
  </div>
</template>
<script>
import bossDprInput from '@/components/bossDprInput.vue'
import dprDisplay from '@/components/dprDisplay.vue'
export default {
  props: {
    playerData: {
      type: Object,
      required: true
    }
  },
  components: {
    bossDprInput,
    dprDisplay
  },
  computed: {
  },
  watch: {
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
    },
    updateDamageDice(event) {
      // wip
      console.log(event)
      var diceKey = Object.keys(event.dice)[0]
      this.dataObj[event.attackName].inputs[diceKey].damageCount = event.dice[diceKey].damageCount
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
    updateBossAC(event) {
      this.inputs.bossAC = event
      this.$emit('updateBossAC', this.inputs.bossAC)
    },
    addAttack() {
      if (!(this.attackList.includes(this.attackName))) {
        this.attackList.push(this.attackName)
        // this.dataObj = $.extend({}, this.dataObj)
        // this.dataObj[this.attackName] = JSON.parse(JSON.stringify({ inputs: { ...this.inputs } }))
        this.$set(this.dataObj, this.attackName, JSON.parse(JSON.stringify({ inputs: { ...this.inputs } })))
      } else {
        console.log('if ur reading this u did the same attack name twice nerd.')
      }
    }
  },
  data: () => ({
    dataObj: {},
    inputs: {
      bossAC: '',
      bossHP: '',
      attackbonus: 7,
      numberofattacks: 1,
      selectedExtras: [],
      diceTypes: ['d4','d6','d8','d10','d12'],
      d4: { value: 4, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d6: { value: 6, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d8: { value: 8, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d10: { value: 10, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d12: { value: 12, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      flatdamage: '',
    },
    attackName: 'DoOm bLaDE SmiTE',
    attackList: []
  })
}
</script>