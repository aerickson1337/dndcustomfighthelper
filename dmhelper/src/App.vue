<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group row my-1">
          <b-input-group>
            <b-input-group-prepend>
              <span class="input-group-text">Player Count</span>
            </b-input-group-prepend>
            <b-form-input
              v-model.number="playerCount"
              type="number"
              id="playerCount"
              size="xs"
              class="ACABinput">
            </b-form-input>
          </b-input-group>
        </div>
        <div v-for="player in playerList" :key="player">
          <playerDprCalculations
            :player="player"
            :bossAC="bossAC"
            @updatePlayerAC="updatePlayerAC">
          </playerDprCalculations>
          <hr>
        </div>
      </div>
      <div class="col-lg-6">
        <bossDprCalculations
          :playerData="playerData"
          @updateBossAC="updateBossAC">
        </bossDprCalculations>
      </div>
    </div>
  </div>
</template>
<script>
import playerDprCalculations from '@/components/playerDprCalculations.vue'
import bossDprCalculations from '@/components/bossDprCalculations.vue'
export default {
  components: {
    playerDprCalculations,
    bossDprCalculations
  },
  computed: {
    playerList() {
      var playerList = []
      for (var i = 0; i < this.playerCount; i++) {
        playerList.push('player' + i)
      }
      return playerList
    },
    updatedPlayerData() {
      return this.playerData
    }
  },
  methods: {
    updateBossAC(event) {
      this.bossAC = event
    },
    updatePlayerAC(event) {
      this.$set(this.playerData, event.playerName, { playerAC: event.playerAC })
      // this.bossInputs.acinput = event
      // this.$emit('updatePlayerAC', this.bossInputs.acinput)
    }
  },
  data: () => ({
    playerCount: 1,
    playerData: {},
    bossAC: ''
  })
}
</script>