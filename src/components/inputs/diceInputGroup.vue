<template>
    <b-input-group>
      <b-input-group-prepend>
        <span class="input-group-text">{{diceGroupPrepend}}</span>
      </b-input-group-prepend>
      <div v-for="(dice, diceIndex) in entity.dice" :key="dice.name" class="col-xs">
        <b-input
            :id="dice.name"
            class="diceinput input-override"
            :placeholder="'# of '+dice.name"
            v-model.number="entity.dice[diceIndex][diceType]"
        >
        </b-input>
      </div>
        <slot name="footer"></slot>
    </b-input-group>
</template>
<script>
  
export default {
  name: 'diceInputGroup',
  props: {
    entity: {
      required: true
    },
    diceType: {
      type: String,
      required: true
    },
    diceGroupPrepend: {
      type: String,
      default: "Unnamed dice group"
    }
  },
}
</script>