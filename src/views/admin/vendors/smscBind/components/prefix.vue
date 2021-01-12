<template>
  <div class="prefix-type">
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
  props: {
    addData: {
      type: Array,
      default: () => []
    },
    editData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      add_data: [],
      edit_data: []
    }
  },
  computed: {
    isRequired () {
      return this.add_data.length !== 1 || this.add_data[0].code || this.add_data[0].price ? 'required' : false
    }
  },
  created () {
    this.CloneDataFromProps()
  },
  methods: {
    async GetData () {
      const valid = await this.$validator.validate()

      if (!valid) {
        return null
      }

      if (this.isRequired) {
        return [...this.add_data, ...this.edit_data]
      }

      return this.edit_data
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
    CloneDataFromProps () {
      this.add_data = this.addData.slice()
      this.edit_data = this.editData.slice()
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