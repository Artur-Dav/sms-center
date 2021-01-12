<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Edit"
          >Save Vendor Product</vs-button>
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
              name="vendor product name"
              class="w-100"
              :class="{'is-danger': errors.has('vendor product name')}"
              type="text"
              label="Vendor Product Name"
              placeholder="Enter vendor product name"
              v-model="payload.vendor_product_name"
            />
            <span class="text-danger text-xs">{{ errors.first('vendor product name') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <label class="vs-input--label">SMSC</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="smsc"
              :class="{'is-danger': errors.has('smsc')}"
              label="name"
              placeholder="Select SMSC"
              v-model="selected.smsc_id"
              :options="smsc"
              @input="payload.smsc_id = $event && $event.value"
            />
            <span class="text-danger text-sm">{{ errors.first('smsc') }}</span>
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
      smsc: [],

      // Selected
      selected: {},

      // Item ID
      id: this.$route.params.prod_id,

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

      const { total: TotalForSmscConnection } = await this.$store.dispatch('smscConnection/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('smscConnection/GetList', { per_page: TotalForSmscConnection, order_by: 'smsc_id', order_dir: 'asc' })

      const p2 = await this.$store.dispatch('vendorProduct/GetById', this.id)

      Promise.all([p1, p2])
      .then(res => {
        this.smsc = res[0].items.map(this.TransformSmscConnection)
        this.payload = this.TransformPayload(res[1].payload)
        this.selected = this.TransformSelected(res[1].payload)
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
      this.$store.dispatch('vendorProduct/Edit', { id: this.id, data: this.payload })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-vendors-smsc-bind', params: { id: this.$route.params.id } })
          this.ShowSuccessMessage({ title: 'Success', text: 'Vendor Product has been edited' })
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
        vendor_product_name: payload.vendor_product_name,
        smsc_id: payload.smsc_id,
      }
    },
    TransformSelected (payload) {
      return {
        smsc_id: payload.smsc_id
      }
    },
    TransformSmscConnection (item) {
      return {
        name: item.smsc_id,
        value: item.smsc_id
      }
    },
  }
}
</script>