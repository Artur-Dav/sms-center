<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start pb-3">
          <v-select
            style="min-width: 200px"
            class="mt-3"
            name="vendor type"
            label="name"
            :options="vendor_types"
            v-model="selected.vendor_type"
            :searchable="false"
            placeholder="Select Vendor Type"
            @input="SearchWithField($event, 'vendor_type')"
          />
          <active-only
            class="mt-3 ml-3"
            @toggle="SearchWithField($event, 'status')"
          />
        </div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="$router.push({ name: 'admin-vendors-add' })"
          >Add Vendor</vs-button>
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
          headerName: 'Vendor Name',
          field: 'vendor_name',
          minWidth: 260,
          filter: true,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'Contact Name',
          field: 'vendor_name',
          minWidth: 220
        },
        {
          headerName: 'Contact Person',
          field: 'contact_person',
          minWidth: 220
        },
        {
          headerName: 'Created On',
          field: 'created_on',
          minWidth: 200          
        },
        {
          headerName: 'Last Updated',
          field: 'updated_on',
          minWidth: 200
        },
        {
          headerName: 'Updated By',
          field: 'updated_by',
          minWidth: 180
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
      this.$store.dispatch('vendor/GetList', {
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
      .catch()
      .finally(() => {
        this.$vs.loading.close()
      })
    },

    // Search functions
    SearchWithField (e, field) {
      if (!e) delete this.filters[field]
      else {
        if (typeof e === 'object') this.filters[field] = e.value
        else this.filters[field] = e
      }

      this.GetList()
    },

    // Transform functions
    TransformList(item) {
      return {
        refreshData: this.GetList,
        vendor_uuid: item.vendor_uuid,
        status: item.status === 'active' ? true : false,
        vendor_name: item.vendor_name,
        contact_person: item.contact_person,
        created_on: format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss'),
        updated_on: format(new Date(item.updated_on), 'yyyy:MM:dd HH:mm:ss'),
        updated_by: item.updated_by,
      }
    }
  }
}
</script>

