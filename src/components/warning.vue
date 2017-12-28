<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-alert error dismissible :value="true" @input="closeWindow">
      {{ error.message }}
    </v-alert>
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['error'],
  methods: {
    closeWindow () {
      this.$emit('removeError')
    }
  }
}
</script>

<style lang="css">
</style>
