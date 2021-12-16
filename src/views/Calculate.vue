<template>
  <div>
    <b-modal id="modal-1" @ok="$store.commit('saveAsJson', filename)">
      <b-input-group prepend="File Name">
        <b-form-input v-model="filename"></b-form-input>
      </b-input-group>
    </b-modal>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <b-btn variant="outline-info" v-b-modal.modal-1>Save Encounter to File</b-btn>
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
import entityForm from '@/components/entity/entityForm.vue'

// import * as d3 from "d3"
export default {
  components: {
    entityForm
  },
  computed: {
  },
  watch: {
    jsonFile() {
      this.filename = this.jsonFile.name.replace(/\.[^/.]+$/, "")
    }
  },
  methods: {
    loadFromFile() {
      let fr = new FileReader()
      fr.onload = (event) => {
          try {
            this.jsonData = JSON.parse(event.target.result)
            console.log('inside', event)
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
    filename: null,
    jsonFile: null,
    jsonData: {},
    isOpen: false,
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