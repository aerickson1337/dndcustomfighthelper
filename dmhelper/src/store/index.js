import Vue from 'vue'
import Vuex from 'vuex'
import Entity from '@/assets/js/entityClass.js'
import Fred from '@/assets/json/entities/fred.json'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      entities: [new Entity(Fred)]
    },
    mutations: {
      updateEntitesKeyValue (state, { key, value, entityIndex }) {
        console.log(key, value, entityIndex)
        state.entities[entityIndex][key] = value
      },
      updateEntitesDiceKeyValue (state, { key, value, entityIndex, diceType, diceIndex }) {
        console.log(key, value, entityIndex)
        state.entities[entityIndex].dice[diceIndex][diceType] = value
      }
    }
  })

export default store