<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start pb-3">
          <div class="mt-3 mr-3" style="min-width: 200px">
            <label class="vs-input--label">Company</label>
            <v-select
              class="w-100"
              :options="companies"
              @input="ChangeSelect"
              label="name"
              placeholder="Select Company"
            />
          </div>
          <div class="mt-3 mr-3" style="min-width: 200px">
            <label class="vs-input--label">From</label>
            <div>
              <flat-pickr
                class="w-100"
                :config="{
                  ...configdateTimePicker,
                  defaultDate: new Date().setHours(0, 0, 0),
                  onReady: SetDatetimeForStart,
                  onClose: SetDatetimeForStart
                }"
                v-model="start_time"
              />
            </div>
          </div>
          <div class="mt-3 mr-3" style="min-width: 200px">
            <label class="vs-input--label">To</label>
            <div>
              <flat-pickr
                class="w-100"
                :config="{
                  ...configdateTimePicker,
                  defaultDate: new Date().setHours(23, 59, 59),
                  onReady: SetDatetimeForEnd,
                  onClose: SetDatetimeForEnd,
                }"
                v-model="end_time"
              />
            </div>
          </div>
        </div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-8"
            @click="$router.push({ name: 'admin-billing-invoice-add' })"
          >Add Invoice</vs-button>
        </div>
      </div>
    </vx-card>

    <vx-card>
      <!-- Per Page -->
      <div class="mb-4 md:mb-0">
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
        ref="agGridTable"
        :components="components"
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
      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="Page" />
    </vx-card>
  </div>
</template>

<script>
// Mixins
import TableMixin from '@/mixins/table.js'
import DateTimeMixin from '@/mixins/datetime.js'

// Packages
import vSelect from 'vue-select'
import { format } from 'date-fns'
import { AgGridVue } from 'ag-grid-vue'
import flatPickr from 'vue-flatpickr-component'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import 'flatpickr/dist/flatpickr.css'

// Components
// import CellRendererLink from "./cell-renderer/CellRendererLink.vue";
// import CellRendererStatus from "./cell-renderer/CellRendererStatus.vue";
// import CellRendererVerified from "./cell-renderer/CellRendererVerified.vue";
import CellRendererActions from "./cell-renderer/CellRendererActions.vue";

export default {
  mixins: [TableMixin, DateTimeMixin],
  components: {
    AgGridVue,
    flatPickr,
    vSelect,
    
    // CellRendererLink,
    // CellRendererStatus,
    // CellRendererVerified,
    CellRendererActions,
  },
  data() {
    return {
      // Datetime binding value
      start_time: null,
      end_time: null,

      companies: [],

      // table header value
      columnDefs: [
        {
          headerName: 'Invoice number',
          field: 'invoice_number',
          sortable: true,
          filter: true,
          minWidth: 200,
          checkboxSelection: false,
          headerCheckboxSelectionFilteredOnly: false,
          headerCheckboxSelection: false
        },
        {
          headerName: 'Invoice date',
          field: 'invoice_date',
          minWidth: 200,
        },
        {
          headerName: 'Company',
          field: 'company',
          minWidth: 200
        },
        {
          headerName: 'Invoice period',
          field: 'invoice_period',
          minWidth: 210          
        },
        {
          headerName: 'Amount',
          field: 'amount',
          minWidth: 160
        },
        {
          headerName: 'Due Date',
          field: 'due_date',
          minWidth: 200
        },
        {
          headerName: 'Amount paid',
          field: 'amount_paid',
          minWidth: 180
        },
        {
          headerName: 'Type',
          field: 'type',
          minWidth: 140
        },
        {
          headerName: 'Action',
          // field: 'action',
          width: 140,
          flex: 0,
          // field: "transactions",
          cellRendererFramework: 'CellRendererActions'
        }
      ],
      components: {
        // CellRendererLink,
        // CellRendererStatus,
        // CellRendererVerified,
        CellRendererActions,
      }
    }
  },
  created() {
    this.FetchData()
  },
  methods: {
    ChangeSelect(e) {
      if (!e) {
        delete this.filters.company_uuid
        this.GetList()
        return
      }

      this.filters.company_uuid = e.value
      this.GetList()
    },
    SetDatetimeForStart(e) {
      this.filters.created_on_gt = e[0].toISOString()
      this.GetList()
    },
    SetDatetimeForEnd(e) {
      this.filters.created_on_lt = e[0].toISOString()
      this.GetList()
    },
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCompany } = await this.$store.dispatch('company/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('company/GetList', { per_page: TotalForCompany, order_by: 'company_name', order_dir: 'asc' })

      Promise.all([p1])
      .then(res => {
        this.companies = res[0].items.map(this.TransformCompany)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.$vs.loading.close()
      })
    },
    GetList() {
      this.$vs.loading()
      this.$store.dispatch('invoice/GetList', {
        ...this.filters,
        page: this.page || 0,
        per_page: this.per_page || 20,
        order_by: this.order_by || null,
        order_dir: this.order_dir || null,
      })
      .then(res => {
        this.list = res.items.map(this.TransformInvoice)
        this.total = res.total
      })
      .catch()
      .finally(() => {
        this.$vs.loading.close()
      })
    },
    TransformCompany(item) {
      return {
        name: item.company_name,
        value: item.company_uuid
      }
    },
    TransformInvoice(item) {
      return {
        invoice_number: item.invoice_number,
        invoice_date: '',
        company: item.company_name,
        invoice_period: `${format(new Date(item.invoice_start_date), 'yyyy:MM:dd')} ${format(new Date(item.invoice_end_date), 'yyyy:MM:dd')}`,
        amount: item.amount && item.amount.toFixed(2),
        due_date: item.company_name,
        amount_paid: item.amount_paid,
        type: item.type,
      }
    }
  }
}
</script>
