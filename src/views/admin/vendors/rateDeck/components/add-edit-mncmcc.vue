<template>
  <div class="mncmcc-type">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Save"
          >Save</vs-button>
        </div>
      </div>
    </vx-card>
    <vx-card>
      <vs-divider>Add Vendor Rate</vs-divider>
      <div class="rate-box">
        <div
          class="rate-box__item"
          v-for="(item, index) in add_data"
          :key="`rate-box__item${index}`"
        >
          <div class="rate-box__inputs">
            <smsc-col>
              <smsc-col-item>
                <label class="vs-input--label">Country</label>
                <v-select
                  v-validate="isRequired"
                  data-vv-validate-on="input"
                  :name="`country ${index+1}`"
                  :class="{'is-danger': errors.has(`country ${index+1}`)}"
                  label="name"
                  placeholder="Select Country"
                  v-model="item.country"
                  :options="countries"
                  @input="ChangeCountry($event, item, index)"
                />
                <span class="text-danger text-sm">{{ errors.first(`country ${index+1}`) }}</span>
              </smsc-col-item>
              <smsc-col-item>
                <label class="vs-input--label">Operator</label>
                <v-select
                  v-validate="isRequired"
                  data-vv-validate-on="input"
                  :name="`operator ${index+1}`"
                  :class="{'is-danger': errors.has(`operator ${index+1}`)}"
                  label="name"
                  placeholder="Select Operator"
                  v-model="item.operator"
                  :options="item.operators"
                  @input="item.mobile_network_uuid = $event && $event.value"
                />
                <span class="text-danger text-sm">{{ errors.first(`operator ${index+1}`) }}</span>
              </smsc-col-item>
              <smsc-col-item>
                <vs-input
                  v-validate="isRequired"
                  data-vv-validate-on="input"
                  :name="`rate ${index+1}`"
                  class="w-100"
                  :class="{'is-danger': errors.has(`rate ${index+1}`)}"
                  type="number"
                  label="Vendor Product Name"
                  placeholder="Enter rate"
                  v-model="item.price"
                />
                <span class="text-danger text-xs">{{ errors.first(`rate ${index+1}`) }}</span>
              </smsc-col-item>
            </smsc-col>
          </div>
          <div class="rate-box__remove flex items-center justify-center">
            <x-icon
              v-if="index !== 0"
              size="1.8x"
              class="cursor-pointer"
              @click="RemoveRow(index, 'add_data')"/>
          </div>
        </div>
        <div class="flex align-center justify-center pt-3 pb-5">
          <div
            class="add-rate flex align-center cursor-pointer"
            @click="AddRow" >
            <plus-circle-icon
              size="1.6x"
              class="mr-2" />
              <span class="add-text">Add Rate</span>
          </div>
        </div>
      </div>

      <vs-divider>{{ edit_data.length ? 'Edit Vendor Rate' : 'No Rates Found' }}</vs-divider>
      <div class="rate-box">
        <div
          class="rate-box__item"
          v-for="(item, index) in edit_data"
          :key="`rate-box__item${index}`"
        >
          <div class="rate-box__inputs">
            <smsc-col>
              <smsc-col-item>
                <label class="vs-input--label">Country</label>
                <v-select
                  v-validate="'required'"
                  data-vv-validate-on="input"
                  :name="`country  ${index+1}`"
                  :class="{'is-danger': errors.has(`country  ${index+1}`)}"
                  label="name"
                  placeholder="Select Country"
                  v-model="item.country"
                  :options="countries"
                  @input="ChangeCountry($event, item, index)"
                />
                <span class="text-danger text-sm">{{ errors.first(`country  ${index+1}`) }}</span>
              </smsc-col-item>
              <smsc-col-item>
                <label class="vs-input--label">Operator</label>
                <v-select
                  v-validate="'required'"
                  data-vv-validate-on="input"
                  :name="`operator  ${index+1}`"
                  :class="{'is-danger': errors.has(`operator  ${index+1}`)}"
                  label="name"
                  placeholder="Select Operator"
                  v-model="item.operator"
                  :options="item.operators"
                  @input="item.mobile_network_uuid = $event && $event.value"
                />
                <span class="text-danger text-sm">{{ errors.first(`operator  ${index+1}`) }}</span>
              </smsc-col-item>
              <smsc-col-item>
                <vs-input
                  v-validate="'required'"
                  data-vv-validate-on="input"
                  :name="`rate  ${index+1}`"
                  class="w-100"
                  :class="{'is-danger': errors.has(`rate  ${index+1}`)}"
                  type="number"
                  label="Rate"
                  placeholder="Enter rate"
                  v-model="item.price"
                />
                <span class="text-danger text-xs">{{ errors.first(`rate  ${index+1}`) }}</span>
              </smsc-col-item>
            </smsc-col>
          </div>
          <div class="rate-box__remove flex items-center justify-center">
            <x-icon
              size="1.8x"
              class="cursor-pointer"
              @click="RemoveRow(index, 'edit_data')"/>
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
// Icons
import { XIcon, PlusCircleIcon } from 'vue-feather-icons'

// Packages
import vSelect from 'vue-select'

// Utils
import { GetFieldNameById } from '@/assets/utils/utils.js'

export default {
  components: {
    XIcon,
    PlusCircleIcon,
    vSelect
  },
  data () {
    return {
      // Dropdowns
      countries: [],

      // Selected
      selected: {},

      add_data: [{ code: null, mobile_network_uuid: null, price: null }],
      edit_data: [],

      // Request body
      payload: {
        rate_table_type: this.$route.query.rate_table_type,
        rates: []
      }
    }
  },
  computed: {
    isRequired () {
      return this.add_data.length !== 1 || this.add_data[0].code || this.add_data[0].price || this.add_data[0].mobile_network_uuid ? 'required' : false
    }
  },
  created () {
    this.FetchData()
  },
  methods: {
    async Save () {
      const valid = await this.$validator.validate()

      if (!valid) {
        return
      }

      if (this.isRequired) {
        this.payload.rates = [...this.add_data.map(this.TransformPayload), ...this.edit_data.map(this.TransformPayload)]
      } else {
        this.payload.rates = [...this.edit_data.map(this.TransformPayload)]
      }

      this.$vs.loading()
      this.$store.dispatch('rateTable/Edit', { id: this.$route.query.rate_table_uuid, data: this.payload })
      .then(res => {
        this.$router.push({ name: 'admin-vendors-rate-deck-list', params: { id: this.$route.params.id }, query: {...this.$route.query} })
        this.ShowSuccessMessage({ title: 'Success', text: 'Rate has been added' })
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    async FetchData () {
      this.$vs.loading()
      const { total: TotalForCountry } = await this.$store.dispatch('country/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('country/GetList', { per_page: TotalForCountry, order_by: 'nice_name', order_dir: 'asc' })

      const { total: TotalForRate } = await this.$store.dispatch('rate/GetList', { per_page: 0, vendor_product_uuid: this.$route.query.vendor_product_uuid })
      const p2 = await this.$store.dispatch('rate/GetList', { per_page: TotalForRate, vendor_product_uuid: this.$route.query.vendor_product_uuid })

      Promise.all([p1, p2])
      .then(res => {
        this.countries = res[0].items.map(this.TransformCountry)
        this.edit_data = res[1].items.map(this.TransformEditData)
        this.CloneDataFromProps()
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    async GetMobileNetwork (country_code) {
      const { total } = await this.$store.dispatch('mobileNetwork/GetList', { country_code, page: 0, per_page: 0 })
      return await this.$store.dispatch('mobileNetwork/GetList', { country_code, page: 0, per_page: total })
    },

    async ChangeCountry (e, item, index) {
      if (!e) {
        item.code = null
        item.operators = []
        item.operator = null
        return
      }

      this.$vs.loading()

      const res = await this.GetMobileNetwork(e.value)

      item.code = e.value
      item.operator = null
      item.operators = res.items.map(this.TransformOperator)
      this.add_data = [...this.add_data]

      this.$vs.loading.close()
    },
    AddRow () {
      const new_row = {
        code: null,
        mobile_network_uuid: null,
        price: null
      }

      this.add_data.push(new_row)
    },
    RemoveRow (index, data) {
      this[data] = [...this[data].slice(0, index), ...this[data].slice(index + 1)]
    },
    CloneDataFromProps () {
      this.$vs.loading()
      // this.edit_data = this.editData.map(this.TransformEditData)
      const array_promises = []

      this.edit_data.forEach(item => {
        array_promises.push(this.GetMobileNetwork(item.code))
      })
      
      Promise.all(array_promises)
      .then(res => {
        res.forEach((item, index) => {
          this.edit_data[index].operators = item.items.map(this.TransformOperator)
          this.edit_data[index].operator = GetFieldNameById(this.edit_data[index].mobile_network_uuid, this.edit_data[index].operators)
        })
        this.edit_data = [...this.edit_data]
        this.$vs.loading.close()
      })
    },

    // Transform functions
    TransformPayload (payload) {
      return {
        code: payload.code,
        mobile_network_uuid: payload.mobile_network_uuid,
        price: payload.price
      }
    },
    TransformCountry (item) {
      return {
        name: item.nice_name,
        value: item.phone_code
      }
    },
    TransformOperator (item) {
      return {
        name: item.network_name,
        value: item.mobile_network_uuid
      }
    },
    TransformEditData (item) {
      return {
        ...item,
        country: GetFieldNameById(item.code, this.countries),
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rate-box {
  width: 100%;

  .rate-box__item {
    display: flex;
    align-items: center;
    width: inherit;
    margin-bottom: 15px;
    border-radius: 10px;
    background: #8d8d8d12;

    &:last-child {
      margin-bottom: 0;
    }
    .rate-box__inputs {
      flex-basis: calc(100% - 40px);
    }
    .rate-box__remove {
      flex-basis: 40px;
      padding: 5px;
    }
  }
  .add-text {
    line-height: 23px;
  }
}
</style>