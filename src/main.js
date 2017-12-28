import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { store } from './store'
import * as firebase from 'firebase'
import App from './App'
import router from './router'

import Datefilter from './filter/date.js'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.filter('datefilter', Datefilter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBq8e_ODADfLqF_lrJUGNAWH26BIMpc0uo',
      authDomain: 'vue-meetup-14951.firebaseapp.com',
      databaseURL: 'https://vue-meetup-14951.firebaseio.com',
      projectId: 'vue-meetup-14951',
      storageBucket: ''
    })
  },
  render: h => h(App)
})
