<template>
  <div>
    <div class="form-group row my-1 no-margin">
      <b-btn @click="isOpen = !isOpen" variant="secondary" class="btn btn-outline btn-sm col-lg">Show DPR Table</b-btn>
    </div>
    <b-collapse v-model="isOpen" class="col">
      <div v-for="(targetEntity, targetIndex) in $store.state[enemyArray]" :key="targetIndex">
        <b-table striped :caption-top="true" :items="targetEntityDprData(targetEntity)">
          <template #table-caption>Targeting: {{targetEntity.name}}</template>
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
    entity: {
      required: true
    },
    entityAttack: {
      required: true
    }
  },
  components: {
  },
  computed: {
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
        Hit: this.roundToPercent(this.entityAttack.base_hit_chance(targetEntity.armor_class, true)),
        HitA: this.roundToPercent(this.entityAttack.hit_chance_with_advantage(targetEntity.armor_class, true)),
        HitD: this.roundToPercent(this.entityAttack.hit_chance_with_disadvantage(targetEntity.armor_class, true)),
        BaseDPR: this.entityAttack.average_dpr(targetEntity.armor_class, false, 'base_hit_chance').toFixed(2),
        BuffedDPR: this.entityAttack.average_dpr(targetEntity.armor_class, true, 'hit_chance_with_features').toFixed(2)
      }]
    }
  },
  data: () => ({
    isOpen: false,
  })
}
</script>