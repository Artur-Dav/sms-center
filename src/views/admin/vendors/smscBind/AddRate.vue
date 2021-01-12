<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Add"
          >Add Vendor Rate</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <div slot="no-body" class="p-3">
        <smsc-col style="width: calc(100% - 40px)">
          <smsc-col-item>
            <label class="vs-input--label">Rate Table Type</label>
            <v-select
              v-validate="'required'"
              data-vv-validate-on="input"
              name="rate table type"
              :class="{'is-danger': errors.has('rate table type')}"
              label="name"
              placeholder="Select Type"
              :searchable="false"
              v-model="selected.rate_table_type"
              :options="rate_table_types"
              @input="payload.rate_table_type = $event && $event.value"
            />
            <span class="text-danger text-sm">{{ errors.first('rate table type') }}</span>
          </smsc-col-item>
        </smsc-col>

        <prefix-type
          v-if="payload.rate_table_type === 'prefix'"
          :add-data="add_for_prefix"
          :edit-data="edit_for_prefix"
          ref="child"
        />
        <mncmcc-type
          v-if="payload.rate_table_type === 'MNCMCC'"
          :add-data="add_for_mncmcc"
          :edit-data="edit_for_mncmcc"
          ref="child"
        />
      </div>
    </vx-card>
  </div>
</template>

<script>
// Packages
import vSelect from 'vue-select'

// Components
import prefixType from './components/prefix.vue'
import mncmccType from './components/mncmcc.vue'

// Utils
import { GetFieldNameById } from '@/assets/utils/utils.js'

export default {
  components: {
    vSelect,
    prefixType,
    mncmccType
  },
  data() {
    return {
      // Dropdowns
      rate_table_types: [
        { name: 'Prefix', value: 'prefix' },
        { name: 'MNCMCC', value: 'MNCMCC' }
      ],

      add_for_prefix: [
        { code: null, price: null }
      ],
      add_for_mncmcc: [
        { code: null, mobile_network_uuid: null, price: null }
      ],
      edit_for_prefix: [],
      edit_for_mncmcc: [],

      // Selected
      selected: {
        rate_table_type: null,
      },

      // Request body
      payload: {}
    }
  },
  created () {
    this.FetchData()
  },
  methods: {
    async Add () {
      this.$refs.child.GetData().then(res => {
        if (res) {
          this.payload.rates = res

          this.$vs.loading()
          this.$store.dispatch('rateTable/Edit', { id: this.$route.params.rate_id, data: this.payload })
          .then(res => {
            this.$router.push({ name: 'admin-vendors-smsc-bind', params: { id: this.$route.params.id } })
            this.ShowSuccessMessage({ title: 'Success', text: 'Vendor Rate has been changed' })
          })
          .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
          .finally(() => this.$vs.loading.close())
        }
      })
    },
    async FetchData () {
      this.$vs.loading()
      const p1 = await this.$store.dispatch('rateTable/GetById', this.$route.params.rate_id)

      Promise.all([p1])
      .then(res => {
        this.payload = this.TransformPayload(res[0].payload)
        this.selected = this.TransformSelected(res[0].payload)

        if (res[0].payload.rate_table_type === 'prefix') {
          this.edit_for_prefix = res[0].payload.rates.map(this.TransformPrefix)
        } else if (res[0].payload.rate_table_type === 'MNCMCC') {
          this.edit_for_mncmcc = res[0].payload.rates.map(this.TransformMNCMCC)
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
        rate_table_type: payload.rate_table_type,
        // rates: payload.rates
      }
    },
    TransformSelected (payload) {
      return {
        rate_table_type: GetFieldNameById(payload.rate_table_type, this.rate_table_types)
      }
    },
    TransformPrefix (item) {
      return {
        code: item.code,
        price: item.price
      }
    },
    TransformMNCMCC (item) {
      return {
        code: item.code,
        mobile_network_uuid: item.mobile_network_uuid,
        price: item.price
      }
    }
  }
}
</script>