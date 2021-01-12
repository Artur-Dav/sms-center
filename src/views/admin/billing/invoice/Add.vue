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
          >Add Invoice</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div class="smsc-box">
        <div class="smsc-box__col">
          <div class="smsc-box__item">
            <label class="vs-input--label">Start Date</label>
            <div>
              <flat-pickr
                class="w-100"
                placeholder="Select Date"
                :config="{
                  ...configdateTimePicker,
                  dateFormat: 'Y-m-d',
                  defaultDate: null,
                  enableTime: false,
                  enableSeconds: false
                }"
                v-model="payload.invoice_start_date"
              />
            </div>
          </div>
          <div class="smsc-box__item">
            <label class="vs-input--label">End Date</label>
            <div>
              <flat-pickr
                class="w-100"
                placeholder="Select Date"
                :config="{
                  ...configdateTimePicker,
                  dateFormat: 'Y-m-d',
                  defaultDate: null,
                  enableTime: false,
                  enableSeconds: false
                }"
                v-model="payload.invoice_end_date"
              />
            </div>
          </div>
          <div class="smsc-box__item">
            <label class="vs-input--label">Company</label>
            <v-select
              class="filter-select"
              :options="companies"
              @input="payload.company_uuid = $event && $event.value"
              label="name"
              placeholder="Select Company"
            />
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
// Mixins
import DateTimeMixin from '@/mixins/datetime.js'

// Packages
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  mixins: [DateTimeMixin],
  components: {
    vSelect,
    flatPickr
  },
  data() {
    return {
      companies: [],

      // Request data
      payload: {
        invoice_start_date: null,
        invoice_end_date: null,
        company_uuid: null
      }
    }
  },
  computed: {
    validateForm() {
      const values = Object.values(this.payload)
      const is_valid = values.findIndex(value => !value) !== -1

      return !is_valid
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    Add() {
      this.$vs.loading()
      this.$store.dispatch('invoice/Add', this.payload)
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-billing-invoice-list' })
          this.$vs.notify({
            title: 'Adding invoice Attempt',
            text: 'Invoice has been added',
            iconPack: 'feather',
            icon: 'icon-check',
            color: 'success'
          })
        }
      })
      .catch(err => {
        this.$vs.notify({
          title: 'Error',
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