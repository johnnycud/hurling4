import * as firebase from 'firebase/app'
/* eslint-disable */
export default {
    state: {
        user: null
    },
    mutations: {
        registerUserForPlayer(state, payload) {
            const id = payload.id
            if (state.user.registeredPlayers.findIndex(meetup => meetup.id === id) >= 0) {
                return
            }
            state.user.registeredPlayers.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserFromPlayer(state, payload) {
            const registeredPlayers = state.user.registeredPlayers
            registeredPlayers.splice(registeredPlayers.findIndex(p => player.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        registerUserForPlayer({ commit, getters }, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/')
                .push(payload)
                .then(data => {
                    commit('setLoading', false)
                    commit('registerUserForPlayer', { id: payload, fbKey: data.key })
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        unregisterUserFromPlayer({ commit, getters }, payload) {
            commit('setLoading', true)
            const user = getters.user
            if (!user.fbKeys) {
                return
            }
            const fbKey = user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
                .remove()
                .then(() => {
                    commit('setLoading', false)
                    commit('unregisterUserFromPlayer', payload)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
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
                            registeredPlayers: [],
                            fbKeys: {}
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
                            registeredPlayers: [],
                            fbKeys: {}
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
            commit('setUser', {
                id: payload.uid,
                registeredPlayers: [],
                fbKeys: {}
            })
        },
        fetchUserData({ commit, getters }) {
            commit('setLoading', true)
            firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
                .then(data => {
                    const dataPairs = data.val()
                    let registeredPlayers = []
                    let swappedPairs = {}
                    for (let key in dataPairs) {
                        registeredPlayers.push(dataPairs[key])
                        swappedPairs[dataPairs[key]] = key
                    }
                    const updatedUser = {
                        id: getters.user.id,
                        registeredPlayers: registeredPlayers,
                        fbKeys: swappedPairs
                    }
                    commit('setLoading', false)
                    commit('setUser', updatedUser)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        signUserInGoogle({ commit }) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            name: user.displayName,
                            email: user.email,
                            photoUrl: user.photoURL
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
        logout({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
}