<template>
  <div>
      {{index}}
    <playerDprInput
      :entity="entity"
      :index="index"
      :renderAdvanced="true"
    >
    </playerDprInput>
    <dprDisplay
      :entity="entity"
      :targetAC="bossAC">
    </dprDisplay>
  </div>
</template>
<script>
import playerDprInput from '@/components/entity/entityInputForm.vue'
import dprDisplay from '@/components/entity/entityDprDisplay.vue'
export default {
  components: {
    playerDprInput,
    dprDisplay
  },
  props: {
    entity: {
      required: true
    },
    index: {
      required: true
    }
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