<template>
  <div>
    <div class="form-group row my-1 no-margin">
      <div class="col no-margin no-padding">
        <fieldInputGroup
          :entity="entity"
          keyName="name"
          :placeholder="entity.pretty_entity_type() + ' name'"
          cssClass="input-override"
        >
        </fieldInputGroup>
      </div>
      <div class="col-xs"> 
        <fieldInputGroup
            :entity="entity"
            keyName="armor_class"
            prepend="AC"
            :placeholder="entity.pretty_entity_type() + ' AC'"
            cssClass="ACABinput input-override"
        >
        </fieldInputGroup>
      </div>
      <div class="col-xs"> 
        <fieldInputGroup
            :entity="entity"
            keyName="hit_points"
            prepend="HP"
            :placeholder="entity.pretty_entity_type() + ' HP'"
            cssClass="ACABinput input-override"
        >
        </fieldInputGroup>
      </div>
      <b-btn
      v-if="$store.state[entity.entity_type].length > 1"
      variant="outline-warning"
      @click="removeEntity()"
      v-b-tooltip="'Delete ' + entity.pretty_entity_type() + ': ' + (entity.name != '' ? entity.name : 'No Name')"
      >
        <b-icon-trash/>
      </b-btn>
    </div>
    <div v-for="(entityAttack, attackIndex) in entity.attacks" :key="attackIndex">
      <entityAttackInputForm
        :entity="entity"
        :entityAttack="entityAttack"
        :index="index"
      >
      </entityAttackInputForm>
    </div>
  </div>
</template>
<script>
import fieldInputGroup from '@/components/inputs/fieldInputGroup.vue'
import entityAttackInputForm from '@/components/entity/entityAttackInputForm.vue'
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
    fieldInputGroup,
    entityAttackInputForm,
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
    }
  },
  data: () => ({
    selectedExtras: '',
    visible: false,
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
</style>
