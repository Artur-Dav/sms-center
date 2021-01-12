<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start pb-3">
          <v-select
            style="min-width: 200px"
            class="mt-3"
            name="payment type"
            label="name"
            :options="status_types"
            v-model="selected.status"
            :searchable="false"
            placeholder="Select Status"
            @input="SearchWithField($event, 'status')"
          />
        </div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
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
import vSelect from 'vue-select'
import { format } from 'date-fns'
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

// Cell Renderer components
import CellRendererActions from './cell-renderer/CellRendererActions'

export default {
  mixins: [TableMixin],
  components: {
    AgGridVue,
    vSelect,

    //Cell Renderer components
    CellRendererActions
  },
  data() {
    return {
      // Dropdowns
      status_types: [
        { name: 'All', value: null },
        { name: 'Approved Only', value: 'approved' },
        { name: 'Disapproved Only', value: 'rejected' }
      ],

      // Selected value
      selected: {
        status: { name: 'All', value: null },
      },

      // table header value
      columnDefs: [
        {
          headerName: 'Template Name',
          field: 'template_name',
          minWidth: 240,
          filter: true
        },
        {
          headerName: 'Created By',
          field: 'company_name',
          minWidth: 200,
        },
        {
          headerName: 'Created On',
          field: 'created_on',
          minWidth: 200
        },
        {
          headerName: 'SMS Text',
          field: 'sms_text',
          minWidth: 300,
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
    GetList () {
      this.$vs.loading()
      this.$store.dispatch('smsTemplate/GetList', {
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
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
    },

    // Search functions
    SearchWithField (e, field) {
      if (!e) delete this.filters[field]
      else this.filters[field] = e && e.value

      this.GetList()
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
        sms_template_uuid: item.sms_template_uuid,
        status: item.status,
        template_name: item.template_name,
        company_name: item.company_name,
        created_on: item.created_on ? format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss') : null,
        sms_text: item.sms_text,
      }
    }
  }
}
</script>