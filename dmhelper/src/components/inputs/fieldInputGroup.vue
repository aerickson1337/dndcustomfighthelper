<template>
    <b-input-group>
      <b-input-group-prepend>
        <span class="input-group-text">{{prependComputed}}</span>
      </b-input-group-prepend>
      <b-input
        v-model.number="entity[keyName]"
        :id="'entity-'+ keyName"
        :class="cssClass"
        :placeholder="placeholderComputed"
      >
      </b-input>
    </b-input-group>
</template>
<script>
  
export default {
  name: 'fieldInputGroup',
  props: {
    entity: {
      type: Object,
      required: true
    },
    keyName: {
      type: String,
      required: true
    },
    prepend: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    cssClass: {
      type: String,
      default: 'input-override'
    }
  },
  computed: {
      prependComputed() {
        if (this.prepend == null) {
          return this.keyName.charAt(0).toUpperCase() + this.keyName.slice(1)
        }
        return this.prepend
      },
      placeholderComputed() {
        if (this.placeholder == null) {
          return 'Character ' + this.keyName.charAt(0).toUpperCase() + this.keyName.slice(1)
        }
        return this.placeholder
      }
  }
}
</script>