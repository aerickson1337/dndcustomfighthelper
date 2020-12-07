<template>
  <div>
    <b-container fluid>
        <div class="form-group row my-1">
          <div class="col-xs">
            <b-input-group>
              <b-input-group-prepend>
                <span class="input-group-text">AC</span>
              </b-input-group-prepend>
              <b-form-input 
                  v-model="acval" 
                  type="number"
                  :number="true"
                  id="target-ac" 
                  size="xs" 
                  placeholder="Target AC"></b-form-input>
            </b-input-group>
          </div>
          <div class="col-xs">
            <b-input-group>
              <b-input-group-prepend>
                <span class="input-group-text">Attack Bonus</span>
              </b-input-group-prepend>
            <b-form-input
                v-model="attackbonusval"
                type="number"
                :number="true"
                id="attack-bonus"
                size="xs" 
                placeholder="Attack Bonus"></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div  class="row my-1">
          <b-input-group>
            <b-input-group-prepend>
              <span class="input-group-text">Damage Dice</span>
            </b-input-group-prepend>
            <div v-for="dice in diceTypes" :key="dice" class="col-xs">
              <b-form-input :id="dice" class="diceinput" :placeholder="'# of '+dice" :value="[dice].count" @input="updateDice(dice, $event)"></b-form-input>
            </div>
            <b-input-group-prepend>
              <span class="input-group-text">Flat Damage</span>
            </b-input-group-prepend>
            <b-form-input id="flatDamage" class="diceinput" placeholder="e.g. 5" v-model="flatdamage" :number="true"></b-form-input>
          </b-input-group>
        </div>
        <div class="row my-1">
          <div>
            <b-form-checkbox-group class="d-flex flex-row" id="checkbox-tohit-buffs" v-model="BBB" name="tohit-buffs">
              <b-form-checkbox value="bless">Bless</b-form-checkbox>
              <b-form-checkbox value="bane">Bane</b-form-checkbox>
              <b-form-checkbox value="bardic">Bardic</b-form-checkbox>
              <!-- <b-input-group>
                <b-input-group-prepend>
                  <span class="input-group-text">Bardic</span>
                </b-input-group-prepend>
                <b-form-input id="bardicdice" class="diceinput" size="xs" placeholder="d6" :value="bardicDice">
                </b-form-input>
              </b-input-group> -->
              <!-- {{ BBB }} -->
            </b-form-checkbox-group>
          </div>
        </div>
    </b-container>
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
    tohitbuffs: {
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
    BBB() {
      this.$emit('update:tohitbuffs', this.BBB)
    },
    flatdamage() {
      this.$emit('update:flatdamage', this.flatdamage)
    }
  },
  methods: {
    updateDice(dice, event) {
      this[dice].count = event
      this.$emit('updateDice', { [dice]: this[dice] })
    }
  },
  data: () => ({
    acval: '',
    diceTypes: ['d4','d6','d8','d10','d12'],
    d4: { value: 4, count: 0 },
    d6: { value: 6, count: 0 },
    d8: { value: 8, count: 0 },
    d10: { value: 10, count: 0 },
    d12: { value: 12, count: 0 },
    flatdamage: '',
    attackbonusval: '',
    bardicDice: '',
    BBB: []
  })
}
</script>
<style >
.diceinput {
    max-width: 100px;
}
</style>