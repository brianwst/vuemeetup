<template lang="html">
  <v-dialog persistent width="350px" v-model="dialog">
    <v-btn accent slot="activator" v-if="userIsRegistered">
      Cancel Meetup
    </v-btn>
    <v-btn accent slot="activator" v-else>
      Register Meetup
    </v-btn>
    <v-card>
      <v-layout row>
        <v-flex xs12>
          <v-card-title v-if="userIsRegistered">Cancel registration</v-card-title>
          <v-card-title v-else>Register for the event</v-card-title>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row>
        <v-flex xs12>
           <v-card-text>
             You can always change your decision
           </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
           <v-card-actions>
             <v-btn flat @click="dialog = false" class="red--text  darken-1">
               Cancel
             </v-btn>
             <v-btn flat class="green--text darken-1" @click="onChange" v-if="userIsRegistered">
               Deregister
             </v-btn>
             <v-btn flat class="green--text darken-1" @click="onChange" v-else>
               Register
             </v-btn>
           </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
        return meetupId === this.meetup.id
      }) >= 0
    }
  },
  methods: {
    onChange () {
      // if (!this.userIsRegistered) {
      //   return
      // }
      if (this.userIsRegistered) {
        this.$store.dispatch('deregisterUsers', this.meetup.id)
      } else {
        this.$store.dispatch('registerUsers', this.meetup.id)
      }
    }
  }
}
</script>

<style lang="css">
</style>
