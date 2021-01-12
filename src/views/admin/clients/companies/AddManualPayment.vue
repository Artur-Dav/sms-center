<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Add"
          >Add Manual Payment</vs-button>
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
              class="w-100"
              :class="{'is-danger': errors.has('amount')}"
              name="amount"
              type="number"
              label="Amount"
              placeholder="Enter amount"
              v-model="payload.amount"
            />
            <span class="text-danger text-xs">{{ errors.first('amount') }}</span>
          </div>
          <div class="smsc-box__item">
            <label class="vs-input--label">Company</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="company"
              :class="{'is-danger': errors.has('company')}"
              label="name"
              :options="companies"
              v-model="selects.company_uuid"
              placeholder="Select Company"
              @input="payload.company_uuid = $event && $event.value"
            />
            <span class="text-danger text-xs">{{ errors.first('company') }}</span>
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
      companies: [],

      // Selects value
      selects: {
        company_uuid: null
      },

      // Request body
      payload: {
        amount: null,
        company_uuid: null,
        method: "manual",
        reseller_uuid: null
      }
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

      this.$vs.loading()
      this.$store.dispatch('payment/Add', this.payload)
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-companies-list' })
          this.ShowSuccessMessage({ title: 'Success', text: 'Manual Payment has been added' })
        }
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCompany } = await this.$store.dispatch('company/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('company/GetList', { per_page: TotalForCompany, order_by: 'company_name', order_dir: 'asc' })

      Promise.all([p1])
      .then(res => this.companies = res[0].items.map(this.TransformCompany))
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
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
    TransformCompany(item) {
      return {
        name: item.company_name,
        value: item.company_uuid
      }
    }
  }
}
</script>