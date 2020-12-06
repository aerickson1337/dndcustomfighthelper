<template>
  <div>
    <playerDprInput v-bind.sync="inputs"></playerDprInput>
    <div class="row">
      <div class="col-lg-5">Chance to Hit:</div>
      <div class="col-lg-5">{{ roundToPercent(chanceToHit) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance to Save:</div>
      <div class="col-lg-5">{{ roundToPercent(chanceToSave) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance for target to Save:</div>
      <div class="col-lg-5">{{ roundToPercent(targetChanceToFail) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance to Hit with Advantage:</div>
      <div class="col-lg-5">{{ roundToPercent(chanceToHitAdvantage) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance to hit with Disadvantage:</div>
      <div class="col-lg-5">{{ roundToPercent(chanceToHitDisadvantage) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance to hit with Elven Accuracy:</div>
      <div class="col-lg-5"> {{ roundToPercent(elvenAccuracy) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance to hit with Halfling Lucky:</div>
      <div class="col-lg-5">{{ roundToPercent(halflingLucky) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance to hit with Halfing Lucky and Advantage:</div>
      <div class="col-lg-5">{{ roundToPercent(halflingLuckyAdvantage) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance to hit with Halfling Lucky and Disadvantage:</div>
      <div class="col-lg-5">{{ roundToPercent(halflingLuckyDisadvantage) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Chance to hit with Bless:</div>
      <div class="col-lg-5">{{ roundToPercent(bless) }}%</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Average damage of a d6:</div>
      <div class="col-lg-5">{{ dmgd6 }}</div>
    </div>
  </div>
</template>
<script>
import playerDprInput from '@/components/playerDprInput.vue'
import dprFunctions from '@/assets/js/dprFunctions.js'
export default {
  components: {
    playerDprInput
  },
  computed: {
    chanceToHit() {
      return dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus)
    },
    chanceToSave() {
      return dprFunctions.save(this.inputs.acinput, this.inputs.attackbonus)
    },
    targetChanceToFail() {
      return dprFunctions.targetfailsave(this.inputs.acinput, this.inputs.attackbonus)
    },
    chanceToHitAdvantage() {
      return dprFunctions.advantage(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    chanceToHitDisadvantage() {
      return dprFunctions.disadvantage(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    elvenAccuracy() {
      return dprFunctions.elvenaccuracy(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    halflingLucky() {
      return dprFunctions.halflinglucky(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    halflingLuckyAdvantage() {
      return dprFunctions.halflingluckyadvantage(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    halflingLuckyDisadvantage() {
      return dprFunctions.halflingluckydisadvantage(dprFunctions.hit(this.inputs.acinput, this.inputs.attackbonus))
    },
    bless() {
      return dprFunctions.bless(this.inputs.acinput, this.inputs.attackbonus)
    }
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
    }
  },
  data: () => ({
    inputs: {
      acinput: 20,
      attackbonus: 7,
      dmgd6: 0,
      dmgd8: 0,
      dmgd10: 0,
      dmgd12: 0
    },
    dmgd6: dprFunctions.avgdamage(6)
  })
}
</script>