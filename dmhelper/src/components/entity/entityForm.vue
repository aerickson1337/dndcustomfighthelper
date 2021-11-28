<template>
  <div>
    <entityInputs
      :index="index"
      :entity="entity"
    >
    </entityInputs>
    <dprDisplay
      :targetAC="bossAC"
      :entity="entity"
    >
    </dprDisplay>
  </div>
</template>
<script>
import entityInputs from '@/components/entity/entityInputForm.vue'
import dprDisplay from '@/components/entity/entityDprDisplay.vue'
export default {
  components: {
    entityInputs,
    dprDisplay
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