<template>
  <div>
    <h5>{{(team.charAt(0).toUpperCase() + team.slice(1))}} TTK on each target</h5>
      <b-table
        striped
        :caption-top="true"
        :items="FightTimeToDown"
      >
        <template #cell(base_taken)="data">
            {{ data.item.base_taken.toFixed(2) }}
        </template>
        <template #cell(buffed_taken)="data">
            {{ data.item.buffed_taken.toFixed(2) }}
        </template>
        <template #cell(base_TTK)="data">
            {{ data.item.base_TTK.toFixed(2) }}
        </template>
        <template #cell(buffed_TTK)="data">
            {{ data.item.buffed_TTK.toFixed(2) }}
        </template>
        <template slot="bottom-row">
            <td>
              Rounds before death if focused
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {{getTotal(FightTimeToDown.map(item => item.base_TTK)).toFixed(2)}}
            </td>
            <td>
              {{getTotal(FightTimeToDown.map(item => item.buffed_TTK)).toFixed(2)}}
            </td>
        </template>
      </b-table>
  </div>
</template>
<script>
export default {
  props: {
    team: {
      required: true
    }
  },
  components: {
  },
  computed: {
    enemyArray() {
      if (this.team === "players") {
        return "monsters"
      }
      return "players"
    },
    FightTimeToDown() {
      return this.$store.state[this.enemyArray].map(enemy => {
        var BaseDPR = []
        var BuffedDPR = []
        this.$store.state[this.team].forEach(entity => {
          entity.attacks.forEach(attack => {
            if (attack.attack_enabled) {
              BaseDPR.push(attack.average_dpr(enemy.armor_class, false, 'base_hit_chance'))
              BuffedDPR.push(attack.average_dpr(enemy.armor_class, false, 'hit_chance_with_features'))
            }
          })
        })
        return { 
            name: enemy.name,
            hit_points: enemy.hit_points,
            base_taken: BaseDPR.reduce((a,b) => a + b),
            buffed_taken: BuffedDPR.reduce((a,b) => a + b),
            base_TTK: (enemy.hit_points / BaseDPR.reduce((a,b) => a + b)),
            buffed_TTK: (enemy.hit_points / BuffedDPR.reduce((a,b) => a + b)),
        }
      })
    }
  },
  methods: {
    roundToPercent(num) {
      return Math.round(num * 100)
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