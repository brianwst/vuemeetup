<template>
  <v-dialog width="350px" persistent v-model="dialog">
    <v-btn fab slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-layout row>
        <v-flex>
          <v-card-title>
            Edit Meetup
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <form>
            <v-layout row>
              <v-flex xs12>
                <v-card-text>
                  <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  v-model="title"
                  required
                  ></v-text-field>
                  <v-text-field
                  name="location"
                  label="Location"
                  id="location"
                  v-model="location"
                  required
                  ></v-text-field>

                  <v-text-field
                  name="description"
                  label="Description"
                  id="description"
                  multi-line
                  v-model="description"
                  required
                  ></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <!--button  -->
            <v-layout row>
              <v-flex>
                <v-card-actions>
                  <v-btn class="secondary" @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn class="primary" :disabled="!inputIsValid" @click="onUpdateMeetup">
                    Edit Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </form>
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
      dialog: true,
      title: this.meetup.title,
      location: this.meetup.location,
      description: this.meetup.description
    }
  },
  computed: {
    inputIsValid () {
      return this.title !== '' &&
        this.location !== '' &&
        this.description !== ''
    }
  },
  methods: {
    onUpdateMeetup () {
      if (!this.inputIsValid) {
        return
      }
      this.dialog = false
      console.log(this.dialog)
      this.$store.dispatch('editMeetup', {
        id: this.meetup.id,
        title: this.title,
        location: this.location,
        description: this.description
      })
    }
  }
}
</script>

<style lang="css">
</style>
