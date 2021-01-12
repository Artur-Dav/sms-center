<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start pb-3">
          <div class="mt-3 mr-3" style="min-width: 200px">
            <label class="vs-input--label">From</label>
            <div>
              <flat-pickr
                class="w-100"
                :config="{
                  ...configdateTimePicker,
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
                  onReady: SetDatetimeForEnd,
                  onClose: SetDatetimeForEnd,
                }"
                v-model="end_time"
              />
            </div>
          </div>
        </div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
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
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="list"
        @gridReady="GridReady"
        @filterChanged="Filtering"
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
import { format } from 'date-fns'
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

// Cell Renderer components
import CellRendererActions from './cell-renderer/CellRendererActions'

// Utils
import { Capitalize } from '@/assets/utils/utils.js'

export default {
  mixins: [TableMixin, DateTimeMixin],
  components: {
    AgGridVue,
    flatPickr,

    //Cell Renderer components
    CellRendererActions
  },
  data() {
    return {
      // Datetime binding value
      start_time: parseInt(this.$route.query.start_time) || 0,
      end_time: parseInt(this.$route.query.end_time) || 0,

      // table header value
      columnDefs: [
        {
          headerName: 'Bulk UUID',
          field: 'bulk_uuid',
          minWidth: 300,
          resizing: true
        },
        {
          headerName: 'Created On',
          field: 'started_at',
          minWidth: 200,
          sortable: true
        },
        {
          headerName: 'Status',
          field: 'status',
          minWidth: 120,
        },
        {
          headerName: 'Count',
          field: 'dest_count',
          minWidth: 100,
        },
        {
          headerName: 'Sent',
          field: 'dest_sent',
          minWidth: 100,
        },
        {
          headerName: 'Failed',
          field: 'route_status_sending_failed_count',
          minWidth: 100,
        },
        {
          headerName: 'Success',
          field: 'route_status_sent_to_vendor_count',
          minWidth: 110,
        },
        {
          headerName: 'Rejected',
          field: 'route_status_rejected_count',
          minWidth: 120,
        },
        {
          headerName: 'Text',
          field: 'text',
          minWidth: 240,
          filter: true
        },
        {
          headerName: 'Action',
          width: 100,
          flex: 0,
          cellRendererFramework: 'CellRendererActions'
        }
      ],

      // Cell Renderer components
      components: {
        CellRendererActions
      }
    }
  },
  beforeCreate () {
    const { start_time, end_time } = this.$route.query
    const query = { ...this.$route.query }

    query.start_time = parseInt(start_time) || new Date().setHours(0, 0, 0)
    query.end_time = parseInt(end_time) || new Date().setHours(23, 59, 59)

    this.$router.push({ query }).catch(() => {})
  },
  methods: {
    GetList () {
      this.$vs.loading()
      this.$store.dispatch('bulk/GetList', {
        ...this.filters,
        page: this.page || 0,
        per_page: this.per_page || 20,
        order_by: this.order_by || 'started_at',
        order_dir: this.order_dir || 'desc',
      })
      .then(res => {
        this.list = res.items.map(this.TransformList)
        this.total = res.total
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    // Datetime functions
    SetDatetimeForStart(e) {
      this.filters.started_at_gt = e[0].toISOString()
      this.$router.push({ query: { ...this.$route.query, start_time: e[0].getTime() } }).catch(() => {})
      this.GetList()
    },
    SetDatetimeForEnd(e) {
      this.filters.finished_at_lt = e[0].toISOString()
      this.$router.push({ query: { ...this.$route.query, end_time: e[0].getTime() } }).catch(() => {})
      this.GetList()
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
    TransformList(item) {
      return {
        refreshData: this.GetList,
        bulk_uuid: item.bulk_uuid,
        started_at: item.started_at ? format(new Date(item.started_at), 'yyyy:MM:dd HH:mm:ss') : null,
        status: Capitalize(item.status),
        dest_count: item.dest_count,
        dest_sent: item.dest_sent,
        route_status_sending_failed_count: item.route_status_sending_failed_count,
        route_status_sent_to_vendor_count: item.route_status_sent_to_vendor_count,
        route_status_rejected_count: item.route_status_rejected_count,
        text: item.text

      }
    }
  }
}
</script>