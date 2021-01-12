<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Edit"
          >Save Company</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div slot="no-body" class="p-3" v-if="payload.contact">
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
                :disabledFetchingCountry="true"
                :defaultCountry="selected.iso2"
                @onSelect="phone_code = `+${$event.dialCode}`"
              />
              <span class="phone-code">{{ phone_code }}</span>
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
              v-model="selected.country"
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
              v-model="selected.reseller"
              placeholder="Select Reseller"
              @input="payload.reseller_uuid = $event && $event.value"
            />
          </smsc-col-item>
          <smsc-col-item>
            <label class="vs-input--label">Product</label>
            <v-select
              name="product"
              label="name"
              :options="products"
              v-model="selected.product"
              placeholder="Select Product"
              @input="payload.product = $event && $event.value"
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
            <vs-input
              name="mode"
              class="disabled-input w-100"
              type="text"
              label="Mode"
              v-model="selected.mode"
              :disabled="true"
            />
          </smsc-col-item>
          <smsc-col-item>
            <label class="vs-input--label">Default ANI Group</label>
            <v-select
              name="default ani group"
              label="name"
              :options="ani_groups"
              v-model="selected.ani_group"
              placeholder="Select default ani group"
              @input="payload.default_ani_group_uuid = $event && $event.value"
            />
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
                v-model="selected.payment_term"
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

// Utils
import { GetFieldNameById } from '@/assets/utils/utils.js'

export default {
  components: {
    vSelect
  },
  data() {
    return {
      // Dropdowns
      countries: [],
      resellers: [],
      payment_terms: [],
      ani_groups: [],
      products: [],
      phone_code: null,

      // Selected value
      selected: {},

      // Item ID
      id: this.$route.params.id,

      // Request body
      payload: {}
    }
  },
  computed: {
    isPostpay () {
      return this.selected.mode && this.selected.mode === 'Postpay'
    }
  },
  created () {
    this.FetchData()
  },
  methods: {
    async FetchData() { 
      this.$vs.loading()
      const { total: TotalForCountry } = await this.$store.dispatch('country/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('country/GetList', { per_page: TotalForCountry, order_by: 'nice_name', order_dir: 'asc' })

      const { total: TotalForReseller } = await this.$store.dispatch('reseller/GetList', { per_page: 0 })
      const p2 = await this.$store.dispatch('reseller/GetList', { per_page: TotalForReseller, order_by: 'reseller_name', order_dir: 'asc' })

      const { total: TotalForPaymentTerm } = await this.$store.dispatch('paymentTerm/GetList', { per_page: 0 })
      const p3 = await this.$store.dispatch('paymentTerm/GetList', { per_page: TotalForPaymentTerm, order_by: 'name', order_dir: 'asc' })

      const { total: TotalForAniGroup } = await this.$store.dispatch('aniGroup/GetList', { per_page: 0 })
      const p4 = await this.$store.dispatch('aniGroup/GetList', { per_page: TotalForAniGroup, order_by: 'ani_group_name', order_dir: 'asc' })

      const { total: TotalForProduct } = await this.$store.dispatch('product/GetList', { per_page: 0 })
      const p5 = await this.$store.dispatch('product/GetList', { per_page: TotalForProduct, order_by: 'product_name', order_dir: 'asc' })

      const p6 = await this.$store.dispatch('company/GetById', this.id)

      Promise.all([p1, p2, p3, p4, p5, p6])
      .then(res => {
        this.countries = res[0].items.map(this.TransformCountry)
        this.resellers = res[1].items.map(this.TransformReseller)
        this.payment_terms = res[2].items.map(this.TransformPaymentTerm)
        this.ani_groups = res[3].items.map(this.TransformAniGroup)
        this.products = res[4].items.map(this.TransformProduct)

        this.payload = this.TransformPayload(res[5].payload)
        this.selected = this.TransformSelected(res[5].payload)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async Edit() {
      const valid = await this.$validator.validate()
      
      if (!valid) {
        return
      }

      // These fields not required
      if (!this.payload.reseller_uuid) {
        delete this.payload.reseller_uuid
      }
      if (this.payload.contact.passwd === '********') {
        delete this.payload.contact.passwd
      }
      if (!this.payload.product) {
        delete this.payload.product
      }
      if (!this.payload.sms_per_sec) {
        delete this.payload.sms_per_sec
      }
      if (!this.payload.default_ani_group_uuid) {
        delete this.payload.default_ani_group_uuid
      }

      this.$vs.loading()
      this.$store.dispatch('company/Edit', { id: this.id, data: { ...this.payload, contact: { ...this.payload.contact, phone: `${this.phone_code.slice(1)}${this.payload.contact.phone}` }} })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-companies-list' })
          this.ShowSuccessMessage({ title: 'Success', text: 'Company has been edited' })
        }
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
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

    GetISO2ByPhone (phone) {
      const country = this.countries.find(item => phone.indexOf(item.phone_code) === 0)
      return country ? country.iso2 : null
    },
    GetCodeByPhone (phone) {
      const country = this.countries.find(item => phone.indexOf(item.phone_code) === 0)
      return country ? country.phone_code : ''
    },

    // Transform functions
    TransformCountry (item) {
      return {
        name: item.nice_name,
        value: item.country_uuid,
        iso2: item.iso2,
        phone_code: item.phone_code
      }
    },
    TransformReseller (item) {
      return {
        name: item.reseller_name,
        value: item.reseller_uuid
      }
    },
    TransformPaymentTerm (item) {
      return {
        name: item.name,
        value: item.payment_term_uuid
      }
    },
    TransformAniGroup (item) {
      return {
        name: item.ani_group_name,
        value: item.ani_group_uuid
      }
    },
    TransformProduct (item) {
      return {
        name: item.product_name,
        value: item.product_uuid
      }
    },
    TransformPayload (payload) {
      return {
        company_name: payload.company_name,
        payment_term_uuid: payload.payment_term_uuid,
        prepay: payload.prepay,
        product: payload.product,
        reseller_uuid: payload.reseller_uuid,
        sms_per_sec: payload.sms_per_sec,
        default_ani_group_uuid: payload.default_ani_group_uuid,
        contact: {
          address: payload.contact.address,
          city: payload.contact.city,
          country_uuid: payload.contact.country_uuid,
          email: payload.contact.email,
          first_name: payload.contact.first_name,
          last_name: payload.contact.last_name,
          logo_file_uuid: payload.contact.logo_file_uuid,
          passwd: payload.contact.passwd,
          phone: payload.contact.phone.slice(this.GetCodeByPhone(payload.contact.phone).length),
          state: payload.contact.state,
          zipcode: payload.contact.zipcode,
        }
      }
    },
    TransformSelected (payload) {
      return {
        reseller: payload.reseller_name,
        mode: payload.prepay ? 'Prepay' : 'Postpay',
        country: GetFieldNameById(payload.contact.country_uuid, this.countries),
        phone: payload.contact.country_uuid,
        iso2: this.GetISO2ByPhone(payload.contact.phone),
        payment_term: payload.payment_term_name,
        ani_group: GetFieldNameById(payload.default_ani_group_uuid, this.ani_groups),
        product: payload.product_name
      }
    }
  }
}
</script>