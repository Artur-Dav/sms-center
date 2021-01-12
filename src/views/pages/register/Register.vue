<template>
  <div class="main-container flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
              <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-2/5 mx-auto self-center">
                <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto w-100">
              </div>
              <div class="vx-col sm:w-full md:w-full lg:w-3/5 mx-auto self-center  d-theme-dark-bg">
                <div class="pt-8 register-tabs-container">
                    <div class="vx-card__title mb-4 px-4">
                      <h4 class="mb-4">Create Account</h4>
                      <p>Fill the below form to create a new account.</p>
                    </div>
                    <smsc-col>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required|alpha'"
                          data-vv-validate-on="input"
                          name="first name"
                          :class="{'is-danger': errors.has('first name')}"
                          type="text"
                          label="First Name"
                          placeholder="Enter first name"
                          v-model="payload.contact.first_name"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('first name') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required|alpha'"
                          data-vv-validate-on="input"
                          name="last name"
                          :class="{'is-danger': errors.has('last name')}"
                          type="text"
                          label="Last Name"
                          placeholder="Enter last name"
                          v-model="payload.contact.last_name"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('last name') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <!-- <vs-input-phone
                          v-model="phone_num"
                        /> -->
                        <div class="country-code">
                          <vue-country-code
                            class="country-code__dropdown"
                            @onSelect="SetCountryCode"
                          />
                          <span ref="phone-code" class="phone-code">{{ selected.phone_code }}</span>
                          <vs-input
                            ref="phone-input"
                            v-validate="'required'"
                            data-vv-validate-on="input"
                            name="phone"
                            :class="{'is-danger': errors.has('phone')}"
                            type="text"
                            label="Phone"
                            v-model="payload.contact.phone"
                            class="w-full" />
                          <span class="text-danger text-sm">{{ errors.first('phone') }}</span>
                        </div>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required|email'"
                          data-vv-validate-on="input"
                          name="email"
                          :class="{'is-danger': errors.has('email')}"
                          type="email"
                          label="Email"
                          placeholder="Enter email"
                          v-model="payload.contact.email"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          name="password"
                          :class="{'is-danger': errors.has('password')}"
                          type="password"
                          label="Password"
                          placeholder="Enter password"
                          v-model="payload.contact.passwd"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('password') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          name="re-enter password"
                          type="password"
                          :class="{'is-danger': errors.has('re-enter password')}"
                          label="Re-Enter Password"
                          placeholder="Re-enter passowrd"
                          v-model="payload.contact.re_password"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('re-enter password') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <label class="vs-input--label">Country</label>
                        <v-select
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          name="country"
                          :class="{'is-danger': errors.has('country')}"
                          placeholder="Select Country"
                          v-model="selected.country"
                          :options="countries"
                        />
                        <span class="text-danger text-sm">{{ errors.first('country') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          name="address"
                          :class="{'is-danger': errors.has('address')}"
                          type="text"
                          label="Address"
                          placeholder="Enter address"
                          v-model="payload.contact.address"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('address') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          name="zip code"
                          :class="{'is-danger': errors.has('zip code')}"
                          type="text"
                          label="Zip Code"
                          placeholder="Enter zip code"
                          v-model="payload.contact.zipcode"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('zip code') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          name="state"
                          :class="{'is-danger': errors.has('state')}"
                          type="text"
                          label="State"
                          placeholder="Enter state"
                          v-model="payload.contact.state"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('state') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          name="city"
                          :class="{'is-danger': errors.has('city')}"
                          type="text"
                          label="City"
                          placeholder="Enter city"
                          v-model="payload.contact.city"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('city') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <vs-input
                          v-validate="'required'"
                          data-vv-validate-on="input"
                          name="company name"
                          :class="{'is-danger': errors.has('company name')}"
                          type="text"
                          label="Company Name"
                          placeholder="Enter company name"
                          v-model="payload.company_name"
                          class="w-full" />
                        <span class="text-danger text-sm">{{ errors.first('company name') }}</span>
                      </smsc-col-item>
                      <smsc-col-item>
                        <label class="vs-input--label">Product</label>
                        <v-select
                          name="product"
                          label="name"
                          placeholder="Select Product"
                          @input="payload.product = $event && $event.value"
                          :options="products"
                        />
                      </smsc-col-item>
                    </smsc-col>
                    <div class="smsmc-footer flex justify-center pt-6 pb-6">
                      <vs-button type="border" @click="$router.push({ name: 'login' })" class="mr-6">Login</vs-button>
                      <vs-button class="float-right" @click="Register">Register</vs-button>
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
// Packages
import vSelect from 'vue-select'

import vsInputPhone from '@/components/VsInputPhone.vue'

export default {
  components: {
    vSelect,
    vsInputPhone
  },
  data () {
    return {
      countries: [],
      products: [],
      selected: {
        country: null,
        phone_code: null
      },

      phone_num: '04177133766',

      // Request body
      payload: {
        contact: {
          first_name: null,
          last_name: null,
          email: null,
          phone: null,
          address: null,
          // country_uuid: null,
          state: null,
          city: null,
          zipcode: null,
          passwd: null,
          // logo_file_uuid: null,
          // full_name: null,
          // user_name: null,
          re_password: null
        },
        company_name: null,
        product: [],
        // company_url: null
      }
    }
  },
  watch: {
    phone_num (e) {
      console.log(e)
    },
    'payload.contact.first_name': function(val) {
      if (!val) {
        this.payload.contact.first_name = ''
        return
      }

      this.payload.contact.first_name = `${val.charAt(0).toUpperCase()}${val.slice(1)}`
    },
    'payload.contact.last_name': function(val) {
      if (!val) {
        this.payload.contact.last_name = ''
        return
      }

      this.payload.contact.last_name = `${val.charAt(0).toUpperCase()}${val.slice(1)}`
    }
  },
  computed: {
    country_uuid() {
      return this.selected.country && this.selected.country.value
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    SetCountryCode (e) {
      this.selected.phone_code = `+${e.dialCode}`
      // this.$refs['phone-input'].$el.children[1].children[0].classList.remove('normal')
      // this.$refs['phone-input'].$el.children[1].children[0].style.paddingLeft = `${(String(e.dialCode).length * 8) + 61}px`
    },
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCountry } = await this.$store.dispatch('country/GetList', { per_page: 0 })
      const { total: TotalForProduct} = await this.$store.dispatch('product/GetPublicProductList', { per_page: 0 })
      const p1 = await this.$store.dispatch('country/GetList', { per_page: TotalForCountry, order_by: 'nice_name', order_dir: 'asc' })
      const p2 = await this.$store.dispatch('product/GetPublicProductList', { per_page: TotalForProduct, order_by: 'product_name', order_dir: 'asc' })

      Promise.all([p1, p2])
      .then(res => {
        this.countries = res[0].items.map(this.TransformCountry)
        this.products = res[1].items.map(this.TransformProduct)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error fetch data', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async Register() {
      const valid = await this.$validator.validate()
      
      if (!valid) {
        return
      }

      this.$vs.loading()
      this.payload.contact.country_uuid = this.country_uuid
      this.$store.dispatch('auth/Register', { ...this.payload, contact: { ...this.payload.contact, phone: `${this.selected.phone_code.slice(1)}${this.payload.contact.phone}` } })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'login' })
          this.ShowSuccessMessage({ title: 'Registration Attempt', text: 'Successfully registered' })
        }
        // else {
        //   const err_message = res.errors
        //   this.$vs.notify({
        //     title: 'Registration Attempt',
        //     text: err_message,
        //     iconPack: 'feather',
        //     icon: 'iicon-alert-circle',
        //     color: 'danger'
        //   })
        // }
      })
      .catch(err => this.ShowErrorMessage({ title: 'Registration Attempt', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    // Notify
    ShowSuccessMessage ({ title, text }) {
      this.$vs.notify({
        iconPack: 'feather',
        icon: 'icon-check',
        color: 'success',
        title,
        text
      })
    },
    ShowErrorMessage ({ title, text }) {
      this.$vs.notify({
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger',
        title,
        text
      })
    },

    // Transform functions
    TransformCountry(item) {
      return {
        label: item.nice_name,
        value: item.country_uuid
      }
    },
    TransformProduct(item) {
      return {
        name: item.product_name,
        value: item.product_uuid
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100vh !important;
  // padding: 10% 0;

  .register-tabs-container {
    min-height: 517px;
  }
}

@media screen and (max-width: 1200px) and (min-width: 992px), screen and (max-width: 720px) {
  .main-container {
    padding: 10% 0;
  }
}
</style>
