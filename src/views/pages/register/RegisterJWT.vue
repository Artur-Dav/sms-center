<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="Company Name"
      name="companyname"
      placeholder="Company Name"
      v-model="companyName"
      class="w-full" />
    <span class="text-danger text-sm">{{ errors.first('companyname') }}</span>

    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      
      label-placeholder="Address1"
      name="address1"
      placeholder="Address1"
      v-model="address1"
      class="w-full" />
    <span class="text-danger text-sm">{{ errors.first('address1') }}</span>

    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="Address2"
      name="address2"
      placeholder="Address2"
      v-model="address2"
      class="w-full" />
    <span class="text-danger text-sm">{{ errors.first('address2') }}</span>

    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="City"
      name="city"
      placeholder="City"
      v-model="city"
      class="w-full" />
    <span class="text-danger text-sm">{{ errors.first('city') }}</span>
     
     <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="State"
      name="state"
      placeholder="State"
      v-model="state"
      class="w-full" />
    <span class="text-danger text-sm">{{ errors.first('state') }}</span>

    <vs-input
      type="number"
      v-validate="'min:6|max:10|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="number"
      name="number"
      label-placeholder="Phone Number"
      placeholder="Phone Number"
      v-model="number"
      class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('number') }}</span>
    <div>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="4" vs-xs="12" >
          <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">One Way SMS</vs-checkbox>
      </vs-col>      
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="4" vs-xs="12">
        <vs-checkbox v-model="isTermsConditionAccepted1" class="mt-6">Two Way SMS</vs-checkbox>
      </vs-col>
    </div>
    <vs-button  type="border" to="/pages/login" class="mt-6">Login</vs-button>
    <vs-button class="float-right mt-6" @click="registerUserJWt" :disabled="!validateForm">Register</vs-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      number: '',
      phonenumber: '',
      displayName: '',
      companyName: '',
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted1: false,
      isTermsConditionAccepted: true
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.displayName !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
    }
  },
  methods: {
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    registerUserJWt () {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return

      const payload = {
        userDetails: {
          displayName: this.displayName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirm_password
        },
        notify: this.$vs.notify
      }
      this.$store.dispatch('auth/registerUserJWT', payload)
    }
  }
}
</script>
