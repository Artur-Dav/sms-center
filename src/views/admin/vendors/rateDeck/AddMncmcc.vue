<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Add"
          >Add Rate</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div class="smsc-box">
        <div class="smsc-box__col">
          <div class="smsc-box__item">
            <label class="vs-input--label">Country</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="country"
              :class="{'is-danger': errors.has('country')}"
              label="name"
              placeholder="Select Country"
              v-model="selected.country"
              :options="countries"
              @input="ChangeCountry"
            />
            <span class="text-danger text-sm">{{ errors.first('country') }}</span>
          </div>
          <div class="smsc-box__item">
            <label class="vs-input--label">Operator</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="operator"
              :class="{'is-danger': errors.has('operator')}"
              label="name"
              placeholder="Select Operator"
              v-model="selected.network"
              :options="network_list"
              @input="new_rate.mobile_network_uuid = $event && $event.value"
            />
            <span class="text-danger text-sm">{{ errors.first('operator') }}</span>
          </div>
          <div class="smsc-box__item">
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="rate"
              class="w-100"
              :class="{'is-danger': errors.has('rate')}"
              type="number"
              label="Rate"
              placeholder="Enter rate"
              v-model="new_rate.price"
            />
            <span class="text-danger text-xs">{{ errors.first('rate') }}</span>
          </div>
        </div>
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
      network_list: [],

      // Selected
      selected: {},

      new_rate: {
        code: null,
        mobile_network_uuid: null,
        price: null,
      },

      // Request body
      payload: {
        rate_table_type: this.$route.query.rate_table_type,
        rates: []
      }
    }
  },
  created () {
    this.FetchData()
  },
  methods: {
    async Add() {
      const valid = await this.$validator.validate()
      
      if (!valid) {
        return
      }

      this.payload.rates.push(this.new_rate)

      this.$vs.loading()
      this.$store.dispatch('rateTable/Edit', { id: this.$route.query.rate_table_uuid, data: this.payload })
      .then(res => {
        this.$router.push({ name: 'admin-vendors-rate-deck-list', params: { id: this.$route.params.id } })
        this.ShowSuccessMessage({ title: 'Success', text: 'Rate has been added' })
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    async ChangeCountry (e) {
      if (!e) {
        this.selected.rate = null
        this.network_list = []
        return
      }

      const { total } = await this.$store.dispatch('mobileNetwork/GetList', { page: 0, per_page: 0, country_code: e.value })
      const { items } = await this.$store.dispatch('mobileNetwork/GetList', { page: 0, per_page: total, country_code: e.value })

      this.network_list = items.map(this.TransformNetwork)
      this.new_rate.code = e.value
    },

    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCountry } = await this.$store.dispatch('country/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('country/GetList', { per_page: TotalForCountry, order_by: 'nice_name', order_dir: 'asc' })

      const { total: TotalForRate } = await this.$store.dispatch('rate/GetList', { per_page: 0, vendor_product_uuid: this.$route.query.vendor_product_uuid })
      const p2 = await this.$store.dispatch('rate/GetList', { per_page: TotalForRate, vendor_product_uuid: this.$route.query.vendor_product_uuid })

      Promise.all([p1, p2])
      .then(res => {
        this.countries = res[0].items.map(this.TransformCountry)
        this.payload.rates = res[1].items.map(this.TransformRate)
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

    // Transform functions
    TransformCountry (item) {
      return {
        name: item.nice_name,
        value: item.country_uuid
      }
    },
    TransformRate (item) {
      return {
        code: item.code,
        mobile_network_uuid: item.mobile_network_uuid,
        price: item.price
      }
    },
    TransformNetwork (item) {
      return {
        name: item.network_name,
        value: item.mobile_network_uuid
      }
    },
  }
}
</script>