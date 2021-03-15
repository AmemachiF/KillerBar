<template>
  <b-container>
    <b-row class="text-center">
      <b-form-radio-group v-model="userLogin.type" buttons class="mx-auto">
        <b-form-radio value="login">
          登录
        </b-form-radio>
        <b-form-radio value="register">
          注册
        </b-form-radio>
      </b-form-radio-group>
    </b-row>
    <b-form @submit.prevent="isCheckedLogin ? onLogin() : onRegister()">
      <b-form-group
        id="gLoginEmail"
        label="邮箱："
        label-for="loginEmail"
      >
        <b-form-input
          id="loginEmail"
          v-model="userLogin.email"
          type="email"
          placeholder="输入邮箱"
          required
        />
      </b-form-group>

      <b-form-group
        v-if="!isCheckedLogin"
        id="gLoginNickname"
        label="昵称"
        label-for="loginNickname"
      >
        <b-form-input
          id="loginNickname"
          v-model="userLogin.nickname"
          type="text"
          placeholder="输入昵称"
          required
        />
      </b-form-group>

      <b-form-group
        id="gLoginPassword"
        label="密码"
        label-for="loginPassword"
      >
        <b-form-input
          id="loginPassword"
          v-model="userLogin.password"
          placeholder="输入密码"
          type="password"
          required
        />
      </b-form-group>

      <b-form-group
        v-if="!isCheckedLogin"
        id="gLoginPasswordConfirm"
        label="重复密码："
        label-for="loginPasswordConfirm"
      >
        <b-form-input
          id="loginPasswordConfirm"
          v-model="userLogin.passwordConfirm"
          placeholder="输入重复密码"
          type="password"
          required
        />
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="processing">
        {{ isCheckedLogin ? '登录' : '注册' }}
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
import AV from 'leancloud-storage'

class UserLogin {
  email: string = ''
  password: string = ''
  passwordConfirm: string = ''
  nickname: string = ''
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
      AV.User.loginWithEmail(userLogin.email, userLogin.password)
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
        const newUser = new AV.User()
        newUser.setEmail(userLogin.email)
        newUser.setUsername(userLogin.email)
        newUser.setPassword(userLogin.password)
        newUser.set('nickname', userLogin.nickname)
        newUser.signUp()
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
