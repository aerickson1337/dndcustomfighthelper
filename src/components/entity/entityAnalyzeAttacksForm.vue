<template>
  <div>
    <h5>{{entity.name}}</h5>
    <div class="row">
      <div v-for="(entityAttack, entityAttackIndex) in entity.attacks" :key="entityAttackIndex" class="col-xs ml-2">
        <b-checkbox v-model="entityAttack.attack_enabled">
          {{entityAttack.attack_name != null ? entityAttack.attack_name : "No attack name provided"}}
        </b-checkbox>
      </div>
    </div>
    <div v-for="(entityAttack, entityAttackIndex) in entity.attacks" :key="entityAttackIndex" class="col-xs ml-2">
      <div v-if="entityAttack.attack_enabled">
        <b-table
          striped
          :caption-top="true"
          :items="AttackDprData(entityAttack)"
        >
          <template #table-caption>
            {{entityAttack.attack_name != null ? entityAttack.attack_name : "No attack name provided"}}
          </template>
          <template #cell(Hit)="data">
            {{ data.item.Hit }}%
          </template>
          <template #cell(HitA)="data">
            {{ data.item.HitA }}%
          </template>
          <template #cell(HitD)="data">
            {{ data.item.HitD }}%
          </template>
          <template #cell(BaseDPR)="data">
            {{ data.item.BaseDPR.toFixed(2) }}
          </template>
          <template #cell(BuffedDPR)="data">
            {{ data.item.BuffedDPR.toFixed(2) }}
          </template>
          <template slot="bottom-row" v-if="entity.attacks.length > 1">
            <td>
              (Average) (Total)
            </td>
            <td>
              ({{getAverage(AttackDprData(entityAttack).map(item => item.Hit)).toFixed(0)}}%)
              ({{getTotal(AttackDprData(entityAttack).map(item => item.Hit)).toFixed(0)}}%)
            </td>
            <td>
              ({{getAverage(AttackDprData(entityAttack).map(item => item.HitA)).toFixed(0)}}%)
              ({{getTotal(AttackDprData(entityAttack).map(item => item.HitA)).toFixed(0)}}%)
            </td>
            <td>
              ({{getAverage(AttackDprData(entityAttack).map(item => item.HitD)).toFixed(0)}}%)
              ({{getTotal(AttackDprData(entityAttack).map(item => item.HitD)).toFixed(0)}}%)
            </td>
            <td>
              ({{getAverage(AttackDprData(entityAttack).map(item => item.BaseDPR)).toFixed(2)}})
              ({{getTotal(AttackDprData(entityAttack).map(item => item.BaseDPR)).toFixed(2)}})
            </td>
            <td>
              ({{getAverage(AttackDprData(entityAttack).map(item => item.BuffedDPR)).toFixed(2)}})
              ({{getTotal(AttackDprData(entityAttack).map(item => item.BuffedDPR)).toFixed(2)}})
            </td>
          </template>
        </b-table>
      </div>
    </div>
    <hr/>
  </div>
</template>
<script>
export default {
  props: {
    entity: {
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
    },
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
    },
    AttackDprData(entityAttack) {
      return this.$store.state[this.enemyArray].map(enemy => {
        console.log(entityAttack.average_dpr(enemy.armor_class, false, 'base_hit_chance'))
        return {
          Target: enemy.name,
          Hit: this.roundToPercent(entityAttack.base_hit_chance(enemy.armor_class, true)),
          HitA: this.roundToPercent(entityAttack.hit_chance_with_advantage(enemy.armor_class, true)),
          HitD: this.roundToPercent(entityAttack.hit_chance_with_disadvantage(enemy.armor_class, true)),
          BaseDPR: entityAttack.average_dpr(enemy.armor_class, false, 'base_hit_chance'),
          BuffedDPR: entityAttack.average_dpr(enemy.armor_class, true, 'hit_chance_with_features')
        }
      })
    },
    getAverage(arrayToAverage) {
      return (arrayToAverage.reduce((a,b) => a + b) / (arrayToAverage.length))
    },
    getTotal(arrayToTotal) {
      return arrayToTotal.reduce((a,b) => a + b)
    }
  },
  data: () => ({
    isOpen: false,
    calculationMode: 'Average',
    calculationOptions: [
      'Average',
      'Total',
    ]
  })
}
</script>