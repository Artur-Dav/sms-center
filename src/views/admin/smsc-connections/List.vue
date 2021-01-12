<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="Restart"
          >Restart</vs-button>
          <vs-button
            class="mt-3 ml-3"
            @click="$router.push({ name: 'admin-smsc-connections-add' })"
          >Add SMSC Connection</vs-button>
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

export default {
  mixins: [TableMixin],
  components: {
    AgGridVue,

    //Cell Renderer components
    CellRendererActions
  },
  data() {
    return {
      // table header value
      columnDefs: [
        {
          headerName: 'SMSC Connection',
          field: 'smsc_id',
          minWidth: 240,
          filter: true,
        },
        {
          headerName: 'Status',
          field: 'status',
          minWidth: 150,
        },
        {
          headerName: 'Update Time',
          field: 'upd_time',
          minWidth: 200
        },
        {
          headerName: 'IP',
          field: 'ip',
          minWidth: 240,
        },
        {
          headerName: 'Username',
          field: 'username',
          minWidth: 220,
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
  created() {
    this.GetList()
  },
  methods: {
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
    Restart () {
      this.$store.dispatch('gateway/Restart')
      .then(res => {
        if (res.success) {
          this.ShowSuccessMessage({ title: 'Success', text: 'SMSC Connection has been restarted' })
        }
      })
      .catch(err => {
        this.ShowErrorMessage({ title: 'Error', text: err })
      })
    },
    GetList () {
      this.$vs.loading()
      this.$store.dispatch('smscConnection/GetList', {
        ...this.filters,
        page: this.page || 0,
        per_page: this.per_page || 20,
        order_by: this.order_by || null,
        order_dir: this.order_dir || null,
      })
      .then(res => {
        this.list = res.items.map(this.TransformSmscConnection)
        this.total = res.total
      })
      .catch()
      .finally(() => {
        this.$vs.loading.close()
      })
    },

    // Transform functions
    TransformSmscConnection(item) {
      return {
        refreshData: this.GetList,
        smsc_id: item.smsc_id,
        status: item.status,
        upd_time: item.upd_time ? format(new Date(item.upd_time), 'yyyy:MM:dd HH:mm:ss') : null,
        ip: item.ip,
        username: item.username,
      }
    }
  }
}
</script>

