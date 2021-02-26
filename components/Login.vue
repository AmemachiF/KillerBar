<template>
  <b-container>
    <b-row class="text-center">
      <b-form-radio-group v-model="userLogin.type" buttons class="mx-auto">
        <b-form-radio value="login">
          Login
        </b-form-radio>
        <b-form-radio value="register">
          Register
        </b-form-radio>
      </b-form-radio-group>
    </b-row>
    <b-form @submit.prevent="isCheckedLogin ? onLogin() : onRegister()">
      <b-form-group
        id="gLoginEmail"
        label="Email:"
        label-for="loginEmail"
      >
        <b-form-input
          id="loginEmail"
          v-model="userLogin.email"
          type="email"
          placeholder="Enter email"
          required
        />
      </b-form-group>

      <b-form-group
        v-if="!isCheckedLogin"
        id="gLoginNickName"
        label="Nick Name:"
        label-for="loginNickName"
      >
        <b-form-input
          id="loginNickName"
          v-model="userLogin.nickName"
          type="text"
          placeholder="Enter nickname"
          required
        />
      </b-form-group>

      <b-form-group
        id="gLoginPassword"
        label="Password:"
        label-for="loginPassword"
      >
        <b-form-input
          id="loginPassword"
          v-model="userLogin.password"
          placeholder="Enter password"
          type="password"
          required
        />
      </b-form-group>

      <b-form-group
        v-if="!isCheckedLogin"
        id="gLoginPasswordConfirm"
        label="Password Confirm:"
        label-for="loginPasswordConfirm"
      >
        <b-form-input
          id="loginPasswordConfirm"
          v-model="userLogin.passwordConfirm"
          placeholder="Entern password confirm"
          type="password"
          required
        />
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="processing">
        {{ isCheckedLogin ? 'Login' : 'Register' }}
      </b-button>
    </b-form>
    <div class="alert-container position-fixed">
      <b-alert
        v-for="(a, index) in alerts"
        :key="index"
        v-model="a.show"
        :dismissible="a.dismissible ? a.dismissible : false"
        :dismiss-label="a.dismissLabel ? a.dismissLabel : 'Close'"
        :fade="a.fade ? a.fade : false"
        :variant="a.variant ? a.variant : 'info'"
        @dismissed="onDismissed(a, index)"
      >
        {{ a.content }}
      </b-alert>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

class UserLogin {
  loginName: string = ''
  userName: string = ''
  email: string = ''
  password: string = ''
  passwordConfirm: string = ''
  nickName: string = ''
  type: 'login'|'register' = 'login'
}

class Alert {
  dismissible: boolean = false
  fade: boolean = false
  variant: string = 'info'
  show: boolean |number | string = false
  dismissLabel?: string = 'Close'
  content: string = ''
}

export default Vue.extend({
  data () {
    const userLogin = new UserLogin()
    const alerts: Array<Alert> = []
    return {
      userLogin,
      alerts,
      processing: false
    }
  },
  computed: {
    isCheckedLogin () {
      return this.$data.userLogin.type === 'login'
    }
  },
  mounted () {
  },
  methods: {
    onLogin () {
      this.processing = true
      const userLogin = this.userLogin
      this.$fire.auth.signInWithEmailAndPassword(userLogin.email, userLogin.password)
        .then((_) => {
          this.$router.push({
            name: 'index'
          })
          this.processing = false
        })
        .catch((error) => {
          const errorMessage = error.message
          this.alerts.push({
            dismissible: true,
            variant: 'danger',
            show: 5,
            fade: true,
            content: errorMessage
          })
          this.processing = false
        })
    },
    onRegister () {
      this.processing = true
      let errorMessage: string | undefined
      const userLogin = this.userLogin
      if (userLogin.password !== userLogin.passwordConfirm) {
        errorMessage = '重复密码不匹配'
        this.processing = false
      } else {
        this.$fire.auth.createUserWithEmailAndPassword(userLogin.email, userLogin.password)
          .then((user) => {
              user.user?.updateProfile({
                displayName: userLogin.nickName
              })
              this.processing = false
          })
          .catch((error) => {
            const errorMessage = error.message
            this.alerts.push({
              dismissible: true,
              variant: 'danger',
              show: 5,
              fade: true,
              content: errorMessage
            })
            this.processing = false
          })
      }
      if (errorMessage) {
        this.alerts.push({
          dismissible: true,
          variant: 'danger',
          show: 5,
          fade: true,
          content: errorMessage
        })
      }
    },
    onDismissed (_: Alert, index: number) {
      this.alerts.splice(index, 1)
    }
  }
})
</script>
