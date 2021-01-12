<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Edit"
          >Save User</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <smsc-col>
        <smsc-col-item>
          <vs-input
            v-validate="'required|alpha'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('first name')}"
            name="first name"
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
            class="w-100"
            :class="{'is-danger': errors.has('last name')}"
            name="last name"
            type="text"
            label="First Name"
            placeholder="Enter last name"
            v-model="payload.last_name"
          />
          <span class="text-danger text-xs">{{ errors.first('last name') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('user name')}"
            name="user name"
            type="text"
            label="User Name"
            placeholder="Enter user name"
            v-model="payload.user_name"
          />
          <span class="text-danger text-xs">{{ errors.first('user name') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            v-validate="'required|email'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('email')}"
            name="email"
            type="text"
            label="Email"
            placeholder="Enter email"
            v-model="payload.email"
          />
          <span class="text-danger text-xs">{{ errors.first('email') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="input"
            class="w-100"
            :class="{'is-danger': errors.has('password')}"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            v-model="payload.passwd"
          />
          <span class="text-danger text-xs">{{ errors.first('password') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="input"
            name="re-enter password"
            type="password"
            :class="{'is-danger': errors.has('re-enter password')}"
            label="Re-Enter Password"
            placeholder="Re-enter passowrd"
            v-model="selected.re_password"
            class="w-full" />
          <span class="text-danger text-sm">{{ errors.first('re-enter password') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <label class="vs-input--label">Active</label>
          <v-select
            v-validate="'required'"
            data-vv-validate-on="input"
            :class="{'is-danger': errors.has('active')}"
            name="active"
            :options="active"
            label="name"
            v-model="selected.active"
            @input="payload.is_active = $event && $event.value"
          />
          <span class="text-danger text-xs">{{ errors.first('active') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <label class="vs-input--label">Company</label>
          <v-select
            v-validate="'required'"
            data-vv-validate-on="input"
            :class="{'is-danger': errors.has('company')}"
            name="company"
            :options="companies"
            label="name"
            v-model="selected.company"
            @input="payload.company_uuid = $event && $event.value"
          />
          <span class="text-danger text-xs">{{ errors.first('company') }}</span>
        </smsc-col-item>
        <smsc-col-item>
          <vs-input
            class="w-100"
            name="throughput"
            type="number"
            label="Throughput"
            placeholder="Enter throughput"
            v-model="payload.throughput"
          />
        </smsc-col-item>
      </smsc-col>
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
      active: [
        { name: 'True', value: true },
        { name: 'False', value: false }
      ],
      companies: [],

      // Selects value
      selected: {
        active: null,
        company: null
      },

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
      const { total: TotalForCompany } = await this.$store.dispatch('company/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('company/GetList', { per_page: TotalForCompany, order_by: 'company_name', order_dir: 'asc' })

      const p2 = await this.$store.dispatch('user/GetById', this.id)

      Promise.all([p1, p2])
      .then(res => {
        this.companies = res[0].items.map(this.TransformCompany)
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

      // These fields not required
      if (!this.payload.throughput) {
        delete this.payload.throughput
      }
      if (this.payload.passwd === '********') {
        delete this.payload.passwd
      }

      this.$vs.loading()
      this.$store.dispatch('user/Edit', { id: this.id, data: this.payload })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-users-list' })
          this.ShowSuccessMessage({ title: 'Success', text: 'User has been edited' })
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
    TransformCompany(item) {
      return {
        name: item.company_name,
        value: item.company_uuid
      }
    },
    TransformPayload (payload) {
      return {
        first_name: payload.first_name,
        last_name: payload.last_name,
        user_name: payload.user_name,
        email: payload.email,
        passwd: payload.passwd,
        is_active: payload.is_active,
        company_uuid: payload.company_uuid,
        throughput: payload.throughput
      }
    },
    TransformSelected (payload) {
      return {
        active: payload.is_active ? 'True' : 'False',
        company: payload.company_name,
        re_password: payload.passwd
      }
    }
  }
}
</script>