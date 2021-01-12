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
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="code"
              class="w-100"
              :class="{'is-danger': errors.has('code')}"
              type="number"
              label="Code"
              placeholder="Enter code"
              v-model="new_rate.code"
            />
            <span class="text-danger text-xs">{{ errors.first('code') }}</span>
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
export default {
  data() {
    return {
      new_rate: {
        code: null,
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

    async FetchData() {
      this.$vs.loading()

      const { total: TotalForRate } = await this.$store.dispatch('rate/GetList', { per_page: 0, vendor_product_uuid: this.$route.query.vendor_product_uuid })
      const p1 = await this.$store.dispatch('rate/GetList', { per_page: TotalForRate, vendor_product_uuid: this.$route.query.vendor_product_uuid })

      Promise.all([p1])
      .then(res => {
        this.payload.rates = res[0].items.map(this.TransformRate)
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
    TransformRate (item) {
      return {
        code: item.code,
        price: item.price
      }
    },
  }
}
</script>