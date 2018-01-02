<template lang="html">
  <v-container>

    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router-link to="/meetups" class="primary">View Meetup</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router-link to="/meetup/new" class="primary">Create Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-progress-circular
          indeterminate
          :width="7"
          :size="70"
          v-if="loading"
          color="secondary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel style="cursor: pointer" v-if="!loading">
          <v-carousel-item
            v-for="meetup in meetups"
            v-bind:key="meetup.id"
            v-bind:src="meetup.imageUrl"
            transition="fade"
            reverseTransition="fade"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title">
              {{meetup.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    },
    loading () {
      return this.$store.getters.loadingState
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push({name: 'Meetup', params: {id: id}})
    }
  }
}
</script>

<style lang="css" scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    padding: 20px;
  }
</style>
