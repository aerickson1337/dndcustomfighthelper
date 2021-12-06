<template>
  <div>
    <div class="form-group row my-1 no-margin">
      <div class="col no-margin no-padding">
        <fieldInputGroup
          :entity="entityAttack"
          keyName="attack_name"
          prepend="Attack Name"
          placeholder="Attack Name"
          cssClass="input-override"
        >
        </fieldInputGroup>
      </div>
      <div class="col-xs">
        <fieldInputGroup
            :entity="entityAttack"
            keyName="attack_bonus"
            prepend="Attack Bonus"
            placeholder="E.g 7"
            cssClass="atkInput input-override"
        >
        </fieldInputGroup>
      </div>
      <div class="col-xs"> 
        <fieldInputGroup
            :entity="entityAttack"
            keyName="number_of_attacks"
            prepend="# of Attacks"
            placeholder="E.g 2"
            cssClass="atkInput input-override"
        >
        </fieldInputGroup>
      </div>
      <div class="col-xs">
        <b-btn
          variant="outline-warning"
          @click="entity.delete_attack_at_index(index)"
          v-if="(entity.attacks.length - 1) > 0"
          v-b-tooltip="'Delete Attack: ' + (entityAttack.attack_name != null ? entityAttack.attack_name : 'No Attack Name')"
        >
          <b-icon-trash/>
        </b-btn>
      </div>
    </div>
    <div class="form-group row my-1 no-margin">
      <diceInputGroup
        :entity="entityAttack"
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
            v-model.number="entityAttack.flat_damage_bonus">
          </b-form-input>
        </template>
      </diceInputGroup>
    </div>
    <div class="form-group row my-1 no-margin">
      <b-btn @click="visible = !visible" variant="secondary" class="btn btn-outline btn-sm col-lg">Advanced</b-btn>
    </div>
    <b-collapse v-model="visible" class="col">
      <div class="form-group row my-1">
        <diceInputGroup
          :entity="entityAttack"
          diceType="bonusCount"
          diceGroupPrepend="Bless, Bardic, etc"
        >
        </diceInputGroup>
      </div>
      <div class="form-group row my-1">
        <diceInputGroup
          :entity="entityAttack"
          diceType="reductionCount"
          diceGroupPrepend="Bane, Synaptic Static, etc"
        >
        </diceInputGroup>
      </div>
      <div class="form-group row my-1">
        <div v-for="extra in extraOptions" :key="extra.key" class="col">
          <b-checkbox
            v-model="entityAttack[extra.key]"
            :disabled="extra.disabled"
          >
            {{extra.text}}
          </b-checkbox>
        </div>
      </div>
    </b-collapse>
    <dprDisplay
      :entity="entity"
      :entityAttack="entityAttack"
    >
    </dprDisplay>
  </div>
</template>
<script>
import diceInputGroup from '@/components/inputs/diceInputGroup.vue'
import fieldInputGroup from '@/components/inputs/fieldInputGroup.vue'
import dprDisplay from '@/components/entity/entityDprDisplay.vue'

export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    entity: {
      required: true
    },
    entityAttack: {
      required: true
    }
  },
  components: {
    diceInputGroup,
    fieldInputGroup,
    dprDisplay,
  },
  watch: {
  },
  created() {
  },
  computed: {
  },
  methods: {
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

::v-deep .btn.btn-outline-info.active {
  background-color: gold;
  color: black;
}
</style>
