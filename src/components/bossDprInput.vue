<template>
  <div>
    <h1>{{attackName}}</h1>
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">Default Attack Bonus</span>
        </b-input-group-prepend>
        <b-form-input
            v-model.number="inputs.attackbonusval"
            id="attack-bonus"
            size="xs"
            class="ACABinput input-override"
            placeholder="Default Attack Bonus">
        </b-form-input>
        <b-input-group-prepend>
          <span class="input-group-text">Attacks</span>
        </b-input-group-prepend>
        <b-form-input
            v-model.number="inputs.numberofattacksval"
            id="number-of-attacks"
            size="xs"
            class="ACABinput input-override"
            placeholder="# of Attacks">
        </b-form-input>
      </b-input-group>
    </div>
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">Damage Dice</span>
        </b-input-group-prepend>
        <div v-for="dice in inputs.diceTypes" :key="dice" class="col-xs">
          <b-form-input
            :id="dice"
            class="diceinput input-override"
            :placeholder="'# of '+dice"
            :value="[dice].damageCount"
            maxlength="4"
            @input="updateDiceCounts(dice, $event, 'damageCount')">
          </b-form-input>
        </div>
        <b-input-group-prepend>
          <span class="input-group-text">Flat</span>
        </b-input-group-prepend>
        <b-form-input id="flatDamage" class="diceinput input-override" placeholder="e.g. 5" v-model="flatdamage" :number="true"></b-form-input>
      </b-input-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    inputs: {
      type: Object,
      required: true
    },
    attackName: {
      type: String
    }
  },
  watch: {
    attackbonusval() {
      this.$emit('update:attackbonus', this.attackbonusval)
    },
    numberofattacksval() {
      this.$emit('update:numberofattacks', this.numberofattacksval)
    },
    flatdamage() {
      this.$emit('update:flatdamage', this.flatdamage)
    },
    selectedExtras() {
      this.$emit('update:selectedExtras', this.selectedExtras)
    }
  },
  methods: {
    updateDiceCounts(diceSize, event, diceDamageType) {
      this[diceSize][diceDamageType] = event
      this.$emit('updateDiceCounts', {
        refKey: this.attackName,
        refDamageType: diceDamageType,
        refDiceSize: diceSize,
        dice: { [diceSize]: this[diceSize] } 
      })
    }
  },
  data: () => ({
    attackbonusval: '',
    numberofattacksval: '',
    flatdamage: '',
    d4: { value: 4, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d6: { value: 6, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d8: { value: 8, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d10: { value: 10, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d12: { value: 12, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
  })
}
</script>
<style >
</style>
