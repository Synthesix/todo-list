<template>
<v-app>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs6 offset-xs3>
        <div class="elevation-2">
          <v-toolbar dark color="primary">
            <v-toolbar-title class="white--text">Register</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="valid" ref="form" lazy-validation>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              type="email"
              name="email"
              v-model="email"
              label="e-mail"
              prepend-icon="mail"
              :rules="emailRules"
              required
            ></v-text-field>
            <br>
            <v-text-field
              type="password"
              name="password"
              v-model="password"
              min="8"
              label="password"
              hint="At least 8 characters"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'text' : 'password'"
              prepend-icon="lock"
              :rules="passwordRules"
              required
            ></v-text-field>
            <br>
            <v-text-field
              type="password"
              name="password2"
              v-model="password2"
              min="8"
              label="confirm password"
              :append-icon="e2 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e2 = !e2)"
              :type="e2 ? 'text' : 'password'"
              prepend-icon="lock"
              :rules="confirmPasswordRules"
              required
            ></v-text-field>
            <br>
            <v-alert 
              color="error"
              icon="warning"
              value="true"
              v-if="error"
              v-html="error"
            ></v-alert>
            <br>
            <v-btn
              color="primary"
              @click="register"
              :disabled="!valid"
            > 
              Register
              <v-icon right dark>send</v-icon>
            </v-btn>
          </div>
          </v-form>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      valid: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => /^.{8,32}/.test(v) || 'Password must be longer than 8 characters',
        (v) => /[a-zA-Z0-9]/.test(v) || 'Password must consist out of the following characters: lower case, upper case and numerics'
      ],
      confirmPasswordRules: [
        (v) => !!v || 'Password is required',
        (v) => v === this.password || 'Passwords do not match'
      ],
      e1: false,
      e2: false,
      email: '',
      password: '',
      password2: '',
      error: null
    }
  },
  methods: {
    async register () {
      if (this.$refs.form.validate()) {
        try {
          await AuthenticationService.register({
            email: this.email,
            password: this.password
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
