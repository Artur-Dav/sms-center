<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Add"
          >Add Company</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div slot="no-body" class="p-3">
        <smsc-col>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="company name"
              class="w-100"
              :class="{'is-danger': errors.has('company name')}"
              type="text"
              label="Company Name"
              placeholder="Enter company name"
              v-model="payload.company_name"
            />
            <span class="text-danger text-xs">{{ errors.first('company name') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required|alpha'"
              data-vv-validate-on="input"
              name="first name"
              class="w-100"
              :class="{'is-danger': errors.has('first name')}"
              type="text"
              label="First Name"
              placeholder="Enter first name"
              v-model="payload.contact.first_name"
            />
            <span class="text-danger text-xs">{{ errors.first('first name') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required|alpha'"
              data-vv-validate-on="input"
              name="last name"
              class="w-100"
              :class="{'is-danger': errors.has('last name')}"
              type="text"
              label="Last Name"
              placeholder="Enter last name"
              v-model="payload.contact.last_name"
            />
            <span class="text-danger text-xs">{{ errors.first('last name') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <div class="country-code">
              <vue-country-code
                class="country-code__dropdown"
                @onSelect="SetCountryCode"
              />
              <span ref="phone-code" class="phone-code">{{ selects.phone_code }}</span>
              <vs-input
                ref="phone-input"
                v-validate="'required'"
                data-vv-validate-on="input"
                name="phone"
                class="w-100"
                :class="{'is-danger': errors.has('phone')}"
                type="text"
                label="Phone"
                v-model="payload.contact.phone"
              />
              <span class="text-danger text-xs">{{ errors.first('phone') }}</span>
            </div>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required|email'"
              data-vv-validate-on="input"
              name="email"
              class="w-100"
              :class="{'is-danger': errors.has('email')}"
              type="text"
              label="Email"
              placeholder="Enter email"
              v-model="payload.contact.email"
            />
            <span class="text-danger text-xs">{{ errors.first('email') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="password"
              class="w-100"
              :class="{'is-danger': errors.has('password')}"
              type="password"
              label="Password"
              placeholder="Enter password"
              v-model="payload.contact.passwd"
            />
            <span class="text-danger text-xs">{{ errors.first('password') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <label class="vs-input--label">Country</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="country"
              :class="{'is-danger': errors.has('country')}"
              label="name"
              :options="countries"
              v-model="selects.country_uuid"
              placeholder="Select Country"
              @input="payload.contact.country_uuid = $event && $event.value"
            />
            <span class="text-danger text-xs">{{ errors.first('country') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="address"
              class="w-100"
              :class="{'is-danger': errors.has('address')}"
              type="text"
              label="Address"
              placeholder="Enter address"
              v-model="payload.contact.address"
            />
            <span class="text-danger text-xs">{{ errors.first('address') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="zip code"
              class="w-100"
              :class="{'is-danger': errors.has('zip code')}"
              type="text"
              label="Zip Code"
              placeholder="Enter zip code"
              v-model="payload.contact.zipcode"
            />
            <span class="text-danger text-xs">{{ errors.first('zip code') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="state"
              class="w-100"
              :class="{'is-danger': errors.has('state')}"
              type="text"
              label="State"
              placeholder="Enter state"
              v-model="payload.contact.state"
            />
            <span class="text-danger text-xs">{{ errors.first('state') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="city"
              class="w-100"
              :class="{'is-danger': errors.has('city')}"
              type="text"
              label="City"
              placeholder="Enter city"
              v-model="payload.contact.city"
            />
            <span class="text-danger text-xs">{{ errors.first('city') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <label class="vs-input--label">Reseller</label>
            <v-select
              name="reseller"
              label="name"
              :options="resellers"
              v-model="selects.reseller_uuid"
              placeholder="Select Reseller"
              @input="payload.reseller_uuid = $event && $event.value"
            />
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              name="sms per sec"
              class="w-100"
              type="number"
              label="Sms Per Sec"
              placeholder="Enter sms per sec"
              v-model="payload.sms_per_sec"
            />
          </smsc-col-item>
          <smsc-col-item>
            <label class="vs-input--label">Mode</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="mode"
              :class="{'is-danger': errors.has('mode')}"
              label="name"
              :options="modes"
              :searchable="false"
              v-model="selects.mode"
              placeholder="Select Mode"
              @input="payload.mode = $event && $event.value"
            />
            <span class="text-danger text-xs">{{ errors.first('mode') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="credit"
              class="w-100"
              :class="{'is-danger': errors.has('credit')}"
              type="number"
              :label="isPostpay ? 'Credit Limit' : 'Test Credit'"
              :placeholder="`Enter ${isPostpay ? 'credit limit' : 'test credit'}`"
              v-model="payload.credit"
            />
            <span class="text-danger text-xs">{{ errors.first('credit') }}</span>
          </smsc-col-item>
          <smsc-col-item :class="{ 'empty-field': !isPostpay }">
            <template v-if="isPostpay">
              <label class="vs-input--label">Payment Term</label>
              <v-select
                v-validate="'required'"
                data-vv-validate-on="input"
                name="payment term"
                :class="{'is-danger': errors.has('payment term')}"
                label="name"
                :options="payment_terms"
                v-model="selects.payment_term_uuid"
                placeholder="Select payment term"
                @input="payload.payment_term_uuid = $event && $event.value"
              />
              <span class="text-danger text-xs">{{ errors.first('payment term') }}</span>
            </template>
          </smsc-col-item>
        </smsc-col>
      </div>
    </vx-card>
  </div>
</template>

<script>
// Packages
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  data() {
    return {
      // Dropdowns
      modes: [
        { name: 'Prepay', value: true },
        { name: 'Postpay', value: false }
      ],
      resellers: [],
      countries: [],
      payment_terms: [],

      // Selects value
      selects: {
        mode: null,
        reseller_uuid: null,
        country_uuid: null,
        payment_term_uuid: null,
        phone_code: null
      },

      // Request body
      payload: {
        company_name: null,
        reseller_uuid: null,
        credit: null,
        sms_per_sec: null,
        payment_term_uuid: null,
        contact: {
          address: null,
          city: null,
          country_uuid: null,
          email: null,
          first_name: null,
          last_name: null,
          logo_file_uuid: null,
          passwd: null,
          phone: null,
          state: null,
          zipcode: null,
        }
      }
    }
  },
  watch: {
    'payload.company_name': function (val) {
      this.payload.company_name = this.Capitalize(val)
    },
    'payload.contact.first_name': function (val) {
      this.payload.contact.first_name = this.Capitalize(val)
    },
    'payload.contact.last_name': function (val) {
      this.payload.contact.last_name = this.Capitalize(val)
    }
  },
  computed: {
    isPostpay () {
      return this.selects.mode && this.selects.mode.value === false
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    async Add() {
      const valid = await this.$validator.validate()
      
      if (!valid) {
        return
      }

      // These fields not required
      if (!this.payload.reseller_uuid) {
        delete this.payload.reseller_uuid
      }
      if (!this.payload.sms_per_sec) {
        delete this.payload.sms_per_sec
      }
      if (!this.isPostpay) {
        delete this.payload.payment_term_uuid
      }

      this.$vs.loading()
      this.$store.dispatch('company/Add', { ...this.payload, contact: { ...this.payload.contact, phone: `${this.selects.phone_code.slice(1)}${this.payload.contact.phone}` } })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-companies-list' })
          this.ShowSuccessMessage({ title: 'Success', text: 'Company has been added' })
        }
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCountry } = await this.$store.dispatch('country/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('country/GetList', { per_page: TotalForCountry, order_by: 'nice_name', order_dir: 'asc' })

      const { total: TotalForReseller } = await this.$store.dispatch('reseller/GetList', { per_page: 0 })
      const p2 = await this.$store.dispatch('reseller/GetList', { per_page: TotalForReseller, order_by: 'reseller_name', order_dir: 'asc' })

      const { total: TotalForPaymentTerm } = await this.$store.dispatch('paymentTerm/GetList', { per_page: 0 })
      const p3 = await this.$store.dispatch('paymentTerm/GetList', { per_page: TotalForPaymentTerm, order_by: 'name', order_dir: 'asc' })

      Promise.all([p1, p2, p3])
      .then(res => {
        this.countries = res[0].items.map(this.TransformCountry)
        this.resellers = res[1].items.map(this.TransformReseller)
        this.payment_terms = res[2].items.map(this.TransformPaymentTerm)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    SetCountryCode (e) {
      this.selects.phone_code = `+${e.dialCode}`

      // setTimeout(() => {
        // const { width } = this.$refs['phone-code'].getBoundingClientRect()
      //   this.$refs['phone-input'].$el.querySelector('.vs-input--input').style.paddingLeft = `${width + 10}px !important`
      //   console.log(this.$refs['phone-input'].$el.querySelector('.vs-input--input').style)
        // console.log()
      // }, 2200);
    },

    // Capitalize
    Capitalize (val) {
      if (!val) return ''

      return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
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
        name: item.nice_name,
        value: item.country_uuid
      }
    },
    TransformReseller(item) {
      return {
        name: item.reseller_name,
        value: item.reseller_uuid
      }
    },
    TransformPaymentTerm(item) {
      return {
        name: item.name,
        value: item.payment_term_uuid
      }
    }
  }
}
</script>