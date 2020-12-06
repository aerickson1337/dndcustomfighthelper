<template>
  <div>
    <b-container fluid>
        <div class="form-group row my-1">
          <div class="col-xs">
            <b-form-input 
                v-model="acval" 
                type="number"
                :number="true"
                id="character-ac" 
                size="xs" 
                placeholder="Character AC"></b-form-input>
          </div>
          <div class="col-xs">
            <b-form-input
                v-model="attackbonusval" 
                type="number"
                :number="true"
                id="attack-bonus" 
                size="xs" 
                placeholder="Attack Bonus"></b-form-input>
          </div>
        </div>
        <div  class="row my-1">
          <div v-for="dice in diceTypes" :key="dice" class="col-xs">
            <b-form-input :id="dice" class="diceinput" :placeholder="'# of '+dice"></b-form-input>
          </div>
        </div>
        <div  class="row my-1">
          <div class="col-xs">
            <b-form-checkbox-group id="checkbox-tohit-buffs" v-model="BBB" name="tohit-buffs">
              <b-form-checkbox value="bless">Bless</b-form-checkbox>
              <b-form-checkbox value="bane">Bane</b-form-checkbox>
              <b-form-checkbox value="bardic">Bardic</b-form-checkbox><b-input class="diceinput" value="d6"></b-input>
              {{ BBB }}
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
    }
  },
  methods: {
  },
  data: () => ({
    acval: 10,
    diceTypes: ['d4','d6','d8','d10','d12'],
    attackbonusval: 7,
    BBB: []
  })
}
</script>
<style >
.diceinput {
    max-width: 100px;
}
</style>