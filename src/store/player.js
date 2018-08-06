import * as firebase from 'firebase/app'

export default {
    /* eslint-disable */
    state: {
        loadedPlayers: [{
                imageUrl: 'https://cdn-04.independent.ie/sport/article31172892.ece/b282e/AUTOCROP/w620/2015-04-26_spo_8620492_I1.JPG',
                id: 'afaj1',
                title: 'Eddie Keher',
                Dob: '09 - 10 - 1948',
                date: new Date()
            },
            {
                imageUrl: 'http://www.dublincity.ie/sites/default/files/galleries/sl099_kilkenny_players.jpg',
                id: 'afaj2',
                title: 'Ollie Walsh',
                Dob: '09 - 10 - 1948',
                date: new Date()
            },
            {
                imageUrl: 'https://pbs.twimg.com/media/B9eAS1wIYAI8xK_.jpg',
                id: 'afaj3',
                title: 'Michael"Babs" Keating',
                Dob: '09 / 10 / 1948',
                date: new Date()
            },
            {
                imageUrl: 'https://cdn-03.independent.ie/business/farming/article36418357.ece/a6d66/AUTOCROP/w620/2017-12-19_bus_37006425_I1.JPG',
                id: 'afaj4',
                title: 'Tony Doran',
                Dob: '09 / 10 / 1948',
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
                fieldPosition: payload.fieldPosition,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorid: getters.user.id
            }
            let imageUrl
            let key


            firebase.database().ref('players').push(player)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('players/' + key + '.' + ext).put(payload.image)
                })
                .then(fileData => {
                    imageUrl = fileData.metadata.downloadURLs[0]
                    return firebase.database().ref('players').child(key).update({ imageUrl: imageUrl })
                })
                .then(() => {
                    commit('createPlayer', {
                        ...player,
                        imageUrl: imageUrl,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
                // Reach out to firebase and store it
        },
        updatePlayerData({ commit }, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('players').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false)
                    commit('updatePlayer', payload)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
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
        }
    }
}