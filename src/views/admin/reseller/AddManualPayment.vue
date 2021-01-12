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
              name="amount"
              class="w-100"
              :class="{'is-danger': errors.has('amount')}"
              type="number"
              label="Amount"
              placeholder="Enter amount"
              v-model="payload.amount"
            />
            <span class="text-danger text-xs">{{ errors.first('amount') }}</span>
          </div>
          <div class="smsc-box__item">
            <label class="vs-input--label">Reseller</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="reseller"
              :class="{'is-danger': errors.has('reseller')}"
              label="name"
              :options="resellers"
              v-model="selects.reseller"
              placeholder="Select Reseller"
              @input="payload.reseller_uuid = $event && $event.value"
            />
            <span class="text-danger text-xs">{{ errors.first('reseller') }}</span>
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
      resellers: [],

      // Selects value
      selects: {
        reseller_uuid: null,
      },

      // Request body
      payload: {
        amount: null,
        company_uuid: null,
        method: "manual",
        reseller_uuid: null
      },
      // input_fields: [
      //   [
      //     {
      //       field_type: 'input',
      //       field_name: 'amount',
      //       type: 'text',
      //       label: 'Amount',
      //       placeholder: 'Enter amount',
      //       value: '',
      //       is_required: true,
      //       is_valid: true,
      //       danger_text: 'The amount field is required.'
      //     }
      //   ],
      //   [
      //     {
      //       field_type: 'select',
      //       field_name: 'reseller_uuid',
      //       type: 'text',
      //       label: 'Reseller',
      //       options: [],
      //       value: { label: 'Select Reseller', value: null },
      //       is_required: true,
      //       is_valid: true,
      //       danger_text: 'The reseller is required.'
      //     }
      //   ]
      // ]
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForReseller } = await this.$store.dispatch('reseller/GetList', { per_page: 0, page: 0 })
      const p1 = await this.$store.dispatch('reseller/GetList', { per_page: TotalForReseller, page: 0 })

      Promise.all([p1])
      .then(res => {
        this.resellers = res[0].items.map(this.TransformReseller)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async Add() {
      const valid = await this.$validator.validate()
      
      if (!valid) {
        return
      }

      this.$vs.loading()
      this.$store.dispatch('payment/Add', this.payload)
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-reseller-list' })
          this.ShowSuccessMessage({ title: 'Success', text: 'Manual Payment has been added' })
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

    // Transform functions
    TransformReseller(item) {
      return {
        name: item.reseller_name,
        value: item.reseller_uuid
      }
    },
  }
}
</script>
