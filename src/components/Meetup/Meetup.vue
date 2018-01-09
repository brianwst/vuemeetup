 <template lang="html">
  <v-container>
    <v-layout row v-if="loading">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-progress-circular
          indeterminate
          :width="7"
          :size="70"
          v-if="loading"
          color="secondary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{ meetup.title }}</h4>
            <v-spacer></v-spacer>
            <template v-if="isCurrentUser">
              <app-edit-meetup :meetup="meetup"></app-edit-meetup>
            </template>
          </v-card-title>
          <v-card-media
                :src=meetup.imageUrl
                height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date | datefilter }} - {{ meetup.location }}
            </div>
            <div>
              <app-edit-date :meetup="meetup" v-if="isCurrentUser"></app-edit-date>
            </div>
            <div>
              {{ meetup.description }}
            </div>
          </v-card-text>
          <v-card-actions>
             <v-spacer></v-spacer>
             <app-register-meetup :meetup="meetup"></app-register-meetup>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditMeetup from './EditMeetup.vue'
import EditDate from './EditDate.vue'
import RegisterMeetup from './registerMeetup.vue'
export default {
  components: {
    'app-edit-meetup': EditMeetup,
    'app-edit-date': EditDate,
    'app-register-meetup': RegisterMeetup
  },
  computed: {
    loading () {
      return this.$store.getters.loadingState
    },
    meetup () {
      return this.$store.getters.loadedMeetup(this.$route.params.id)
    },
    isUserAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    isCurrentUser () {
      if (!this.isUserAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    }
  }
}
</script>

<style lang="css">
</style>
