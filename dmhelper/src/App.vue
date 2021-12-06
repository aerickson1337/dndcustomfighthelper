<template>
  <div class="d-flex flex-column">
    <header class="ml-3">
      <b-btn variant="outline-info" @click="$store.commit('saveAsJson')">Save Encounter to File</b-btn>
      <b-btn variant="outline-info" @click="$refs.hiddenUploadButton.$el.click()">Load Encounter from File</b-btn>
      <b-form-file
        ref="hiddenUploadButton"
        hidden
        v-model="jsonFile"
        class="mt-3"
        plain
        accept=".json"
        @input="loadFromFile()"
      >
      </b-form-file>
    </header>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <!-- {{entity.whoami()}}
          <br>
          avg dmg: {{entity.average_damage()}}
          <br>
          unbuffed dpr: {{entity.average_dpr(17, false)}}
          <br>
          buffed dpr: {{entity.average_dpr(17, true, 'hit_chance_with_features')}} -->
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
          <div>
            <div v-for="(player, index) in $store.state.players" :key="index">
            <entityForm
              :index="index"
              :entity="player"
              :bossAC="bossAC"
              >
            </entityForm>
            </div>
          </div>
        </div>
        <div class="col-lg-6 w-50">
          <div>
            <div v-for="(monster, index) in $store.state.monsters" :key="index">
              <entityForm
                :index="index"
                :entity="monster"
                :bossAC="bossAC"
                >
              </entityForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import playerDprCalculations from '@/components/playerDprCalculations.vue'
// import bossDprCalculations from '@/components/bossDprCalculations.vue'
// import nerdShit from '@/components/nerdshit.vue'
// import BossDprCalculations from './components/bossDprCalculations.vue'
import entityForm from '@/components/entity/entityForm.vue'

// import * as d3 from "d3"
export default {
  components: {
    // playerDprCalculations,
    // bossDprCalculations,
    // nerdShit,
    // BossDprCalculations,
    entityForm
  },
  computed: {
  },
  watch: {
  },
  methods: {
    loadFromFile() {
      let fr = new FileReader()
      fr.onload = (event) => {
          try {
            this.jsonData = JSON.parse(event.target.result)
            console.log('inside', this.jsonData)
          } catch (ex) {
            console.log('exception when trying to parse provided json file: ' + ex)
            return null
          }
      }
      fr.onloadend = () => {
        this.$store.commit('loadFromJson', this.jsonData)
      }
      fr.readAsText(this.jsonFile)
    }
  },
  data: () => ({
    bossAC: 16,
    bossHP: 0,
    bossData: {},
    jsonFile: null,
    jsonData: {}
  })
}
</script>
<style>
.no-margin {
  margin-left: 0px;
  margin-right: 0px;
}
.no-padding {
  padding: 0 0 0 0;
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
  max-width: 125px;
  color: white;
}
.atkInput {
  max-width: 60px;
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