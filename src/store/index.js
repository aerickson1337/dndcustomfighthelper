import Vue from 'vue'
import Vuex from 'vuex'
import Entity from '@/assets/js/entityClass.js'
import Default from '@/assets/json/entities/default.json'
import { saveData } from '@/assets/js/helpers.js'
Vue.use(Vuex)

var default_players = {...Default}
default_players.entity_type = "players"

var default_monsters = {...Default}
default_monsters.entity_type = "monsters"

const store = new Vuex.Store({
    state: {
      players: [new Entity(default_players)],
      monsters: [new Entity(default_monsters)],
      jsonData: null
    },
    mutations: {
      addNewEntity(state, entity_type) {
        if (entity_type === "players") {
          state[entity_type].push(new Entity(default_players))
        } else if (entity_type === "monsters") {
          state[entity_type].push(new Entity(default_monsters))
        }
      },
      removeEntityAtIndex(state, payload) {
        state[payload.entity_type].splice(payload.index, 1)
      },
      saveAsJson(state, filename) {
        var currentState = { players: state.players, monsters: state.monsters }
        saveData(currentState, filename + '.json')
      },
      loadFromJson(state, payload) {
        if (payload.players != null) {
          state.players = payload.players.map(player => new Entity(player))
        }
        if (payload.monsters != null) {
          state.monsters = payload.monsters.map(monster => new Entity(monster))
        }
      }
    }
  })

export default store