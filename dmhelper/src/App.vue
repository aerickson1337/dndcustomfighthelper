<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <div v-for="player in players" :key="player">
          <testing :player="player"></testing>
          <hr>
        </div>
      </div>
      <div class="col-lg-6">
        <bossDprCalculations></bossDprCalculations>
      </div>
    </div>
  </div>
</template>
<script>
import testing from '@/components/testing.vue'
import bossDprCalculations from '@/components/bossDprCalculations.vue'
export default {
  components: {
    testing,
    bossDprCalculations
  },
  computed: {
  },
  methods: {
  },
  data: () => ({
    players: ['player1', 'player2']
  })
}
</script>