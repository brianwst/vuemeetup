import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://imgs.abduzeedo.com/files/paul0v2/hongkong-cityscapes/hk-00.jpg',
        id: '1',
        title: 'HK 1',
        date: '2017-07-18',
        location: 'Hong Kong',
        description: 'Nice meetup'
      },
      { imageUrl: 'http://scad.edu.hk/sites/scad.hk/files/HK_PHOT_Spring2014_CC_13.jpg',
        id: '2',
        title: 'HK 2',
        date: '2017-07-19',
        location: 'Hong Kong',
        description: 'Nice meetup'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    loadState (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: '3'
      }
       // Send to firebase
      commit('createMeetup', meetup)
    },
    createUser ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('clearError')
          commit('setUser', newUser)
        }
      ).catch(
        error => {
          console.log(error)
          commit('setError', error)
        }
      )
    },
    userLogIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        user => {
          const loggedInUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('clearError')
          commit('setUser', loggedInUser)
        }
      ).catch(
        error => {
          console.log(error)
          commit('setError', error)
        }
      )
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    }
  }
})
