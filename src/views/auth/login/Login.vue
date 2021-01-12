<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-8 pt-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>

                <div class="mt-20">
                  <vs-input
                      @keypress.enter="Login"
                      v-validate="'required|min:3'"
                      data-vv-validate-on="input"
                      name="username"
                      icon-no-border
                      icon="icon icon-user"
                      icon-pack="feather"
                      label-placeholder="Email or Username"
                      v-model="user_name"
                      class="w-full"/>
                  <span class="text-danger text-sm">{{ errors.first('username') }}</span>
                </div>

                <div class="mt-10">
                  <vs-input
                      @keypress.enter="Login"
                      data-vv-validate-on="input"
                      v-validate="'required|min:6|max:10'"
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      label-placeholder="Password"
                      v-model="password"
                      class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('password') }}</span>
                </div>
                <div>
                  <div class="flex flex-wrap justify-between my-5">
                      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                      <router-link :to="{name: 'forgot-password'}">Forgot Password?</router-link>
                  </div>
                  <div class="flex flex-wrap justify-between mb-3">
                    <vs-button  type="border" @click="$router.push({ name: 'register' })">Register</vs-button>
                    <vs-button :disabled="!validateForm || loading" @click="Login">Login</vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>


<script>

export default {
  data () {
    return {
      user_name: '',
      password: '',
      checkbox_remember_me: false,
      loading: false
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.user_name !== '' && this.password !== ''
    }
  },
  methods: {
    Login() {
      // this.$vs.loading()
      this.loading = true

      const { user_name, password } = this

      this.$store.dispatch('auth/Auth', {user_name: user_name.toLowerCase(), password})
      .then(res => {
        this.$router.push({ name: 'admin' })
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'Successfully logged in',
          iconPack: 'feather',
          icon: 'icon-check',
          color: 'success'
        })
      })
      .catch(err => {
        this.$vs.notify({
          title: 'Login Attempt',
          text: 'Incorrect username or password',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
      .finally(() => this.loading = false)
    }
  }
}
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
