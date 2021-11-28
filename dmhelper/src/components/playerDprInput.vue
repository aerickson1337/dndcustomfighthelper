<template>
  <div>
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <slot
          name="default"
          :acval="acval"
          :hpval="hpval">
        </slot>
        <b-input-group-prepend>
          <span class="input-group-text">Attack Bonus</span>
        </b-input-group-prepend>
        <b-input
          v-model.number="attackbonusval"
          id="attack-bonus"
          size="xs"
          class="ACABinput input-override"
          placeholder="e.g. 7"
          @change="updateSingleValue('attackbonus', $event)">
        </b-input>
        <b-input-group-prepend>
          <span class="input-group-text">Attacks</span>
        </b-input-group-prepend>
        <b-input
          v-model.number="numberofattacksval"
          id="number-of-attacks"
          class="col input-override"
          placeholder="e.g. 1"
          @change="updateSingleValue('numberofattacks', $event)">
        </b-input>
      </b-input-group>
    </div>
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">Damage Dice</span>
        </b-input-group-prepend>
        <div v-for="(dice, index) in inputs.dice" :key="dice.name" class="col-xs">
          <b-input
            :id="dice.name"
            class="diceinput input-override"
            :placeholder="'# of '+dice.name"
            v-model="[dice.name].damageCount"
            maxlength="4"
            @input="updateDiceCounts(dice.name, $event, 'damageCount', index)">
          </b-input>
        </div>
        <b-input-group-prepend>
          <span class="input-group-text">Flat</span>
        </b-input-group-prepend>
        <b-form-input
          id="flatDamage"
          class="col input-override"
          placeholder="e.g. 5"
          v-model="flatdamage"
          :number="true"
          @change="updateSingleValue('flatdamage', $event)">
        </b-form-input>
      </b-input-group>
    </div>
    <div class="form-group row my-1 no-margin hide-for-boss" v-if="renderAdvanced">
      <b-btn v-b-toggle="'collapse-' + dataKey" variant="secondary" class="btn btn-outline btn-sm col-lg">Advanced</b-btn>
    </div>
    <b-collapse :id="'collapse-' + dataKey" class="col" v-if="renderAdvanced">
      <div class="form-group row my-1">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text">Bless, bardic, etc</span>
          </b-input-group-prepend>
          <div v-for="(dice, index) in inputs.dice" :key="dice.name" class="col-xs" id="bonustohitdice">
            <b-form-input
              :id="dice.name"
              class="diceinput input-override"
              :placeholder="'# of '+dice.name"
              :value="[dice.name].bonusCount"
              maxlength="4"
              @input="updateDiceCounts(dice.name, $event, 'bonusCount', index)">
            </b-form-input>
          </div>
        </b-input-group>
      </div>
      <div class="form-group row my-1">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text">Bane, Synaptic Static, etc</span>
          </b-input-group-prepend>
         <div v-for="(dice, index) in inputs.dice" :key="dice.name" class="col-xs" id="reductiontohitdice">
            <b-form-input
              :id="dice.name"
              class="diceinput input-override"
              :placeholder="'# of '+dice.name"
              :value="[dice.name].reductionCount"
              maxlength="4"
              @input="updateDiceCounts(dice.name, $event, 'reductionCount', index)">
            </b-form-input>
          </div>
        </b-input-group>
      </div>
      <div class="form-group row my-1">
        <b-input-group>
          <b-form-group style="margin-bottom: 0px;">
            <b-form-checkbox-group
              :id="'checkbox-group-1'+dataKey"
              v-model="selectedExtras"
              :options="extraOptions"
              :disabled="extraOptions.disabled"
              :name="'extraOptions-1-'+dataKey"
              @change="updateSingleValue('selectedExtras', $event)">
            </b-form-checkbox-group>
          </b-form-group>
        </b-input-group>
      </div>
      <div class="form-group row my-1">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text">Crit Bonuses</span>
          </b-input-group-prepend>
         <div v-for="(dice, index) in inputs.dice" :key="dice.name" class="col-xs" id="criticaldice">
            <b-form-input
              :id="dice.name"
              class="diceinput input-override"
              :placeholder="'# of '+dice.name"
              :value="[dice.name].criticalCount"
              maxlength="4"
              @input="updateDiceCounts(dice.name, $event, 'criticalCount', index)">
            </b-form-input>
          </div>
        </b-input-group>
      </div>
    </b-collapse>
  </div>
</template>
<script>
export default {
  props: {
    inputs: {
      type: Object,
      required: true
    },
    dataKey: {
      type: String,
      required: true
    },
    renderAdvanced: {
      type: Boolean
    }
  },
  watch: {
  },
  created() {
  },
  computed: {
  },
  methods: {
    updateDiceCounts(diceSize, event, diceDamageType, index=0) {
      this.$emit('updateDiceCounts', {
        refKey: this.dataKey,
        refDamageType: diceDamageType,
        refDiceSize: diceSize,
        dice: event,
        index: index
      })
    },
    updateSingleValue(keyName, event) {
      this.$emit('updateSingleValue', { refKey: this.dataKey, [keyName]: event })
    }
  },
  data: () => ({
    acval: '',
    hpval: '',
    attackbonusval: '',
    numberofattacksval: '',
    flatdamage: '',
    selectedExtras: [],
    d4: { value: 4, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d6: { value: 6, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d8: { value: 8, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d10: { value: 10, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d12: { value: 12, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    extraOptions: [
      { text: 'Elven Accuracy', value: 'elvenaccuracy' },
      { text: 'GWF', value: 'avgdamageGWF' },
      { text: 'Elemental Adept', value: 'avgdamageEA' },
      { text: 'Lucky (Halfling)', value: 'halflinglucky' },
      { text: 'GWM Crit Bonus', value: 'GWM', disabled: true },
    ]
  })
}
</script>
<style scoped>
::v-deep .custom-control-label {
  font-size: 12px;
  margin: auto;
}

::v-deep .boss {
  visibility: hidden;
}
</style>
