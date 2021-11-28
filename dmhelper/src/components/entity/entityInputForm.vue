<template>
  <div>
    <div class="form-group row my-1 no-margin">
      <div class="col no-margin no-padding">
        <fieldInputGroup
          :entity="entity"
          keyName="name"
          :placeholder="upperCaseFirstLetter(entity.entity_type) + ' name'"
          cssClass="input-override"
        >
        </fieldInputGroup>
      </div>
      <b-btn
      v-if="$store.state[entity.entity_type].length > 1"
      variant="outline-warning"
      @click="removeEntity()"
      >
        Delete
      </b-btn>
    </div>
    <div class="form-group row my-1 no-margin">
      <div class="col-xs"> 
        <fieldInputGroup
            :entity="entity"
            keyName="armor_class"
            prepend="AC"
            :placeholder="upperCaseFirstLetter(entity.entity_type) + ' AC'"
            cssClass="ACABinput input-override"
        >
        </fieldInputGroup>
      </div>
      <div class="col-xs"> 
        <fieldInputGroup
            :entity="entity"
            keyName="hit_points"
            prepend="HP"
            :placeholder="upperCaseFirstLetter(entity.entity_type) + ' HP'"
            cssClass="ACABinput input-override"
        >
        </fieldInputGroup>
      </div>
      <div class="col-xs"> 
        <fieldInputGroup
            :entity="entity"
            keyName="attack_bonus"
            prepend="Attack Bonus"
            placeholder="E.g 7"
            cssClass="atkInput input-override"
        >
        </fieldInputGroup>
      </div>
      <div class="col no-margin no-padding"> 
        <fieldInputGroup
            :entity="entity"
            keyName="number_of_attacks"
            prepend="# of Attacks"
            placeholder="E.g 2"
            cssClass="input-override"
        >
        </fieldInputGroup>
      </div>
    </div>
    <div class="form-group row my-1 no-margin">
      <diceInputGroup
        :entity="entity"
        diceType="damageCount"
        diceGroupPrepend="Damage Dice"
      >
        <template #footer>
          <b-input-group-prepend>
            <span class="input-group-text">Flat</span>
          </b-input-group-prepend>
          <b-form-input
            id="flat_damage_bonus"
            class="col input-override"
            placeholder="e.g. 5"
            v-model.number="entity.flat_damage_bonus">
          </b-form-input>
        </template>
      </diceInputGroup>
    </div>
    <div class="form-group row my-1 no-margin hide-for-boss">
      <b-btn v-b-toggle="'collapse-' + index + entity.entity_type + entity.name" variant="secondary" class="btn btn-outline btn-sm col-lg">Advanced</b-btn>
    </div>
    <b-collapse :id="'collapse-' + index + entity.entity_type + entity.name" class="col">
      <div class="form-group row my-1">
        <diceInputGroup
          :entity="entity"
          diceType="bonusCount"
          diceGroupPrepend="Bless, Bardic, etc"
        >
        </diceInputGroup>
      </div>
      <div class="form-group row my-1">
        <diceInputGroup
          :entity="entity"
          diceType="reductionCount"
          diceGroupPrepend="Bane, Synaptic Static, etc"
        >
        </diceInputGroup>
      </div>
      <div class="form-group row my-1">
        <div v-for="extra in extraOptions" :key="extra.key" class="col">
          <b-checkbox
            v-model="entity[extra.key]"
            :disabled="extra.disabled"
          >
            {{extra.text}}
          </b-checkbox>
        </div>
      </div>
    </b-collapse>
  </div>
</template>
<script>
import diceInputGroup from '@/components/inputs/diceInputGroup.vue'
import fieldInputGroup from '@/components/inputs/fieldInputGroup.vue'
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    entity: {
      required: true
    }
  },
  components: {
    diceInputGroup,
    fieldInputGroup
  },
  watch: {
  },
  created() {
  },
  computed: {
  },
  methods: {
    removeEntity() {
      var payload = { index: this.index, entity_type: this.entity.entity_type }
      this.$store.commit('removeEntityAtIndex', payload)
    },
    upperCaseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  },
  data: () => ({
    selectedExtras: '',
    extraOptions: [
      { text: 'Elven Accuracy', key: 'has_elven_accuracy' },
      { text: 'Great Weapon Fighting', key: 'has_great_weapon_fighting' },
      { text: 'Elemental Adept', key: 'has_elemental_adept' },
      { text: 'Lucky (Halfling)', key: 'has_halfling_lucky' },
      { text: 'GWM Crit Bonus', key: 'has_great_weapon_master_crit_bonus', disabled: true },
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
