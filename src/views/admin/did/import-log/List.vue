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
          headerName: 'File Name',
          field: 'orig_file',
          minWidth: 340
        },
        {
          headerName: 'Created On',
          field: 'created_on',
          minWidth: 200,
          sortable: true
        },
        {
          headerName: 'Finished On',
          field: 'finished_on',
          minWidth: 200          
        },
        {
          headerName: 'Status',
          field: 'status',
          minWidth: 220
        },
        {
          headerName: 'Reply',
          field: 'reply',
          minWidth: 400
        },
        {
          headerName: 'Created By',
          field: 'created_by',
          minWidth: 180
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
      this.$store.dispatch('did/GetImportLogList', {
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
    TransformList(item) {
      return {
        orig_file: item.orig_file,
        created_on: item.created_on ? format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss') : null,
        finished_on: item.finished_on ? format(new Date(item.finished_on), 'yyyy:MM:dd HH:mm:ss') : null,
        status: item.status,
        reply: item.reply,
        created_by: item.created_by,
      }
    }
  }
}
</script>

<style lang="scss">

</style>
