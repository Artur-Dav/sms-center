<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Edit"
          >Save Account</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div slot="no-body" class="p-3">
        <smsc-col>
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
              v-model="payload.first_name"
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
              v-model="payload.last_name"
            />
            <span class="text-danger text-xs">{{ errors.first('last name') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'required|max:15'"
              data-vv-validate-on="input"
              name="user name"
              class="w-100"
              :class="{'is-danger': errors.has('user name')}"
              type="text"
              label="User Name"
              placeholder="Enter user name"
              v-model="payload.user_name"
            />
            <span class="text-danger text-xs">{{ errors.first('user name') }}</span>
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
              v-model="payload.passwd"
            />
            <span class="text-danger text-xs">{{ errors.first('password') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <label class="vs-input--label">Status</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="status"
              :class="{'is-danger': errors.has('status')}"
              label="name"
              :options="status"
              :searchable="false"
              v-model="selected.status"
              placeholder="Select Status"
              @input="payload.is_active = $event && $event.value"
            />
            <span class="text-danger text-xs">{{ errors.first('status') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'ip'"
              name="SMPP IP"
              class="w-100"
              :class="{'is-danger': errors.has('SMPP IP')}"
              type="text"
              label="Allowed SMPP IP"
              placeholder="Enter SMPP IP"
              v-model="payload.allowed_ip_list"
            />
            <span class="text-danger text-xs">{{ errors.first('SMPP IP') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <vs-input
              v-validate="'ip'"
              name="API IP"
              class="w-100"
              :class="{'is-danger': errors.has('API IP')}"
              type="text"
              label="Allowed API IP"
              placeholder="Enter API IP"
              v-model="payload.allowed_api_ip_list"
            />
            <span class="text-danger text-xs">{{ errors.first('API IP') }}</span>
          </smsc-col-item>
          <smsc-col-item>
            <label class="vs-input--label">Product</label>
            <v-select
              name="product"
              label="name"
              :options="products"
              v-model="selected.products"
              placeholder="Select Product"
              @input="payload.products = $event && $event.value"
            />
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
      status: [
        { name: 'Active', value: true },
        { name: 'Inactive', value: false }
      ],
      products: [],

      // Selected
      selected: {},

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

      const { total: TotalForProduct } = await this.$store.dispatch('product/GetList', { per_page: 0, has_company_uuid: this.$route.params.id })
      const p1 = await this.$store.dispatch('product/GetList', { per_page: TotalForProduct, has_company_uuid: this.$route.params.id, order_by: 'product_name', order_dir: 'asc' })

      const p2 = await this.$store.dispatch('user/GetById', this.$route.params.user_id)

      Promise.all([p1, p2])
      .then(res => {
        this.products = res[0].items.map(this.TransformProduct)
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

      // Not required fields
      if (this.payload.passwd === '********') {
        delete this.payload.passwd
      }

      this.$vs.loading()
      this.$store.dispatch('user/Edit', { id: this.$route.params.user_id, data: this.payload })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-companies-company-accounts', params: { id: this.$route.params.id } })
          this.ShowSuccessMessage({ title: 'Success', text: 'Account has been edited' })
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
        first_name: payload.first_name,
        last_name: payload.last_name,
        user_name: payload.user_name,
        passwd: payload.passwd,
        is_active: payload.is_active,
        allowed_ip_list: payload.allowed_ip_list,
        allowed_api_ip_list: payload.allowed_api_ip_list,
        products: payload.products,
        company_uuid: this.$route.params.id
      }
    },
    TransformSelected (payload) {
      return {
        status: payload.is_active ? 'Active' : 'Inactive',
      }
    },
    TransformProduct(item) {
      return {
        name: item.product_name,
        value: item.product_uuid
      }
    },
  }
}
</script>