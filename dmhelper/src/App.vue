<template>
  <div>
    <b-button> {{ testvar }}</b-button>
    <div>Chance to Hit: {{ chancetohit }}</div>
    <div>Chance to Save: {{ chancetosave }}</div>
    <div>Chance to Hit with Advantage: {{ chancetohitAdvantage }}</div>
    <div>Chance to hit with Disadvantage: {{ chancetohitDisadvantage }}</div>
    <div>Chance to hit with Elven Accuracy: {{ elvenaccuracy }}</div>
    <div>Chance to hit with Halfling Lucky: {{ halflinglucky }}</div>
    <div>Chance to hit with Halfing Lucky and Advantage: {{ halflingluckyadvantage }}</div>
    <div>Chance to hit with Halfling Lucky and Disadvantage: {{ halflingluckydisadvantage }}</div>
    <div>Chance to hit with Bless: {{ bless }}</div>
  </div>
</template>
<script>
// import testing from '@/components/testing.vue'
import dprFunctions from '@/assets/js/dprFunctions.js'
export default {
  components: {
    // testing
  },
  data: () => ({
    testvar: dprFunctions.foo(),
    chancetohit: dprFunctions.hit(20, 7),
    chancetosave: dprFunctions.save(20, 7),
    targetfailsave: dprFunctions.targetfailsave(20, 7),
    chancetohitAdvantage: dprFunctions.advantage(dprFunctions.hit(20, 7)),
    chancetohitDisadvantage: dprFunctions.disadvantage(dprFunctions.hit(20, 7)),
    elvenaccuracy: dprFunctions.elvenaccuracy(dprFunctions.hit(20, 7)),
    halflinglucky: dprFunctions.halflinglucky(dprFunctions.hit(20, 7)),
    halflingluckyadvantage: dprFunctions.halflingluckyadvantage(dprFunctions.hit(20, 7)),
    halflingluckydisadvantage: dprFunctions.halflingluckydisadvantage(dprFunctions.hit(20, 7)),
    bless: dprFunctions.bless(20, 7)
  })
}
</script>