import { createStore } from 'vuex'

export default createStore({
  state: {
    floors: [
      {id: 1, value: 1, name: "First Floor", active: false},
      {id: 2, value: 2, name: "Second Floor", active: false},
      {id: 3, value: 3, name: "Third Floor", active: false},
      {id: 4, value: 4, name: "Fourth Floor", active: false},
      {id: 5, value: 5, name: "Fifth Floor", active: false},
    ],
    queue: [],
  },
  getters: {
    GET_FLOOR_COUNT: state => {
      return state.floors;
    },
    GET_QUEUE: state => {
      return state.queue;
    },
  },
  mutations: {
    SET_QUEUE: (state, payload) => {
      state.queue = payload;
    },
    SET_FLOORS: (state, payload) => {
      state.floors = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
