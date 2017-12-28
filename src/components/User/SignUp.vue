<template lang="html">
  <v-container>
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
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    name="confirmPassword"
                    label="Confirm Password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    :rules="[comparePassword]"
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
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePassword () {
      return this.password === this.confirmPassword ? '' : 'Passwords do not match'
    },
    user () {
      return this.$store.getters.user
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
      this.$store.dispatch('createUser', user)
    }
  }
}
</script>

<style lang="css">
</style>
