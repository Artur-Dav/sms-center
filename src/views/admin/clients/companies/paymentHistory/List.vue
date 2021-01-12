<template>
  <div class="smsc-container">
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

export default {
  mixins: [TableMixin],
  components: {
    AgGridVue,
  },
  data() {
    return {
      // table header value
      columnDefs: [
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
          headerName: 'Amount',
          field: 'amount',
          minWidth: 180
        },
        {
          headerName: 'Method',
          field: 'method',
          minWidth: 140
        },
        {
          headerName: 'Transaction ID',
          field: 'tran_id',
          minWidth: 280
        }
      ],
    }
  },
  created() {
    this.GetList()
  },
  methods: {
    GetList() {
      this.$vs.loading()
      this.$store.dispatch('payment/GetList', {
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

    Capitalize (val) {
      if (!val) return ''
      return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
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
        created_on: item.created_on && format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss'),
        created_by: item.created_by,
        amount: `$${item.amount}`,
        method: this.Capitalize(item.method),
        tran_id: item.tran_id
      }
    }
  }
}
</script>

