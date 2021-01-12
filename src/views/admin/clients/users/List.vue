<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start">
        </div>
        <div class="buttons-container flex flex-wrap items-center justify-end">
        </div>
      </div>
    </vx-card>
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

// Packages
import { format } from 'date-fns'
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'

// Cell Renderer components
import CellRendererActions from './cell-renderer/CellRendererActions'
import CellRendererStatus from './cell-renderer/CellRendererStatus'

export default {
  mixins: [TableMixin],
  components: {
    AgGridVue,
    vSelect,

    //Cell Renderer components
    CellRendererActions,
    CellRendererStatus
  },
  data() {
    return {
      // table header value
      columnDefs: [
        {
          headerName: 'Name',
          field: 'full_name',
          minWidth: 240,
          sortable: true,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'Created By',
          field: 'created_by',
          minWidth: 220,
          sortable: true
        },
        {
          headerName: 'User Name',
          field: 'user_name',
          minWidth: 220,
          sortable: true,
          filter: true
        },
        {
          headerName: 'Company Name',
          field: 'company_name',
          minWidth: 230,
          sortable: true
        },
        {
          headerName: 'Role',
          field: 'rank',
          minWidth: 160
        },
        {
          headerName: 'Start From',
          field: 'created_on',
          minWidth: 200,
          sortable: true
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
        CellRendererActions,
        CellRendererStatus
      }
    }
  },
  created() {
    this.GetList()
  },
  methods: {
    GetList() {
      this.$vs.loading()
      this.$store.dispatch('user/GetList', {
        ...this.filters,
        page: this.page || 0,
        per_page: this.per_page || 20,
        order_by: this.order_by || 'created_on',
        order_dir: this.order_dir || 'desc',
      })
      .then(res => {
        this.list = res.items.map(this.TransformList)
        this.total = res.total
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    // Transform functions
    TransformList(item) {
      return {
        refreshData: this.GetList,
        user_id: item.user_id,
        status: item.status === 'active' ? true : false,
        full_name: item.full_name,
        created_by: item.created_by,
        user_name: item.user_name,
        company_name: item.company_name,
        rank: item.rank === 'Default' ? 'User' : 'Admin',
        created_on: item.created_on && format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss'),
      }
    }
  }
}
</script>

