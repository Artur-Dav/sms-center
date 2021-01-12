<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="$router.push({ name: 'admin-did-import-log' })"
          >Import Log</vs-button>
          <vs-button
            class="mt-3 ml-3"
            @click="$router.push({ name: 'admin-did-import-did-import' })"
          >Import DID</vs-button>
          <vs-button
            class="mt-3 ml-3"
          >Add DID</vs-button>
          <vs-button
            class="mt-3 ml-3"
            :disabled="activeDeletionButton"
            @click="ConfirmDelete"
          >Delete Selected</vs-button>
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
        @selectionChanged="SelectionChanged"
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
      // Selected did
      selected_did: [],

      // table header value
      columnDefs: [
        {
          headerName: 'Number',
          field: 'did',
          minWidth: 240,
          filter: true,
          sortable: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },
        {
          headerName: 'Created On',
          field: 'created_on',
          minWidth: 200,
          sortable: true
        },
        {
          headerName: 'Created By',
          field: 'created_by',
          minWidth: 160
        },
        {
          headerName: 'Vendor',
          field: 'vendor_name',
          filter: true,
          minWidth: 220
        },
        {
          headerName: 'Client',
          field: 'company_name',
          filter: true,
          minWidth: 220
        },
        {
          headerName: 'Country',
          field: 'iso3',
          minWidth: 120
        },
        {
          headerName: 'DID type',
          field: 'did_type',
          minWidth: 120
        },
        {
          headerName: 'State',
          field: 'state',
          minWidth: 110
        },
        {
          headerName: 'Lata',
          field: 'lata',
          minWidth: 110
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
  computed: {
    activeDeletionButton () {
      return this.selected_did.length ? false : true
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
        page: this.page || 0,
        per_page: this.per_page || 20,
        order_by: this.order_by || null,
        order_dir: this.order_dir || null,
      })
      .then(res => {
        this.list = res.items.map(this.TransformList)
        this.total = res.total
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    SelectionChanged () {
      const selected_data = this.gridApi.getSelectedNodes()
      this.selected_did = selected_data.map(this.TransformSelectedDid)
    },
    ConfirmDelete () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Are you sure?',
        text: 'You will not be able to recover this DIDs!',
        accept: this.DeleteSelection,
        acceptText: 'Delete'
      })
    },
    DeleteSelection () {
      this.$vs.loading()
      this.$store.dispatch('did/MassDelete', { items: this.selected_did })
      .then(() => {
        this.GetList()
        this.ShowSuccessMessage({
          title: 'Deleted',
          text: 'The selected DIDs were successfully deleted'
        })
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
        did: item.did,
        created_on: format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss'),
        created_by: item.created_by,
        vendor_name: item.vendor_name,
        company_name: item.company_name,
        iso3: item.iso3,
        did_type: item.did_type,
        state: item.state,
        lata: item.lata
      }
    },
    TransformSelectedDid (item) {
      return item.data.did
    }
  }
}
</script>
