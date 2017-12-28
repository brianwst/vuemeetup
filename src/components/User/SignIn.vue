<template lang="html">
  <v-container>
    <v-layout row v-if="error">
      <app-alert :error="error" @removeError="onClearError">
      </app-alert>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <form @submit.prevent="onSignup">
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    name="email"
                    label="Mail"
                    id="mail"
                    v-model="email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    name="passord"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- Submit Button  -->
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-btn class="primary" type="submit">
                    Signup
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import alertComponent from '@/components/warning.vue'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    'app-alert': alertComponent
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      // Vuex control
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('userLogIn', user)
    },
    onClearError () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style lang="css">
</style>
