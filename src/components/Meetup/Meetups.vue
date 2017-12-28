<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-md2 offset-1>
        <v-card class="info mb-3" v-for="meetup in meetups" :key="meetup.id" >
          <v-container fluid grid-list-lg>
            <v-layout row>
              <!-- Card image -->
              <v-flex xs5 sm4 md3>
                <v-card-media
                      :src= meetup.imageUrl
                      height="140px"
                ></v-card-media>
              </v-flex>

              <!-- Card title -->
              <v-flex xs7 sm6 md5>
                <v-card-title primary-title class="white--text">
                  <h3 class="mb-0"> {{ meetup.title }}</h3>
                  <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/meetups/' + meetup.id" >
                    <v-icon left light>arrow_forward</v-icon>
                    Register Now
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>

<style lang="css">

</style>
