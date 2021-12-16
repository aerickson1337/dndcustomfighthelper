<template>
  <div>
    <div class="container-fluid">
      <div class="form-group row my-1 no-margin">
        <b-btn @click="visible = !visible" variant="secondary" class="btn btn-outline btn-sm col-lg">Attack Summary</b-btn>
      </div>
      <b-collapse v-model="visible" class="row">
        <div class="col-lg-6 w-50">
          <div v-for="(player, index) in $store.state.players" :key="index">
            <entityAnalyzeAttacksForm
              :entity="player"
            ></entityAnalyzeAttacksForm>
          </div>
        </div>
        <div class="col-lg-6 w-50">
          <div v-for="(monster, index) in $store.state.monsters" :key="index">
            <entityAnalyzeAttacksForm
              :entity="monster"
            ></entityAnalyzeAttacksForm>
          </div>
        </div>
      </b-collapse>
      <div class="form-group row my-1 no-margin">
        <b-btn @click="visible2 = !visible2" variant="secondary" class="btn btn-outline btn-sm col-lg">TTK Summary</b-btn>
      </div>
      <b-collapse v-model="visible2" class="row">
        <div class="col-lg-6 w-50">
          <entityAnalyzeTTK
            team="players"
          ></entityAnalyzeTTK>
        </div>
        <div class="col-lg-6 w-50">
          <entityAnalyzeTTK
            team="monsters"
          ></entityAnalyzeTTK>
        </div>
      </b-collapse>
    </div>
  </div>
</template>
<script>
import entityAnalyzeAttacksForm from '@/components/entity/entityAnalyzeAttacksForm.vue'
import entityAnalyzeTTK from '@/components/entity/entityAnalyzeTTK.vue'

export default {
  props: {
    entity: {
      required: true
    },
    entityAttack: {
      required: true
    }
  },
  components: {
    entityAnalyzeAttacksForm,
    entityAnalyzeTTK,
  },
  data: () => ({
    visible: true,
    visible2: true,
  })
}
</script>
