<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Add"
          >Add Reseller</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div slot="no-body" style="padding: 11px">
        <smsc-col>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
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
              v-validate="'required'"
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
              @onSelect="selected.phone_code = `+${$event.dialCode}`"
            />
            <span class="phone-code">{{ selected.phone_code }}</span>
            <vs-input
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
              v-model="selected.country_uuid"
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
      countries: [],

      // Selects value
      selected: {
        mode: null,
        reseller_uuid: null,
        country_uuid: null,
        payment_term_uuid: null,
        phone_code: null
      },

      // Request body
      payload: {
        reseller_name: null,
        first_name: null,
        last_name: null,
        companies: [],
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
    'payload.contact.first_name': function(val) {
      this.payload.contact.first_name = this.Capitalize(val)
    },
    'payload.contact.last_name': function(val) {
      this.payload.contact.last_name = this.Capitalize(val)
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

      this.payload.reseller_name = `${this.payload.contact.first_name}${this.payload.contact.last_name}`
      this.payload.first_name = this.payload.contact.first_name
      this.payload.last_name = this.payload.contact.last_name

      this.$vs.loading()
      this.$store.dispatch('reseller/Add', { ...this.payload, contact: { ...this.payload.contact, phone: `${this.selected.phone_code.slice(1)}${this.payload.contact.phone}` } })
      .then(res => {
        this.$router.push({ name: 'admin-reseller-list' })
        this.ShowSuccessMessage({ title: 'Success', text: 'Reseller has been added' })
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCountry } = await this.$store.dispatch('country/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('country/GetList', { per_page: TotalForCountry, order_by: 'nice_name', order_dir: 'asc' })

      Promise.all([p1])
      .then(res => {
        this.countries = res[0].items.map(this.TransformCountry)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err.response }))
      .finally(() => this.$vs.loading.close())
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
  }
}
</script>