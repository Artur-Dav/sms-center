<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start pb-3">
          <div class="pt-3" style="min-width: 220px">
            <label class="vs-input--label">Vendor Product</label>
            <v-select
              name="vendor product"
              label="name"
              placeholder="Select product"
              v-model="selected.vendor_product"
              :options="vendor_products"
              @input="GetList"
            />
          </div>
        </div>
        <div class="buttons-container flex flex-wrap items-center justify-end">
        </div>
      </div>
    </vx-card>
    <vx-card>
      <prefix
        v-if="rate_table_type === 'prefix'"
        :vendor-product="selected.vendor_product && selected.vendor_product.value"
      />
      <mncmcc
        v-else-if="rate_table_type === 'MNCMCC'"
        :vendor-product="selected.vendor_product && selected.vendor_product.value"
      />
      <no-data v-else />
    </vx-card>
  </div>
</template>

<script>
// Packages
import vSelect from 'vue-select'

// Components
import prefix from './components/prefix.vue'
import mncmcc from './components/mncmcc.vue'

export default {
  components: {
    vSelect,
    prefix,
    mncmcc,
  },
  data() {
    return {
      // Dropdowns
      vendor_products: [],

      // Selected values
      selected: {
        vendor_product: null
      },

      rate_table_type: null,
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForVendorProduct } = await this.$store.dispatch('vendorProduct/GetList', { per_page: 0, vendor_uuid: this.$route.params.id })
      const p1 = await this.$store.dispatch('vendorProduct/GetList', { per_page: TotalForVendorProduct, vendor_uuid: this.$route.params.id, order_by: 'vendor_product_name', order_dir: 'asc' })

      Promise.all([p1])
      .then(res => {
        this.vendor_products = res[0].items.map(this.TransformVendorProduct)
        this.selected.vendor_product = this.GetFieldById(this.$route.query.vendor_product_uuid, this.vendor_products) || this.vendor_products[0] || null

        const query = {
          vendor_product_uuid: this.vendor_products[0].value,
          rate_table_uuid: this.vendor_products[0].rate_table_uuid,
          rate_table_type: this.rate_table_type
        }
        this.$router.push({ query: Object.assign({}, this.$route.query, query ) }).catch(()=>{})

        this.GetList(this.selected.vendor_product)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    async GetList (e) {
      if (!e) { return }

      this.$vs.loading()
      const { items } = await this.$store.dispatch('rate/GetList', { per_page: 1, vendor_product_uuid: e.value })
      this.rate_table_type = items.length && items[0].rate_table_type || null

      const query = {
          vendor_product_uuid: e.value,
          rate_table_uuid: items.length && items[0].rate_table_uuid,
          rate_table_type: this.rate_table_type
        }
      this.$router.push({ query: Object.assign({}, this.$route.query, query) }).catch(()=>{})

      this.$vs.loading.close()
    },

    GetFieldById (id, list) {
      return list.find(item => item.value === id)
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
    TransformVendorProduct(item) {
      return {
        name: item.vendor_product_name,
        value: item.vendor_product_uuid,
        rate_table_uuid: item.rate_table_uuid
      }
    },
    TransformRate(item) {
      return {
        country_name: item.country_name,
        mobile_network_name: item.mobile_network_name,
        price: item.price,
        vendor_product_name: item.vendor_product_name,
      }
    }
  }
}
</script>

