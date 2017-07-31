import * as types from './mutation-types.js'

const matutaions = {
  [types.SET_ALLSHOTS] (state, allshots) {
    state.allshots = allshots
  },
  [types.SET_MYSHOTS] (state, myshots) {
    state.myshots = myshots
  },
  [types.SET_INVITE] (state, invite) {
    state.invite = invite
  }
}

export default matutaions
