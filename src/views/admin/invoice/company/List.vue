<template>
  <div id="ag-grid-demo">
    <vx-card>
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ list.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : list.length }} of {{ list.length }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>

          
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item
              v-for="item in perPageValue"
              :key="item"
              @click="gridApi.paginationSetPageSize(item)"
            >
              <span>{{ item }}</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
      <ag-grid-vue
        ref="agGridTable"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="list"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>
      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="currentPage" />
    </vx-card>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

export default {
  components: {
    AgGridVue,
  },
  data() {
    return {
      gridOptions: {},
      maxPageNumbers: 7,
      gridApi: null,
      defaultColDef: {
        sortable: true,
        editable: true,
        resizable: true,
        suppressMenu: true
      },

      // per page value
      perPageValue: [20, 50, 100, 150],

      // table header value
      columnDefs: [
        {
          headerName: 'Invoice number',
          field: 'invoice_number',
          width: 300,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },
        {
          headerName: 'Invoice date',
          field: 'invoice_date',
          filter: true,
          width: 300
        },
        {
          headerName: 'Company',
          field: 'company',
          filter: true,
          width: 300
        },
        {
          headerName: 'Invoice period',
          field: 'invoice_period',
          filter: true,
          width: 300          
        },
        {
          headerName: 'Amount',
          field: 'amount',
          filter: true,
          width: 300
        },
        {
          headerName: 'Due Date',
          field: 'due_date',
          filter: true,
          width: 300
        },
        {
          headerName: 'Amount paid',
          field: 'amount_paid',
          filter: true,
          width: 300
        },
        {
          headerName: 'Type',
          field: 'type',
          filter: true,
          width: 300
        },
        {
          headerName: 'Action',
          field: 'action',
          filter: false,
          width: 300
        }
      ],
      
      // table content value
      list: [],
    }
  },
  watch: {
    '$store.state.windowWidth' (val) {
      if (val <= 576) {
        this.maxPageNumbers = 4
        this.gridOptions.columnApi.setColumnPinned('email', null)
      }
    }
  },
  computed: {
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 50
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    console.log(this.gridOptions)
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(".ag-header-container");
      header.style.left = `-${String(Number(header.style.transform.slice(11, -3)) + 9)}px`;
    }
  }
}
</script>

<style lang="scss">

</style>
