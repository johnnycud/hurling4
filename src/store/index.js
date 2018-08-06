import Vue from 'vue'
import Vuex from 'vuex'
import player from './player'
import user from './user'
import shared from './shared'

/* eslint-disable */

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        player: player,
        user: user,
        shared: shared
    }
})