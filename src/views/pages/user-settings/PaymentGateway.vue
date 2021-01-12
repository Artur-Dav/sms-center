<template>
  <vx-card no-shadow>

    <vs-input class="w-full mb-base" v-model="paypal" icon-pack="feather" icon="icon-paypal" label="Paypal Token" icon-no-border />
    <vs-input class="w-full mb-base" v-model="facebook" icon-pack="feather" icon="icon-paypal" label="Strip Token" icon-no-border />
    <vs-input class="w-full mb-base" v-model="instagram" icon-pack="feather" icon="icon-paypal" label="Coinpayment Token" icon-no-border />

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      PaypalToken: '',
      StripToken: '',
      CoinpaymentToken: '',
      github: 'https://github.com/madop818',
      linkedin: 'https://codepen.io/adoptism243',
      slack: '@adoptionism744'
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>
