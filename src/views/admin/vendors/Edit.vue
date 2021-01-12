<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Edit"
          >Save Vendor</vs-button>
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
              v-model="payload.vendor_name"
            />
            <span class="text-danger text-xs">{{ errors.first('company name') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required'"
              data-vv-validate-on="input"
              name="contact"
              class="w-100"
              :class="{'is-danger': errors.has('contact')}"
              type="text"
              label="Contact"
              placeholder="Enter contact name"
              v-model="payload.contact_person"
            />
            <span class="text-danger text-xs">{{ errors.first('contact') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required|email'"
              data-vv-validate-on="input"
              name="sales email"
              class="w-100"
              :class="{'is-danger': errors.has('sales email')}"
              type="text"
              label="Sales Email"
              placeholder="Enter sales email"
              v-model="payload.sales_email"
            />
            <span class="text-danger text-xs">{{ errors.first('sales email') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required|email'"
              data-vv-validate-on="input"
              name="rate email"
              class="w-100"
              :class="{'is-danger': errors.has('rate email')}"
              type="text"
              label="Rate Email"
              placeholder="Enter rate email"
              v-model="payload.rate_email"
            />
            <span class="text-danger text-xs">{{ errors.first('rate email') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required|email'"
              data-vv-validate-on="input"
              name="noc email"
              class="w-100"
              :class="{'is-danger': errors.has('noc email')}"
              type="text"
              label="Noc Email"
              placeholder="Enter noc email"
              v-model="payload.noc_email"
            />
            <span class="text-danger text-xs">{{ errors.first('noc email') }}</span>
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
      // Item ID
      id: this.$route.params.id,

      // Request body
      payload: {}
    }
  },
  created () {
    this.FetchData()
  },
  methods: {
    async FetchData() {
      this.$vs.loading()
      const p1 = await this.$store.dispatch('vendor/GetById', this.id)

      Promise.all([p1])
      .then(res => {
        this.payload = this.TransformPayload(res[0].payload)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },
    async Edit() {
      const valid = await this.$validator.validate()
      
      if (!valid) {
        return
      }

      this.$vs.loading()
      this.$store.dispatch('vendor/Edit', { id: this.id, data: this.payload })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-vendors-list' })
          this.ShowSuccessMessage({ title: 'Success', text: 'Vendor has been edited' })
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
    TransformPayload (payload) {
      return {
        vendor_name: payload.vendor_name,
        contact_person: payload.contact_person,
        sales_email: payload.sales_email,
        rate_email: payload.rate_email,
        noc_email: payload.noc_email
      }
    }
  }
}
</script>