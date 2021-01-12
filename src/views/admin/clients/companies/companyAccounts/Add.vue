<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Add"
          >Add Account</vs-button>
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
              v-validate="'required'"
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
              name="IP"
              class="w-100"
              :class="{'is-danger': errors.has('IP')}"
              type="text"
              label="IP"
              placeholder="Enter IP"
              v-model="payload.allowed_ip_list"
            />
            <span class="text-danger text-xs">{{ errors.first('IP') }}</span>
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

      // Selected
      selected: {
        status: { name: 'Active', value: true },
      },

      // Request body
      payload: {
        first_name: null,
        last_name: null,
        user_name: null,
        passwd: null,
        is_active: true,
        allowed_ip_list: null,
        company_uuid: this.$route.params.id,
        products: []
      }
    }
  },
  methods: {
    async Add() {
      const valid = await this.$validator.validate()
      
      if (!valid) {
        return
      }

      this.$vs.loading()
      this.$store.dispatch('user/Add', this.payload)
      .then(res => {
        this.$router.push({ name: 'admin-companies-company-accounts', params: { id: this.$route.params.id } })
        this.ShowSuccessMessage({ title: 'Success', text: 'Account has been added' })
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
    }
  }
}
</script>