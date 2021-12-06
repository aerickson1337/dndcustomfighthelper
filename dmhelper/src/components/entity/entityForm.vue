<template>
  <div>
    <entityInputs
      :index="index"
      :entity="entity"
    >
    </entityInputs>
    <b-btn
      @click="entity.init_new_attack()"
      variant="outline-info"
    >
      Add New Attack
    </b-btn>
    <b-btn
      variant="outline-info"
      @click="$store.commit('addNewEntity', entity.entity_type)"
      v-if="($store.state[entity.entity_type].length - 1) === index"
    >
      Add {{entity.pretty_entity_type()}}
    </b-btn>
  </div>
</template>
<script>
import entityInputs from '@/components/entity/entityInputForm.vue'
export default {
  components: {
    entityInputs,
  },
  props: {
    index: {
      required: true
    },
    bossAC: {
      required: true
    },
    entity: {}
  },
  computed: {
  },
  created() {
  },
  methods: {
  },
  watch: {
  },
  data: () => ({
  })
}
</script>