<template>
  <div>
    <b-table striped :items="tableItems">
      <template #cell(Hit)="data">
        {{ data.item.Hit }}%
      </template>
      <template #cell(HitA)="data">
        {{ data.item.HitA }}%
      </template>
      <template #cell(HitD)="data">
        {{ data.item.HitD }}%
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  props: {
    targetAC: {
      type: Number,
      required: true,
      default: 16
    },
    entity: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  computed: {
    tableItems() {
      return [{
        Hit: this.roundToPercent(this.entity.base_hit_chance(this.targetAC, true)),
        HitA: this.roundToPercent(this.entity.hit_chance_with_advantage(this.targetAC, true)),
        HitD: this.roundToPercent(this.entity.hit_chance_with_disadvantage(this.targetAC, true)),
        BaseDPR: this.entity.average_dpr(this.targetAC, false, 'base_hit_chance').toFixed(2),
        BuffedDPR: this.entity.average_dpr(this.targetAC, true, 'hit_chance_with_features').toFixed(2)
      }]
    }
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
    }
  },
  data: () => ({
  })
}
</script>