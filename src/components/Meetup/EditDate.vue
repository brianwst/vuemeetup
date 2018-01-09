<template lang="html">
  <v-dialog width="350px" v-model="dialog">
    <v-btn slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-layout row>
        <v-flex xs12>
          <v-card-title>
            Edit Date
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row>
        <v-flex xs12>
          <v-date-picker v-model="editDate" style="width: 100%">
           <template slot-scope="{save, cancel}">
             <v-btn flat @click.prevent="dialog = false" class="secondary">
               Close
             </v-btn>
             <v-btn flat @click.prevent="onSaveChange">
               Edit Date
             </v-btn>
           </template>
          </v-date-picker>
        </v-flex>
      </v-layout>
      <p>{{this.editDate}}</p>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      dialog: false,
      editDate: ''
    }
  },
  computed: {

  },
  methods: {
    onSaveChange () {
      // const date = new Date(this.meetup.date)
      // const newDay = new Date(this.editDate).getDate()
      // const newMonth = new Date(this.editDate).getMonth()
      // const newYear = new Date(this.editDate).getYear()
      // date.setDate(newDay)
      // date.setMonth(newMonth)
      // date.setYear(newYear)
      const newDate = new Date()
      const date = this.editDate.split('-')
      newDate.setDate(date[2])
      newDate.setMonth(date[1] - 1)
      newDate.setYear(date[0])
      this.$store.dispatch('editMeetup', {
        id: this.meetup.id,
        date: newDate
      })
      this.dialog = false
    }
  }
  // created () {
  //   const date = new Date(this.meetup.date)
  //   const day = date.getDate()
  //   const month = date.getMonth()
  //   const year = date.getYear()
  //   this.editDate = year + "-" + month + "-" + day
  // }
}
</script>

<style lang="css">
</style>
