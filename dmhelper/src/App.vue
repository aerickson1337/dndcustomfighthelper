<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 w-50">
        <div class="form-group row my-1 no-margin">
          <b-input-group>
            <b-input-group-prepend>
              <span class="input-group-text">Player Count</span>
            </b-input-group-prepend>
            <b-form-input
              v-model.number="playerCount"
              id="playerCount"
              size="xs"
              class="ACABinput input-override">
            </b-form-input>
          </b-input-group>
        </div>
        <div v-for="player in playerList" :key="player">
          <playerDprCalculations
            :player="player"
            :bossAC="bossAC"
            @updatePlayerAC="updatePlayerAC">
          </playerDprCalculations>
          <hr class="line-breaker"/>
        </div>
      </div>
      <div class="col-lg-6 w-50">
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
    bossAC: 16
  })
}
</script>
<style>
.no-margin {
  margin-left: 0px;
  margin-right: 0px;
}
.line-breaker {
  border-top: 1px solid white;
}
.input-override {
  background-color: #303030;
  color: white;
}
.input-override:focus {
  background-color: #202020;
  color: white;
}
.input-override:hover {
  background-color: #202020;
}
.diceinput {
  max-width: 80px;
  color: white;
}
.ACABinput {
  max-width: 136px;
  color: white;
}
.input-group-text {
  color: #FFFFFF;
}
</style>