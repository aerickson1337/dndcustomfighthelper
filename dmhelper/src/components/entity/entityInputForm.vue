<template>
  <div>
     {{index}} {{armor_class}}
    <div class="form-group row my-1 no-margin">
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">AC</span>
        </b-input-group-prepend>
        <div>
          <b-input
            v-model.number="armor_class"
            id="entity-ac"
            size="xs"
            class="ACABinput input-override"
            placeholder="Entity AC"
            @input="$store.commit('updateEntitesKeyValue', { key: 'armor_class', value: $event, entityIndex: index })">
          </b-input>
        </div>
        <b-input-group-prepend>
          <span class="input-group-text">HP</span>
        </b-input-group-prepend>
        <b-input
          v-model.number="hit_points"
          id="entity-HP"
          size="xs"
          placeholder="Entity HP"
          class="ACABinput input-override"
          @input="$store.commit('updateEntitesKeyValue', { key: 'hit_points', value: $event, entityIndex: index })">
        </b-input>
        <b-input-group-prepend>
          <span class="input-group-text">Attack Bonus</span>
        </b-input-group-prepend>
        <b-input
          v-model.number="attack_bonus"
          id="attack-bonus"
          size="xs"
          class="ACABinput input-override"
          placeholder="e.g. 7"
          @input="$store.commit('updateEntitesKeyValue', { key: 'attack_bonus', value: $event, entityIndex: index })">
        </b-input>
        </b-input-group>
      <b-input-group>
        <b-input-group-prepend>
          <span class="input-group-text">Damage Dice</span>
        </b-input-group-prepend>
        <div v-for="(dice, diceIndex) in entity.dice" :key="dice.name" class="col-xs">
          <b-input
            :id="dice.name"
            class="diceinput input-override"
            :placeholder="'# of '+dice.name"
            v-model.number="[dice.name].damageCount"
            maxlength="4"
            @input="$store.commit('updateEntitesDiceKeyValue', 
                { 
                    key: 'attack_bonus',
                    value: $event,
                    entityIndex: index,
                    diceType: 'damageCount',
                    diceIndex: diceIndex
                }
            )"
          >
          </b-input>
        </div>
        <b-input-group-prepend>
          <span class="input-group-text">Flat</span>
        </b-input-group-prepend>
        <b-form-input
          id="flatDamage"
          class="col input-override"
          placeholder="e.g. 5"
          v-model.number="flatdamage"
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
          <div v-for="(dice, diceIndex) in entity.dice" :key="dice.name" class="col-xs" id="bonustohitdice">
            <b-form-input
              :id="dice.name"
              class="diceinput input-override"
              :placeholder="'# of '+dice.name"
              v-model.number="[dice.name].bonusCount"
              maxlength="4"
              @input="updateDiceCounts(dice.name, $event, 'bonusCount', diceIndex)">
            </b-form-input>
          </div>
        </b-input-group>
      </div>
      <div class="form-group row my-1">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text">Bane, Synaptic Static, etc</span>
          </b-input-group-prepend>
         <div v-for="(dice, diceIndex) in entity.dice" :key="dice.name" class="col-xs" id="reductiontohitdice">
            <b-form-input
              :id="dice.name"
              class="diceinput input-override"
              :placeholder="'# of '+dice.name"
              :value="[dice.name].reductionCount"
              maxlength="4"
              @input="updateDiceCounts(dice.name, $event, 'reductionCount', diceIndex)">
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
         <div v-for="(dice, diceIndex) in entity.dice" :key="dice.name" class="col-xs" id="criticaldice">
            <b-form-input
              :id="dice.name"
              class="diceinput input-override"
              :placeholder="'# of '+dice.name"
              :value="[dice.name].criticalCount"
              maxlength="4"
              @input="updateDiceCounts(dice.name, $event, 'criticalCount', diceIndex)">
            </b-form-input>
          </div>
        </b-input-group>
      </div>
    </b-collapse>
  </div>
</template>
<script>
// import {mapState} from 'vuex'

export default {
  props: {
    entity: {
      type: Object,
      required: true
    },
    index: {
        type: Number,
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
  methods: {
  },
  data: () => ({
    armor_class: this.$store.state.entities[this.index].armor_class,
    hit_points: this.$store.state.entities[this.index].hit_points,
    attack_bonus: this.$store.state.entities[this.index].attack_bonus,
    number_of_attacks: this.$store.state.entities[this.index].number_of_attacks,
    damage_dice: this.$store.state.entities[this.index].damage_dice,
    flat_damage_bonus: this.$store.state.entities[this.index].flat_damage_bonus,
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
