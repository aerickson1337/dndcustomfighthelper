<template>
  <div>
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <b-button variant="success" @click="addAttack()">Add Attack</b-button>
        <b-input v-model="attackName" class="input-override" placeholder="e.g. MLG DoOm BlAdE SmiTe"></b-input>
      </b-input-group>
    </div>
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">AC</span>
        </b-input-group-prepend>
        <b-form-input
          v-model.number="inputs.bossAC"
          id="boss-ac"
          size="xs"
          class="ACABinput input-override"
          placeholder="Boss AC">
        </b-form-input>
        <b-input-group-prepend>
          <span class="input-group-text">HP</span>
        </b-input-group-prepend>
        <b-form-input
          v-model.number="inputs.bossHP"
          id="boss-hp"
          size="xs"
          class="ACABinput input-override"
          placeholder="Boss HP">
        </b-form-input>
      </b-input-group>
    </div>
    <!-- need distinct inputs for each attack -->
    <div v-for="attack in attackList" :key="attack">
      <bossDprInput
        :attackName="attack"
        v-bind.sync="dataObj[attack]"
        @updateDamageDice="updateDamageDice">
      </bossDprInput>
      <br>
      <div v-for="player in Object.keys(playerData)" :key="player">
        <div class="form-group row my-1 no-margin">
          <b-btn v-b-toggle="'collapse-dpr-' + player" variant="secondary" class="btn btn-outline btn-sm col-lg">{{player}}</b-btn>
        </div>
        <b-collapse :visible="true" :id="'collapse-dpr-' + player">
          <dprDisplay
            v-bind.sync="dataObj[attack]"
            :targetAC="playerData[player].playerAC">
          </dprDisplay>
        </b-collapse>
        <br>
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
      console.log('i ran')
      var diceKey = Object.keys(event.dice)[0]
      this.dataObj[event.attackName].inputs[diceKey].damageCount = event.dice[diceKey].damageCount
    },
    // updateBonusDice(event) {
    //   var diceKey = Object.keys(event)[0]
    //   this.inputs[diceKey].bonusCount = event[diceKey].bonusCount
    // },
    // updateReductionDice(event) {
    //   var diceKey = Object.keys(event)[0]
    //   this.inputs[diceKey].reductionCount = event[diceKey].reductionCount
    // },
    // updateCriticalDice(event) {
    //   var diceKey = Object.keys(event)[0]
    //   this.inputs[diceKey].criticalCount = event[diceKey].criticalCount
    // },
    updateBossAC(event) {
      this.inputs.bossAC = event
      this.$emit('updateBossAC', this.inputs.bossAC)
    },
    addAttack() {
      if (this.attackName == null || !this.attackName.trim()) {
        return // skip this
      }

      if (!(this.attackList.includes(this.attackName))) {
        this.attackList.push(this.attackName)
        this.$set(this.dataObj, this.attackName, JSON.parse(JSON.stringify({ inputs: { ...this.inputs } })))
      } else {
        console.log('if ur reading this u did the same attack name twice nerd.')
      }
    }
  },
  data: () => ({
    dataObj: {},
    inputs: {
      bossAC: 16,
      bossHP: 500,
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
    attackList: []
  })
}
</script>