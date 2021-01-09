<template>
  <div>
    <playerDprInput
      v-bind.sync="playerData[player]"
      :dataKey="player"
      :renderAdvanced="true"
      @updateDiceCounts="updateDiceCounts"
      @updateSingleValue="updateSingleValue">
      <template v-slot:default="slotProps">
        <b-input-group-prepend>
          <span class="input-group-text">AC</span>
        </b-input-group-prepend>
        <div>
          <b-input
            v-model.number="slotProps.acval" 
            id="entity-ac"
            size="xs"
            class="ACABinput input-override"
            placeholder="Entity AC"
            @change="updateSingleValue({ac: $event})">
          </b-input>
        </div>
        <b-input-group-prepend>
          <span class="input-group-text">HP</span>
        </b-input-group-prepend>
        <b-input
          v-model.number="slotProps.hpval"
          id="entity-HP"
          size="xs"
          placeholder="Entity HP"
          class="ACABinput input-override"
          @change="updateSingleValue({hp: $event})">
        </b-input>
      </template>
    </playerDprInput>
    <dprDisplay
      v-bind.sync="playerData[player]"
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
  created() {
    this.$set(this.playerData, this.player, JSON.parse(JSON.stringify({ inputs: { ...this.inputs } })))
  },
  methods: {
    updateDiceCounts(event) {
      this.playerData[event.refKey].inputs[event.refDiceSize][event.refDamageType] = event.dice[event.refDiceSize][event.refDamageType]
    },
    updateSingleValue(event) {
      var keyName = Object.keys(event)[1]
      if (!(Array.isArray(event[keyName]))) {
        this.playerData[this.player].inputs[keyName] = parseInt(event[keyName])
      } else if (Array.isArray(event[keyName])) {
        this.playerData[this.player].inputs[keyName] = event[keyName]
      }
    }
  },
  watch: {
    playerData: {
      deep: true,
      handler() {
        var playerData = { playerName: this.player, playerAC: this.playerData[this.player].inputs.acinput }
        this.$emit('updatePlayerAC', playerData)
      }
    }
  },
  data: () => ({
    playerData: {},
    inputs: {
      ac: 20,
      hp: 50,
      attackbonus: 7,
      numberofattacks: 1,
      flatdamage: '',
      selectedExtras: [],
      diceTypes: ['d4','d6','d8','d10','d12'],
      d4: { value: 4, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d6: { value: 6, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d8: { value: 8, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d10: { value: 10, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
      d12: { value: 12, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 }
    }
  })
}
</script>