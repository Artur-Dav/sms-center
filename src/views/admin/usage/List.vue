<template>
  <div id="ag-grid-demo">
    <vx-card>
      <div slot="no-body" class="smsc-block">
        <div class="smsc-navigation">
          <div class="smsc-navigation__col">
            <div class="smsc-navigation__item">
              <label class="vs-input--label">Client</label>
              <v-select
                label="name"
                :options="companies"
                placeholder="Select Client"
              />
            </div>
            <div class="smsc-navigation__item">
              <label class="vs-input--label">Vendor</label>
              <v-select
                label="name"
                :options="vendors"
                placeholder="Select Vendor"
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
                    onClose: CallAfterChangingStartTime,
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
                    onClose: CallAfterChangingEndTime,
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
              <label class="vs-input--label">Step</label>
              <v-select
                label="name"
                :options="steps"
                :value="{ name: 'Hourly', value: 'hour' }"
                @input="selected.step = $event && $event.value"
              />
            </div>
            <div class="smsc-navigation__item">
              <label class="vs-input--label">Step</label>
              <v-select
                label="name"
                :options="steps"
                :value="{ name: 'Hourly', value: 'hour' }"
                @input="selected.step = $event && $event.value"
              />
            </div>
          </div>
          <div class="smsc-navigation__col">
            <div class="smsc-navigation__item">
              <label class="vs-input--label">Step</label>
              <v-select
                label="name"
                :options="steps"
                :value="{ name: 'Hourly', value: 'hour' }"
                @input="selected.step = $event && $event.value"
              />
            </div>
            <div class="smsc-navigation__item" style="opacity: 0; height: 1px">
              <label class="vs-input--label">Step</label>
              <v-select
                label="name"
                :options="steps"
                :value="{ name: 'Hourly', value: 'hour' }"
              />
            </div>
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
        :floatingFilter="true"
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
      start_date: null,    
      end_date: null, 

      companies: [],
      vendors: [],
      steps: [
        { name: 'Hourly', value: 'hour' },
        { name: 'Daily', value: 'day' }
      ],

      // Request data
      selected: {
        step: 'hour'
      },

      // table header value
      columnDefs: [
        {
          headerName: 'Date',
          field: 'sms_time',
          width: 300,
        },
        {
          headerName: 'Total',
          field: 'sent',
          width: 300
        },
        {
          headerName: 'Success',
          field: 'delivered',
          width: 300
        },
        {
          headerName: 'Cost',
          field: 'tx_cost',
          width: 300          
        }
      ]
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    SetDatetimeForStart(e) {
      this.filters.start_time = e[0].getTime() / 1000
    },
    SetDatetimeForEnd(e) {
      this.filters.end_time = e[0].getTime() / 1000
    },
    CallAfterChangingStartTime(e) {
      this.SetDatetimeForStart(e)
      this.GetList()
    },
    CallAfterChangingEndTime(e) {
      this.SetDatetimeForEnd(e)
      this.GetList()
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
        sms_time: format(new Date(item.sms_time * 1000), "yyyy:MM:dd HH:mm:ss"),
        sent: item.sent,
        delivered: item.delivered,
        tx_cost: item.tx_cost
      };
    },
  }
}
</script>

<style lang="scss" scoped>
.smsc-block {
  padding: 10px 0;

  .smsc-navigation {
    display: flex;
    flex-wrap: wrap;

    .smsc-navigation__col {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 1;

      .smsc-navigation__item {
        flex-grow: 1;
        min-width: 250px;
        padding: 10px;
      }
    }
  }
}
</style>