<template>
  <div>
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <b-button variant="info" @click="addAttack()">Add Attack</b-button>
        <b-input v-model="attackName" @keyup.enter="addAttack()" class="input-override" placeholder="e.g. MLG DoOm BlAdE SmiTe"></b-input>
      </b-input-group>
    </div>
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">AC</span>
        </b-input-group-prepend>
        <b-form-input
          v-model.number="bossAC"
          id="boss-ac"
          size="xs"
          class="ACABinput input-override"
          placeholder="Boss AC"
          @change="updateBossStat('bossAC', $event)">
        </b-form-input>
        <b-input-group-prepend>
          <span class="input-group-text">HP</span>
        </b-input-group-prepend>
        <b-form-input
          v-model.number="bossHP"
          id="boss-hp"
          size="xs"
          class="ACABinput input-override"
          placeholder="Boss HP"
          @change="updateBossStat('bossHP', $event)">
        </b-form-input>
      </b-input-group>
    </div>
    <!-- need distinct inputs for each attack -->
    <div v-for="attack in attackList" :key="attack">
      <div v-if="Object.keys(bossData).length">
        <div class="d-flex justify-content-left align-items-center">
          <h3 class="mr-2">{{attack}}</h3>
          <button type="button" class="close mb-2" aria-label="Close" @click="removeAttack(attack)">
            <span aria-hidden="true" style="font-size: 40px;">&times;</span>
          </button>
        </div>
        <bossDprInput
          :dataKey="attack"
          :renderAdvanced="false"
          v-bind.sync="bossData[attack]"
          @updateDiceCounts="updateDiceCounts"
          @updateSingleValue="updateSingleValue">
          <template v-slot:default></template>
        </bossDprInput>
        <br>
        <div v-for="player in Object.keys(playerData)" :key="player">
          <div class="form-group row my-1 no-margin">
            <b-btn v-b-toggle="'collapse-dpr-' + player + '-' + attack.replace(/\s+/g, '')" variant="secondary" class="btn btn-outline btn-sm col-lg">{{player}}</b-btn>
          </div>
          <b-collapse :visible="true" :id="'collapse-dpr-' + player + '-' + attack.replace(/\s+/g, '')">
            <dprDisplay
              v-bind.sync="bossData[attack]"
              :targetAC="playerData[player].inputs.ac">
            </dprDisplay>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bossDprInput from '@/components/playerDprInput.vue'
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
    bossData: {
      deep: true,
      handler() {
        this.$emit('sendBossData', this.bossData)
      }
    }
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
    },
    updateBossStat(bossStatName, event) {
      this[bossStatName] = parseInt(event)
      this.$emit('updateBossStat', { refKey: bossStatName, newVal: this[bossStatName] })
      this.$emit('sendBossData', this.bossData)
    },
    removeAttack(attack) {
      this.attackList = [...this.attackList.filter(item => item !== attack)]
      this.$delete(this.bossData, attack)
    },
    addAttack() {
      if (this.attackName == null || !this.attackName.trim()) {
        this.$swal({
          title: 'Empty Attack Name!',
          text: 'Bro you really out here just clicking buttons?',
          icon: 'warning',
          confirmButtonText: 'Whoops'
        })
        return // skip this
      }

      if (!(this.attackList.includes(this.attackName))) {
        this.attackList.push(this.attackName)
        this.$set(this.bossData, this.attackName, JSON.parse(JSON.stringify({ inputs: { ...this.inputs } })))
      } else {
        console.log('if ur reading this u did the same attack name twice nerd.')
      }
      this.attackName = ''
    },
    updateDiceCounts(event) {
      this.bossData[event.refKey].inputs[event.refDiceSize][event.refDamageType] = event.dice[event.refDiceSize][event.refDamageType]
    },
    updateSingleValue(event) {
      var keyName = Object.keys(event)[1]
      if (!(Array.isArray(event[keyName]))) {
        this.bossData[event.refKey].inputs[keyName] = parseInt(event[keyName])
      }
    }
  },
  data: () => ({
    bossData: {},
    bossAC: '',
    bossHP: '',
    inputs: {
      attackbonus: '',
      flatdamage: '',
      numberofattacks: '',
      selectedExtras: [],
      diceTypes: ['d4','d6','d8','d10','d12'],
      d4: { value: 4, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d6: { value: 6, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d8: { value: 8, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d10: { value: 10, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d12: { value: 12, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 }
    },
    attackList: [],
    attackName: ''
  })
}
</script>
