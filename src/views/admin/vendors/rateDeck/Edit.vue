<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Edit"
          >Save DID</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div class="smsc-box">
        <div class="smsc-box__col">
          <div class="smsc-box__item">
            <vs-input
              v-validate="'required|min:11|max:16'"
              data-vv-validate-on="input"
              name="did"
              class="w-100"
              :class="{'is-danger': errors.has('did')}"
              type="number"
              label="DID"
              placeholder="Enter DID"
              v-model="payload.did"
            />
            <span class="text-danger text-xs">{{ errors.first('did') }}</span>
          </div>
          <div class="smsc-box__item">
            <label class="vs-input--label">DID Type</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="did type"
              :class="{'is-danger': errors.has('did type')}"
              label="name"
              placeholder="Select DID Type"
              v-model="selected.did_type"
              :options="did_types"
              @input="payload.did_type = $event && $event.value"
            />
            <span class="text-danger text-sm">{{ errors.first('did type') }}</span>
          </div>
          <div class="smsc-box__item">
            <label class="vs-input--label">Country</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="country"
              :class="{'is-danger': errors.has('country')}"
              label="name"
              placeholder="Select Country"
              v-model="selected.country"
              :options="countries"
              @input="payload.country_uuid = $event && $event.value"
            />
            <span class="text-danger text-sm">{{ errors.first('country') }}</span>
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
      did_types: [
        { name: 'ANI', value: 'ANI' },
        { name: 'DNIS', value: 'DNIS' }
      ],
      countries: [],

      // Selected
      selected: {},

      // Item ID
      did: this.$route.params.did,

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

      const { total: TotalForCountry } = await this.$store.dispatch('country/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('country/GetList', { per_page: TotalForCountry, order_by: 'nice_name', order_dir: 'asc' })

      const p2 = await this.$store.dispatch('did/GetDid', this.did)

      Promise.all([p1, p2])
      .then(res => {
        this.countries = res[0].items.map(this.TransformCountry)
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
      this.$store.dispatch('did/Edit', { id: this.did, data: this.payload })
      .then(res => {
        if (res.success) {
          this.$router.push({ name: 'admin-vendors-did', params: { id: this.$route.params.id } })
          this.ShowSuccessMessage({ title: 'Success', text: 'DID has been edited' })
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
        did: payload.did,
        did_type: payload.did_type,
        country_uuid: payload.country_uuid,
        vendor_uuid: payload.vendor_uuid
      }
    },
    TransformSelected (payload) {
      return {
        did_type: payload.did_type,
        country: payload.country_name
      }
    },
    TransformCountry(item) {
      return {
        name: item.nice_name,
        value: item.country_uuid
      }
    },
  }
}
</script>