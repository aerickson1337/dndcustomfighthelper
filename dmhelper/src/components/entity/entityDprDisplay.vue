<template>
  <div>
    <div class="form-group row my-1 no-margin hide-for-boss">
      <b-btn v-b-toggle="'collapse-' + entity.entity_type + entity.name" variant="secondary" class="btn btn-outline btn-sm col-lg">Show DPR Table</b-btn>
    </div>
    <b-collapse :id="'collapse-' + entity.entity_type + entity.name" class="col">
      <div v-for="(entity, index) in $store.state[enemyArray]" :key="index">
        <b-table striped :caption-top="true" :items="targetEntityDprData(entity)">
          <template #table-caption>Targeting: {{entity.name}}</template>
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
    </b-collapse>
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
    },
    enemyArray() {
      if (this.entity.entity_type === "players") {
        return "monsters"
      }
      return "players"
    }
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
    },
    targetEntityDprData(targetEntity) {
      return [{
        Hit: this.roundToPercent(this.entity.base_hit_chance(targetEntity.armor_class, true)),
        HitA: this.roundToPercent(this.entity.hit_chance_with_advantage(targetEntity.armor_class, true)),
        HitD: this.roundToPercent(this.entity.hit_chance_with_disadvantage(targetEntity.armor_class, true)),
        BaseDPR: this.entity.average_dpr(targetEntity.armor_class, false, 'base_hit_chance').toFixed(2),
        BuffedDPR: this.entity.average_dpr(targetEntity.armor_class, true, 'hit_chance_with_features').toFixed(2)
      }]
    }
  },
  data: () => ({
  })
}
</script>