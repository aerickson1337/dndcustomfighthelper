<template>
  <div class="col-lg-5">
    <div class="form-group row my-1">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">AC</span>
        </b-input-group-prepend>
        <b-form-input
            v-model.number="acval" 
            type="number"
            id="target-ac" 
            size="xs"
            class="ACABinput"
            placeholder="Target AC"></b-form-input>
        <b-input-group-prepend>
          <span class="input-group-text">Attack Bonus</span>
        </b-input-group-prepend>
        <b-form-input
            v-model.number="attackbonusval"
            type="number"
            id="attack-bonus"
            size="xs"
            class="ACABinput"
            placeholder="Attack Bonus">
        </b-form-input>
        <b-input-group-prepend>
          <span class="input-group-text">Attacks</span>
        </b-input-group-prepend>
        <b-form-input
            v-model.number="numberofattacksval"
            type="number"
            id="number-of-attacks"
            size="xs"
            class="ACABinput"
            placeholder="# of Attacks">
        </b-form-input>
      </b-input-group>
    </div>
    <div class="row my-1">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">Damage Dice</span>
        </b-input-group-prepend>
        <div v-for="dice in diceTypes" :key="dice" class="col-xs">
          <b-form-input
            :id="dice"
            class="diceinput"
            :placeholder="'# of '+dice"
            :value="[dice].damageCount"
            maxlength="4"
            @input="updateDamageDice(dice, $event)">
          </b-form-input>
        </div>
        <b-input-group-prepend>
          <span class="input-group-text">Flat</span>
        </b-input-group-prepend>
        <b-form-input id="flatDamage" class="diceinput" placeholder="e.g. 5" v-model="flatdamage" :number="true"></b-form-input>
      </b-input-group>
    </div>
    <div class="row my-1">
      <b-btn v-b-toggle.collapse1 variant="secondary" class="btn btn-outline btn-sm col-lg-10">Advanced</b-btn>
    </div>
    <b-collapse id="collapse1" visible>
      <div class="row my-1">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text">Bless, bardic, etc</span>
          </b-input-group-prepend>
          <div v-for="dice in diceTypes" :key="dice" class="col-xs" id="bonustohitdice">
            <b-form-input
              :id="dice"
              class="diceinput"
              :placeholder="'# of '+dice"
              :value="[dice].bonusCount"
              maxlength="4"
              @input="updateBonusDice(dice, $event)">
            </b-form-input>
          </div>
        </b-input-group>
      </div>
      <div class="row my-1">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text">Bane, Synaptic Static, etc</span>
          </b-input-group-prepend>
          <div v-for="dice in diceTypes" :key="dice" class="col-xs" id="reductiontohitdice">
            <b-form-input
            :id="dice"
            class="diceinput"
            :placeholder="'# of '+dice"
            :value="[dice].reductionCount"
            maxlength="4"
            @input="updateReductionDice(dice, $event)">
            </b-form-input>
          </div>
        </b-input-group>
      </div>
      <div class="row my-1">
        <b-input-group>
          <b-form-group style="margin-bottom: 0px;">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selectedExtras"
              :options="extraOptions"
              name="extraOptions-1"
            ></b-form-checkbox-group>
          </b-form-group>
        </b-input-group>
      </div>
      <div class="row my-1">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text">Crit Bonuses</span>
          </b-input-group-prepend>
          <div v-for="dice in diceTypes" :key="dice" class="col-xs" id="critbonusdice">
            <b-form-input
              :id="dice"
              class="diceinput"
              :placeholder="'# of '+dice"
              :value="[dice].criticalCount"
              maxlength="4"
              @input="updateCriticalDice(dice, $event)">
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
    acinput: {
      type: Number,
      required: true
    },
    attackbonus: {
      type: Number,
      required: true
    },
    numberofattacks: {
      type: Number,
      required: true
    },
    diceTypes: {
      type: Array,
      required: true
    }
  },
  watch: {
    acval() {
      this.$emit('update:acinput', this.acval)
    },
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
    updateDamageDice(dice, event) {
      this[dice].damageCount = event
      this.$emit('updateDamageDice', { [dice]: this[dice] })
    },
    updateBonusDice(dice, event) {
      this[dice].bonusCount = event
      this.$emit('updateBonusDice', { [dice]: this[dice] })
    },
    updateReductionDice(dice, event) {
      this[dice].reductionCount = event
      this.$emit('updateReductionDice', { [dice]: this[dice] })
    },
    updateCriticalDice(dice, event) {
      this[dice].reductionCount = event
      this.$emit('updateCriticalDice', { [dice]: this[dice] })
    }
  },
  data: () => ({
    acval: '',
    attackbonusval: '',
    numberofattacksval: '',
    flatdamage: '',
    d4: { value: 4, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d6: { value: 6, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d8: { value: 8, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d10: { value: 10, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    d12: { value: 12, damageCount: 0, bonusCount: 0, reductionCount: 0, criticalCount: 0 },
    selectedExtras: [],
    extraOptions: [
      { text: 'Elven Accuracy', value: 'elvenaccuracy' },
      { text: 'GWF', value: 'avgdamageGWF' },
      { text: 'Elemental Adept', value: 'avgdamageEA' },
      { text: 'GWM Crit Bonus', value: 'GWM' },
      { text: 'Lucky (Halfling)', value: 'halflinglucky' }
    ],
    collapsed: false
  })
}
</script>
<style >
.diceinput {
  max-width: 80px;
}
.ACABinput {
  max-width: 136px;
}
.input-group-text {
  color: #FFFFFF;
}
</style>