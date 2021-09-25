<template>
  <div class="root">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <!-- <nerdShit
            :playerData="playerData"
            :bossData="bossData"
            :bossAC="bossAC"
            :bossHP="bossHP">
          </nerdShit> -->
        </div>
      </div>
    </div>
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
              @sendPlayerData="sendPlayerData">
            </playerDprCalculations>
            <hr class="line-breaker"/>
          </div>
        </div>
        <div class="col-lg-6 w-50">
          <bossDprCalculations
            :playerData="playerData"
            @sendBossData="sendBossData"
            @updateBossStat="updateBossStat">
          </bossDprCalculations>
        </div>
      </div>
    </div>
    <!-- <b-button @click="setJsonData()">Dump JSON</b-button>
    <b-button @click="loadJsonData()" class="ml-2">Load JSON</b-button>
    <br>
    <textarea v-model="jsonData" rows="8" cols="80"></textarea> -->
  </div>
</template>
<script>
import playerDprCalculations from '@/components/playerDprCalculations.vue'
import bossDprCalculations from '@/components/bossDprCalculations.vue'
// import nerdShit from '@/components/nerdshit.vue'
import BossDprCalculations from './components/bossDprCalculations.vue'
import Entity from '@/assets/js/entityClass.js'
// import * as d3 from "d3"
export default {
  created() {
    let entity = new Entity({name: 'dumbass', gold: 2000})
    console.log(entity)
  },
  components: {
    playerDprCalculations,
    bossDprCalculations,
    // nerdShit,
    BossDprCalculations
  },
  computed: {
    playerList() {
      var playerList = []
      for (var i = 0; i < this.playerCount; i++) {
        playerList.push('Player_' + i)
      }
      return playerList
    }
  },
  watch: {
    playerList() {
      console.log('changed!')
      Object.keys(this.playerData).forEach(playerName => {
        if (!(this.playerList.includes(playerName))) {
          this.$delete(this.playerData, playerName)
        }
      })
    },
    bossData() {
    }
  },
  methods: {
    updateBossStat(event) {
      this[event.refKey] = event.newVal
    },
    sendBossData(event) {
      this.bossData = Object.assign({}, event)
    },
    sendPlayerData(event) {
      this.playerData = Object.assign({}, this.playerData, event)
    },
    setJsonData() {
      this.jsonData = JSON.stringify({ 
        data: { 
          playerData: this.playerData,
          bossData: this.bossData
        }
      })
    },
    loadJsonData() {
      var tempData = JSON.parse(this.jsonData)
      this.playerData = tempData.data.playerData
      this.bossData = tempData.data.bossData
    }
  },
  data: () => ({
    playerCount: 1,
    playerData: {},
    bossAC: 16,
    bossHP: 0,
    bossData: {},
    jsonData: null
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
[class^="swal2"] {
  color: white;
}
[class^="swal2"] .swal2-title {
  color: white
}
.closeButton {
  color: black;
  width: 30px;
  height: 30px;
}
.closeOutline {
  background: #303030;
  width: 27px;
  height: 27px;
  border-radius: 2px;
  box-shadow: 2px 2px 1px 1px black;
}
.closeOutline:hover {
  background: #252525;
  width: 27px;
  height: 27px;
  border-radius: 2px;
  box-shadow: 2px 2px 1px 1px black;
}
</style>