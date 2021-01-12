<template>
  <div id="ag-grid-demo">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="$router.push({ name: 'admin-reseller-add-manual-payment' })"
          >Add Manual Payment</vs-button>
          <vs-button
            class="mt-3 ml-3"
            @click="$router.push({ name: 'admin-reseller-add' })"
          >Add Reseller</vs-button>
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

// Cell Renderer components
import CellRendererActions from './cell-renderer/CellRendererActions'
import CellRendererStatus from './cell-renderer/CellRendererStatus'

export default {
  mixins: [TableMixin],
  components: {
    AgGridVue,

    //Cell Renderer components
    CellRendererActions,
    CellRendererStatus
  },
  data() {
    return {
      // table header value
      columnDefs: [
        {
          headerName: 'Reseller Name',
          field: 'reseller_name',
          minWidth: 260,
          filter: true,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'Balance',
          field: 'balance',
          minWidth: 120
        },
        {
          headerName: 'Clients',
          field: 'clients_count',
          minWidth: 120
        },
        {
          headerName: 'Member since',
          field: 'created_on',
          minWidth: 200
        },
        {
          headerName: 'Action',
          width: 185,
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
      this.$store.dispatch('reseller/GetList', {
        ...this.filters,
        page: this.page || 0,
        per_page: this.per_page || 20,
        order_by: this.order_by || null,
        order_dir: this.order_dir || null,
      })
      .then(res => {
        this.list = res.items.map(this.TransformReseller)
        this.total = res.total
      })
      .catch()
      .finally(() => {
        this.$vs.loading.close()
      })
    },
    TransformReseller(item) {
      return {
        refreshData: this.GetList,
        reseller_uuid: item.reseller_uuid,
        status: item.status === 'active' ? true : false,
        reseller_name: item.reseller_name,
        balance: '',
        clients_count: item.clients_count,
        created_on: format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss'),
      }
    }
  }
}
</script>
