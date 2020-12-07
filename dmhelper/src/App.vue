<template>
  <div>
    <playerDprInput v-bind.sync="inputs" @updateDice="updateDice"></playerDprInput>
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
      <div class="col-lg-5">Average damage with selected damage dice:</div>
      <div class="col-lg-5">{{ averageDamage }}</div>
    </div>
    <div class="row">
      <div class="col-lg-5">Buff toggles chance:</div>
      <div class="col-lg-5">{{ roundToPercent(buffToggles) }}%</div>
    </div>
  </div>
</template>
<script>
import playerDprInput from '@/components/playerDprInput.vue'
import dprFunctions from '@/assets/js/dprFunctions.js'
import dprModifiers from '@/assets/js/dprModifiers.js'
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
    },
    buffToggles() {
      var bonusbuffs = []
      this.inputs.tohitbuffs.forEach(buff => {
        bonusbuffs.push(dprModifiers[buff]())
      })
      return dprFunctions.genericBBB(this.inputs.acinput, this.inputs.attackbonus, bonusbuffs)
    },
    averageDamage() {
      console.log(this.inputs.d4)
      var avgDamage = dprFunctions.avgdamage(this.inputs.d4.value, this.inputs.d4.count) + 
                      dprFunctions.avgdamage(this.inputs.d4.value, this.inputs.d6.count) + 
                      dprFunctions.avgdamage(this.inputs.d4.value, this.inputs.d8.count) + 
                      dprFunctions.avgdamage(this.inputs.d4.value, this.inputs.d10.count) + 
                      dprFunctions.avgdamage(this.inputs.d4.value, this.inputs.d12.count)
      return avgDamage
    }
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
    },
    updateDice(event) {
      var diceKey = Object.keys(event)[0]
      this.inputs[diceKey].count = event[diceKey].count
    }
  },
  data: () => ({
    inputs: {
      acinput: 20,
      attackbonus: 7,
      tohitbuffs: [],
      d4: { value: 4, count: 0 },
      d6: { value: 6, count: 0 },
      d8: { value: 8, count: 0 },
      d10: { value: 10, count: 0 },
      d12: { value: 12, count: 0 }
    }
  })
}
</script>