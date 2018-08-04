import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)
    /* eslint-disable */
export const store = new Vuex.Store({
        state: {
            loadedPlayers: [{
                    imageUrl: 'https://cdn-04.independent.ie/sport/article31172892.ece/b282e/AUTOCROP/w620/2015-04-26_spo_8620492_I1.JPG',
                    id: 'afaj1',
                    title: 'Eddie Keher',
                    Dob: 09 / 10 / 1948,
                    date: new Date()
                },
                {
                    imageUrl: 'http://www.dublincity.ie/sites/default/files/galleries/sl099_kilkenny_players.jpg',
                    id: 'afaj2',
                    title: 'Ollie Walsh',
                    Dob: 09 / 10 / 1948,
                    date: new Date()
                },
                {
                    imageUrl: 'https://pbs.twimg.com/media/B9eAS1wIYAI8xK_.jpg',
                    id: 'afaj3',
                    title: 'Michael"Babs" Keating',
                    Dob: 09 / 10 / 1948,
                    date: new Date()
                },
                {
                    imageUrl: 'https://cdn-03.independent.ie/business/farming/article36418357.ece/a6d66/AUTOCROP/w620/2017-12-19_bus_37006425_I1.JPG',
                    id: 'afaj4',
                    title: 'Tony Doran',
                    Dob: 09 / 10 / 1948,
                    date: new Date()
                }
            ],
            user: null,
            loading: false,
            error: null
        },
        mutations: {
            setLoadedPlayers(state, payload) {
                state.loadedPlayers = payload
            },
            createPlayer(state, payload) {
                state.loadedPlayers.push(payload)
            },
            setUser(state, payload) {
                state.user = payload
            },
            setLoading(state, payload) {
                state.loading = payload
            },
            setError(state, payload) {
                state.error = payload
            },
            clearError(state) {
                state.error = null
            }
        },
        actions: {
            loadPlayers({ commit }) {
                commit('setLoading', true)
                firebase.database().ref('players').once('value')
                    .then((data) => {
                        const players = []
                        const obj = data.val()
                        for (let key in obj) {
                            players.push({
                                firstName: payload.firstName,
                                surName: payload.surName,
                                dob: payload.dob,
                                dod: payload.dod,
                                club: payload.club,
                                county: payload.county,
                                imageUrl: payload.imageUrl,
                                fieldPosition: payload.fieldPosition,
                                description: payload.description,
                                date: payload.date,
                                id: key
                            })
                        }
                        commit('setLoadedPlayers', player)
                        commit('setLoading', false)
                    })
                    .catch(
                        (error) => {
                            console.log(error)
                            commit('setLoading', false)
                        }
                    )
            },
            createPlayer({ commit, getters }, payload) {
                const player = {
                    firstName: payload.firstName,
                    surName: payload.surName,
                    dob: payload.dob,
                    dod: payload.dod,
                    club: payload.club,
                    county: payload.county,
                    imageUrl: payload.imageUrl,
                    fieldPosition: payload.fieldPosition,
                    description: payload.description,
                    date: payload.date.toISOString(),
                    creatorid: getters.user.id
                }
            },
            firebase.database().ref('players').push(player)
            .then((data) => {
                const key = data.key
                commit('createPlayer', {
                    ...player,
                    id: key
                })
            })
            .catch((error) => {
                console.log(error)
            })
            // Reach out to firebase and store it
        },
        signUserUp({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredPlayers: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        signUserIn({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredPlayers: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', { id: payload.uid, registeredPlayers: [] })
        },
        logout({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError({ commit }) {
            commit('clearError')
        }
    },
    getters: {
        loadedPlayers(state) {
            return state.loadedPlayers.sort((playerA, playerB) => {
                return playerA.date > playerB.date
            })
        },
        featuredPlayers(state, getters) {
            return getters.loadedPlayers.slice(0, 5)
        },
        loadedPlayer(state) {
            return (playerId) => {
                return state.loadedPlayers.find((player) => {
                    return player.id === playerId
                })
            }
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }
}