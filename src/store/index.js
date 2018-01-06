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
    loadMeetup (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.location) {
        meetup.location = payload.location
      }
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
    loadMeetup ({commit}) {
      commit('loadState', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          console.log(obj)
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              date: obj[key].date,
              imageUrl: obj[key].imageUrl,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('loadMeetup', meetups)
          commit('loadState', false)
        }).catch((error) => {
          console.log(error)
          commit('loadState', false)
        })
    },
    editMeetup ({commit}, payload) {
      commit('loadState', true)
      const updates = {}
      if (payload.title) {
        updates.title = payload.title
      }
      if (payload.description) {
        updates.description = payload.description
      }
      if (payload.location) {
        updates.location = payload.location
      }
      return firebase.database().ref('meetups').child(payload.id).update(updates).then(() => {
        commit('updateMeetup', payload)
        commit('loadState', false)
      }).catch((error) => {
        console.log(error)
        commit('loadState', false)
      })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          // commit('createMeetup', {
          //   ...meetup,
          //   id: data.key
          // })
          return key
        }).then((key) => {
          const filename = payload.image.name
          const ext = filename.split('.').pop()
          return firebase.storage().ref('meetups').child('meetups/' + key + '.' + ext).put(payload.image)
        }).then((imageinfo) => {
          console.log(imageinfo)
          imageUrl = imageinfo.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        }).then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key,
            imageUrl: imageUrl
          })
        }).catch((err) => {
          console.log(err)
        })
       // Send to firebase
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
    autoLogin ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    userLogOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadingState (state) {
      return state.loading
    },
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
