<template>
  <div class="prefix-type">
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
                <vs-input
                  v-validate="isRequired"
                  data-vv-validate-on="input"
                  :name="`code ${index+1}`"
                  class="w-100"
                  :class="{'is-danger': errors.has(`code ${index+1}`)}"
                  type="number"
                  label="Code"
                  placeholder="Enter code"
                  v-model="item.code"
                />
                <span class="text-danger text-xs">{{ errors.first(`code ${index+1}`) }}</span>
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

      <vs-divider class="mt-10">{{ edit_data.length ? 'Edit Vendor Rate' : 'No Rates Found' }}</vs-Divider>
      <div class="rate-box">
        <div
          class="rate-box__item"
          v-for="(item, index) in edit_data"
          :key="`rate-box__item${index}`"
        >
          <div class="rate-box__inputs">
            <smsc-col>
              <smsc-col-item>
                <vs-input
                  v-validate="'required'"
                  data-vv-validate-on="input"
                  :name="`code  ${index+1}`"
                  class="w-100"
                  :class="{'is-danger': errors.has(`code  ${index+1}`)}"
                  type="number"
                  label="Code"
                  placeholder="Enter code"
                  v-model="item.code"
                />
                <span class="text-danger text-xs">{{ errors.first(`code  ${index+1}`) }}</span>
              </smsc-col-item>
              <smsc-col-item>
                <vs-input
                  v-validate="'required'"
                  data-vv-validate-on="input"
                  :name="`rate  ${index+1}`"
                  class="w-100"
                  :class="{'is-danger': errors.has(`rate  ${index+1}`)}"
                  type="number"
                  label="Vendor Product Name"
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

export default {
  components: {
    XIcon,
    PlusCircleIcon
  },
  data () {
    return {
      add_data: [{ code: null, price: null }],
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
      return this.add_data.length !== 1 || this.add_data[0].code || this.add_data[0].price ? 'required' : false
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
        this.payload.rates = [...this.add_data, ...this.edit_data]
      } else {
        this.payload.rates = [...this.edit_data]
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

    async FetchData() {
      this.$vs.loading()

      const { total: TotalForRate } = await this.$store.dispatch('rate/GetList', { per_page: 0, vendor_product_uuid: this.$route.query.vendor_product_uuid })
      const p1 = await this.$store.dispatch('rate/GetList', { per_page: TotalForRate, vendor_product_uuid: this.$route.query.vendor_product_uuid })

      Promise.all([p1])
      .then(res => {
        this.edit_data = res[0].items.map(this.TransformRate)
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    AddRow () {
      const new_row = {
        code: null,
        price: null
      }

      this.add_data.push(new_row)
    },
    RemoveRow (index, data) {
      this[data] = [...this[data].slice(0, index), ...this[data].slice(index + 1)]
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
    TransformRate (item) {
      return {
        code: item.code,
        price: item.price
      }
    },
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