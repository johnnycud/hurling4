import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
        firebase.initializeApp({
            apiKey: "AIzaSyD8LhC0IcWm8NzapwXjHffscAgXA-H50XA",
            authDomain: "my-hurling-app.firebaseapp.com",
            databaseURL: "https://my-hurling-app.firebaseio.com",
            projectId: "my-hurling-app",
            storageBucket: "my-hurling-app.appspot.com",
            messagingSenderId: "1044534602167"
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$store.dispatch('autoSignIn', user)
            }
        })
        this.$store.dispatch('loadPlayers')
    }
})