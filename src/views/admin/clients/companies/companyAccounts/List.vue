<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="$router.push({ name: 'admin-companies-company-accounts-add' })"
          >Add Account</vs-button>
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
          headerName: 'User Name',
          field: 'user_name',
          minWidth: 230,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'Password',
          field: 'passwd',
          minWidth: 180
        },
        {
          headerName: 'Allowed IPs',
          field: 'allowed_ip_list',
          minWidth: 500
        },
        {
          headerName: 'Product',
          field: 'products',
          minWidth: 220
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
        company_uuid: this.$route.params.id,
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
        _id: item.user_id,
        status: item.status === 'active' ? true : false,
        user_name: item.user_name,
        passwd: item.passwd,
        allowed_ip_list: item.allowed_ip_list && item.allowed_ip_list.split(';').join(', '),
        products: item.products
      }
    }
  }
}
</script>

