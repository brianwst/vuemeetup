<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="primary--text">Create a new Meetup</h2>
      </v-flex>
    </v-layout>
    <!-- Form part -->
    <v-layout row>
      <v-flex xs12>
        <form v-on:submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- Location -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="location"
              required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- Image -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" raised @click="savePhoto">Upload photo</v-btn>
              <input
                type="file"
                name="file"
                accept="image/*"
                ref="photoUpload"
                style="display: none"
                @change="onPhotoPicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <!-- Description -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="description"
              label="Description"
              id="description"
              multi-line
              v-model="description"
              required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <!-- Date selector -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h2>Choose a date</h2>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
            {{this.date}}
          </v-layout>
          <!-- Time picker -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
            {{this.time}}
          </v-layout>
          <!-- Button -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!inputIsValid" type="submit">
                Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: '',
      time: new Date(),
      image: null
    }
  },
  computed: {
    inputIsValid () {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
    },
    submitTime () {
      // const date = new Date(this.date)
      // When timepicker used,
      const time = new Date()
      if (this.date) {
        const date = this.date.split('-')
        time.setDate(date[2])
        time.setMonth(date[1])
        time.setYear(date[0])
        // time.month.setMonth(month)
      }
      if (typeof this.time === 'string') {
        const hour = this.time.match(/^(\d+)/)[1]
        const minute = this.time.match(/:(\d+)/)[1]
        time.setHours(hour)
        time.setMinutes(minute)
      }
      return time
    }
  },
  methods: {
    onCreateMeetup () {
      //  Check if form input is valid
      if (!this.inputIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      // Check if image is attached
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submitTime,
        image: this.image
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    savePhoto () {
      this.$refs.photoUpload.click()
    },
    onPhotoPicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf() <= 0) {
        console.log('input valid file format')
      }
      // File Reader API
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

<style lang="css">
</style>
