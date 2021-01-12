<template>
  <div class="mncmcc-list">
    <div slot="no-body" class="flex flex-wrap items-center justify-between">
      <div class="filters-container flex flex-wrap items-center justify-start"></div>
      <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
        <vs-button
          class="mt-3"
          @click="$router.push({ name: 'admin-vendors-rate-deck-add-mncmcc', query: { ...$route.query } })"
        >Add & Edit Rate</vs-button>
      </div>
    </div>
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
    CellRendererActions,
  },
  props: ['vendorProduct'],
  data() {
    return {
      // Dropdowns

      // table header value
      columnDefs: [
        {
          headerName: 'Country',
          field: 'country_name',
          minWidth: 220
        },
        {
          headerName: 'Operator',
          field: 'mobile_network_name',
          minWidth: 350
        },
        {
          headerName: 'Rate',
          field: 'price',
          minWidth: 180
        },
        {
          headerName: 'Vendor Product',
          field: 'vendor_product_name',
          minWidth: 180
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
      }
    }
  },
  watch: {
    vendorProduct (e) {
      this.filters.vendor_product_uuid = e
      this.GetList()
    }
  },
  created () {
    this.filters.vendor_product_uuid = this.vendorProduct
    this.GetList()
  },
  methods: {
    GetList() {
      this.$vs.loading()
      this.$store.dispatch('rate/GetList', {
        ...this.filters,
        page: this.page || 0,
        per_page: this.per_page || 10,
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
        rate_uuid: item.rate_uuid,
        country_name: item.country_name,
        mobile_network_name: item.mobile_network_name,
        price: item.price,
        vendor_product_name: item.vendor_product_name
      }
    }
  }
}
</script>

