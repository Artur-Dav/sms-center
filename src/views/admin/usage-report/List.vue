<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="smsc-block">
        <div class="filters-container">
          <div class="smsc-navigation">
            <div class="smsc-navigation__col">
              <div class="smsc-navigation__item">
                <label class="vs-input--label">Client</label>
                <v-select
                  class="w-100"
                  label="name"
                  :options="companies"
                  placeholder="Select Client"
                  @input="selected.company_name = $event && $event.name"
                />
              </div>
              <div class="smsc-navigation__item">
                <label class="vs-input--label">Vendor</label>
                <v-select
                  label="name"
                  :options="vendors"
                  placeholder="Select Vendor"
                  @input="selected.vendor_id = $event && $event.name"
                />
              </div>
            </div>
            <div class="smsc-navigation__col">
              <div class="smsc-navigation__item">
                <label class="vs-input--label">Start Date</label>
                <div>
                  <flat-pickr
                    class="w-100"
                    :config="{
                      ...configdateTimePicker,
                      defaultDate: new Date().setHours(0, 0, 0),
                      onReady: SetDatetimeForStart,
                      onChange: SetDatetimeForStart,
                    }"
                    v-model="start_date"
                  />
                </div>
              </div>
              <div class="smsc-navigation__item">
                <label class="vs-input--label">End Date</label>
                <div>
                  <flat-pickr
                    class="w-100"
                    :config="{
                      ...configdateTimePicker,
                      defaultDate: new Date().setHours(23, 59, 59),
                      onReady: SetDatetimeForEnd,
                      onChange: SetDatetimeForEnd,
                    }"
                    v-model="end_date"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="smsc-navigation">
            <div class="smsc-navigation__col">
              <div class="smsc-navigation__item">
                <vs-input
                  label="DNIS Prefix"
                  class="w-100"
                  v-model="selected.dnis_prefix"
                />
              </div>
              <div class="smsc-navigation__item">
                <vs-input
                  class="w-100"
                  label="ANI"
                  v-model="selected.ani"
                />
              </div>
            </div>
            <div class="smsc-navigation__col">
              <div class="smsc-navigation__item">
                <label class="vs-input--label">Step</label>
                <v-select
                  class="w-100"
                  label="name"
                  :options="steps"
                  v-model="step_value"
                  @input="selected.step = $event && $event.value"
                />
              </div>
              <div class="smsc-navigation__item" style="opacity: 0; height: 1px; overflow: hidden">
                <label class="vs-input--label">Step</label>
                <v-select
                  label="name"
                  :options="steps"
                  :searchable="false"
                  :value="{ name: 'Hourly', value: 'hour' }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="smsc-block__footer">
          <div class="checkboxes">
            <vs-checkbox
              class="checkbox mr-5"
              v-model="check_for_client"
              @input="ChangeCheckboxList('company_name', $event)"
            >Group by Client</vs-checkbox>
            <vs-checkbox
            class="checkbox"
              v-model="check_for_vendor"
              @input="ChangeCheckboxList('vendor_id', $event)"
            >Group by Vendor</vs-checkbox>
          </div>
          <div class="buttons-container">
            <vue-excel-xlsx
              style="display: none"
              ref="exportBtn"
              :data="export_data"
              :columns="data_fields"
              :filename="ExcelFileName"
              sheetname="Usage Report"
            >
            </vue-excel-xlsx>
            <vs-button
              class="mt-3"
              @click="ExportExcel"
            >Export</vs-button>
            <vs-button
              class="mt-3 ml-3"
              @click="GetList"
            >Sent</vs-button>
          </div>
        </div>
      </div>
    </vx-card>

    <!-- Table -->
    <vx-card>
      <!-- Per Page -->
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <per-page
          :currentPerPage="per_page"
          :pageStart="pageStart"
          :pageEnd="pageEnd"
          :total="total"
          @change-per-page="ChangePerPage($event)"
        />
      </div>

      <!-- Table -->
      <ag-grid-vue
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="list"
        @gridReady="GridReady"
        @filterChanged="Filtering"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="isFloatingFilter"
        :pagination="true"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>

      <!-- Pagination -->
      <vs-pagination :total="totalPages" :max="maxPageNumbers" v-model="Page" />
    </vx-card>
  </div>
</template>

<script>
// Mixins
import TableMixin from "@/mixins/table.js"
import DateTimeMixin from '@/mixins/datetime.js'

// Packages
import { format } from "date-fns"
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'

export default {
  mixins: [TableMixin, DateTimeMixin],
  components: {
    AgGridVue,
    flatPickr,
    vSelect  
  },
  data() {
    return {
      // Excel
      export_data: [],
      data_fields: [],

      start_date: null,    
      end_date: null,

      step_value: { name: 'Hourly', value: 'hour' },

      check_for_client: false,
      check_for_vendor: false,
      checkboxes: [],

      companies: [],
      vendors: [],
      steps: [
        { name: 'Hourly', value: 'hour' },
        { name: 'Daily', value: 'day' }
      ],

      // Request data
      selected: {
        step: 'hour',
        company_name: null,
        vendor_id: null,
        dnis_prefix: '' || null,
        ani: '' || null
      },

      // table header value
      columnDefs: [],
      columnDefs_original: [
        {
          headerName: 'Date',
          field: 'sms_time',
          minWidth: 200,
        },
        {
          headerName: 'Total',
          field: 'sent',
          minWidth: 120
        },
        {
          headerName: 'Company Name',
          field: 'company_name',
          minWidth: 250
        },
        {
          headerName: 'Vendor Name',
          field: 'vendor_id',
          minWidth: 250
        },
        {
          headerName: 'Success',
          field: 'delivered',
          minWidth: 120
        },
        {
          headerName: 'Cost',
          field: 'tx_cost',
          minWidth: 120          
        }
      ]
    }
  },
  computed: {
    IsExistClient() {
      return this.list.length && this.list[0].hasOwnProperty('company_name')
    },
    IsExistVendor() {
      return this.list.length && this.list[0].hasOwnProperty('vendor_id')
    },
    ExcelFileName() {
      return `usage_report_${format(new Date(), 'yyyy_MM_dd')}`
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    async ExportExcel() {
      this.$vs.loading()
      const params = {
        ...this.filters,
        ...this.selected,
        from: 0,
        count: 0,
        order_by: this.order_by || null,
        order_dir: this.order_dir || null,
        fields: 'tx_cost,sent,delivered'
      }
      const { total } = await this.$store.dispatch("usageReport/GetList", params)
      const { data } = await this.$store.dispatch("usageReport/GetList", { ...params, count: total })

      if (!data.length) {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Download fail',
          text: 'Data not found',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
        return
      }

      this.export_data = data.map(this.TransformUsageReport)

      this.data_fields = [
        { label: 'Date', field: 'sms_time' },
        { label: 'Total', field: 'sent' },
        { label: 'Success', field: 'delivered' },
        { label: 'Cost', field: 'tx_cost' }
      ]

      const is_exist_client = data[0].hasOwnProperty('company_name')
      const is_exist_vendor = data[0].hasOwnProperty('vendor_id')

      if (is_exist_client) {
        this.data_fields = [
          ...this.data_fields,
          { label: 'Company Name', field: 'company_name' }
        ]
      }
      if (is_exist_vendor) {
        this.data_fields = [
          ...this.data_fields,
          { label: 'Vendor Name', field: 'vendor_id' }
        ]
      }

      setTimeout(() => {
        this.$refs.exportBtn.$el.click()
        this.$vs.loading.close()
      }, 1000);

    },
    FilteringColumn() {
      this.columnDefs = this.columnDefs_original.filter(item => {
        if (this.IsExistClient) {
          return item
        } else {
          return item.field !== 'company_name'
        }
      })
      this.columnDefs = this.columnDefs.filter(item => {
        if (this.IsExistVendor) {
          return item
        } else {
          return item.field !== 'vendor_id'
        }
      })
    },
    ChangeCheckboxList(field, e) {
      if (e) {
        this.checkboxes.push(field)
      } else {
        this.checkboxes = this.checkboxes.filter(item => item !== field)
      }

      this.filters.group = this.checkboxes.join(',')
    },
    SetDatetimeForStart(e) {
      this.filters.start_time = e[0].getTime() / 1000
    },
    SetDatetimeForEnd(e) {
      this.filters.end_time = e[0].getTime() / 1000
    },
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCompany } = await this.$store.dispatch('company/GetList', { per_page: 0 })
      const { total: TotalForSmscConnection } = await this.$store.dispatch('smscConnection/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('company/GetList', { per_page: TotalForCompany, order_by: 'company_name', order_dir: 'asc' })
      const p2 = await this.$store.dispatch('smscConnection/GetList', { per_page: TotalForSmscConnection, order_by: 'smsc_id', order_dir: 'asc' })

      Promise.all([p1, p2])
      .then(res => {
        this.companies = res[0].items.map(this.TransformCompany)
        this.vendors = res[1].items.map(this.TransformVendor)

        this.GetList()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => this.$vs.loading.close())
    },
    GetList() {
      this.$vs.loading();
      this.$store
        .dispatch("usageReport/GetList", {
          ...this.filters,
          ...this.selected,
          from: this.page || 0,
          count: this.per_page || 20,
          order_by: this.order_by || null,
          order_dir: this.order_dir || null,
          fields: 'tx_cost,sent,delivered'
        })
        .then(res => {
          this.list = res.data.map(this.TransformUsageReport);
          this.total = res.total;
          this.FilteringColumn()
        })
        .catch()
        .finally(() => {
          this.$vs.loading.close();
        });
    },
    TransformCompany(item) {
      return {
        name: item.company_name,
        value: item.company_uuid,
      }
    },
    TransformVendor(item) {
      return {
        name: item.smsc_id,
        value: item.smsc_id,
      }
    },
    TransformUsageReport(item) {
      return {
        ...item,
        sms_time: format(new Date(item.sms_time * 1000), "yyyy:MM:dd HH:mm:ss"),
      };
    },
  }
}
</script>

<style lang="scss" scoped>
.smsc-block {
  padding: 10px 0;

  .filters-container {
    flex-grow: 1;

    .smsc-navigation {
      display: flex;
      flex-wrap: wrap;

      .smsc-navigation__col {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;

        .smsc-navigation__item {
          flex-grow: 1;
          flex-basis: 50%;
          min-width: 250px;
          padding: 10px;
        }
      }
    }
  }
  .smsc-block__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px;

    .checkboxes {
      display: flex;
      flex-wrap: wrap;

      .checkbox {
        margin-top: 15px;
      }
    }
    .buttons-container {
      display: flex;
      flex-wrap: wrap;
      // margin-top: 15px;
    }
  }
}
</style>