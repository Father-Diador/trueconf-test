import { createStore } from 'vuex'

export default createStore({
  state: {
    floors: [
      {id: 0, value: 1, name: "First Floor", active: false},
      {id: 1, value: 2, name: "Second Floor", active: false},
      {id: 2, value: 3, name: "Third Floor", active: false},
      {id: 3, value: 4, name: "Fourth Floor", active: false},
      {id: 4, value: 5, name: "Fifth Floor", active: false},
    ],
    elevators: [
      {id: 1, destination: ''},
    ],
    queue: [{id: '', value: ''}],
    queueEl: [{id: '1', value: '1'}],
  },
  getters: {
    GET_FLOOR_COUNT: state => {
      return state.floors;
    },
    GET_ELEVATOR_COUNT: state => {
      return state.elevators;
    },
    GET_QUEUE: state => {
      return state.queue;
    },
    GET_QUEUE_EL: state => {
      return state.queueEl;
    },
  },
  mutations: {
    SET_FLOORS: (state, payload) => {
      state.floors = payload;
    },
    SET_ELEVATORS: (state, payload) => {
      state.elevators = payload;
    },
    SET_QUEUE: (state, payload) => {
      state.queue = payload;
    },
    SET_QUEUE_EL: (state, payload) => {
      state.queueEl = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
