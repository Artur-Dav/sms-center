<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Add"
            :disabled="!validateForm"
          >Submit</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div class="smsc-box">
        <div class="smsc-box__col">
          <div class="smsc-box__item">
            <label class="vs-input--label">Client</label>
            <v-select
              :options="companies"
              @input="payload.company_uuid = $event && $event.value"
              label="name"
              placeholder="Select Company"
            />
          </div>
          <div class="smsc-box__item">
            <vs-input
              class="w-100"
              label="Amount"
              placeholder="Enter amount"
              type="text"
              v-model="payload.amount"
            />
          </div>
          <div class="smsc-box__item">
            <label class="vs-input--label">Note</label>
            <vs-textarea
              v-model="payload.note"
              :counter-danger="true"
              counter="160"
              width="100%"
              height="160px"
            />
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
    vSelect,
  },
  data() {
    return {
      companies: [],

      // Request data
      payload: {
        company_uuid: null,
        amount: null,
        note: null,
        method: 'manual'
      }
    }
  },
  computed: {
    validateForm() {
      let keys = Object.keys(this.payload)
      const except = ['note']

      except.forEach(e_field => {
        keys = keys.filter(field => field !== e_field)
      })

      const is_valid = keys.findIndex(value => !this.payload[value]) !== -1

      return !is_valid
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    Add() {
      this.$vs.loading()
      this.$store.dispatch('payment/Add', this.payload)
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-billing-payment-list' })
          this.$vs.notify({
            title: 'Add',
            text: 'Payment has been added',
            iconPack: 'feather',
            icon: 'icon-check',
            color: 'success'
          })
        }
      })
      .catch(err => {
        this.$vs.notify({
          title: 'Registration Attempt',
          text: 'Error',
          iconPack: 'feather',
          icon: 'iicon-alert-circle',
          color: 'danger'
        })
      })
      .finally(() => this.$vs.loading.close())
    },
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCompany } = await this.$store.dispatch('company/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('company/GetList', { per_page: TotalForCompany, order_by: 'company_name', order_dir: 'asc' })

      Promise.all([p1])
      .then(res => this.companies = res[0].items.map(this.TransformCompany))
      .catch(err => console.log(err))
      .finally(() => this.$vs.loading.close())
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