<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="$router.push({ name: 'admin-vendors-did-add' })"
          >Add DID</vs-button>
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
      // Dropdowns
      vendor_types: [
        { name: 'MO', value: 'MO' },
        { name: 'MT', value: 'MT' }
      ],

      // Selected values
      selected: {
        vendor_type: null
      },

      // table header value
      columnDefs: [
        {
          headerName: 'Number',
          field: 'did',
          minWidth: 220,
          filter: true
        },
        {
          headerName: 'Created On',
          field: 'created_on',
          minWidth: 200          
        },
        {
          headerName: 'Created By',
          field: 'created_by',
          minWidth: 160
        },
        {
          headerName: 'Country',
          field: 'country_name',
          minWidth: 220
        },
        {
          headerName: 'Type',
          field: 'type',
          minWidth: 140
        },
        {
          headerName: 'State',
          field: 'state',
          minWidth: 100
        },
        {
          headerName: 'LATA',
          field: 'lata',
          minWidth: 100
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
      this.$store.dispatch('did/GetList', {
        ...this.filters,
        vendor_uuid: this.$route.params.id,
        page: this.page || 0,
        per_page: this.per_page || 10,
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
        did: item.did,
        created_on: format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss'),
        created_by: item.created_by,
        type: item.type,
        state: item.state,
        lata: item.lata
      }
    }
  }
}
</script>

