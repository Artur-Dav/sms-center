<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start pb-3">
          <v-select
            style="min-width: 200px"
            class="mt-3 mr-3"
            name="company"
            label="name"
            :options="companies"
            v-model="selects.company"
            @input="SearchWithField($event, 'company_uuid')"
          />
          <v-select
            style="min-width: 200px"
            class="mt-3 mr-3"
            name="reseller"
            label="name"
            :options="resellers"
            v-model="selects.reseller"
            @input="SearchWithField($event, 'reseller_uuid')"
          />
          <v-select
            style="min-width: 200px"
            class="mt-3"
            name="payment type"
            label="name"
            :options="payment_types"
            v-model="selects.type"
            :searchable="false"
            placeholder="Select Type"
            @input="SearchWithField($event, 'prepay')"
          />
          <active-only
            class="mt-3 ml-3"
            @toggle="SearchWithField($event, 'status')"
          />
        </div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="$router.push({ name: 'admin-companies-add-manual-payment' })"
          >Add Manual Payment</vs-button>
          <vs-button
            class="mt-3 ml-3"
            @click="$router.push({ name: 'admin-companies-add' })"
          >Add Company</vs-button>
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
      companies: [],
      resellers: [],
      payment_types: [
        { name: 'All', value: null },
        { name: 'Prepaid', value: true },
        { name: 'Postpaid', value: false }
      ],

      // Selects value
      selects: {
        company: null,
        reseller: null,
        type: { name: 'All', value: null },
      },

      // table header value
      columnDefs: [
        {
          headerName: 'Company Name',
          field: 'company_name',
          minWidth: 280,
          filter: true,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'Balance',
          field: 'balance',
          minWidth: 150,
        },
        {
          headerName: 'Postpay Credit',
          field: 'prepay',
          minWidth: 170
        },
        {
          headerName: 'Credit',
          field: 'credit',
          minWidth: 140,
        },
        {
          headerName: 'Product',
          field: 'product_name',
          minWidth: 220,
        },
        {
          headerName: 'Reseller',
          field: 'reseller_name',
          minWidth: 220,
        },
        {
          headerName: 'Email',
          field: 'email',
          minWidth: 260,
          filter: true
        },
        {
          headerName: 'Created On',
          field: 'created_on',
          minWidth: 200,
        },
        {
          headerName: 'Action',
          width: 210,
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
    this.FetchData()
  },
  methods: {
    GetList () {
      this.$vs.loading()
      this.$store.dispatch('company/GetList', {
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
    async FetchData() {
      this.$vs.loading()
      const { total: TotalForCompany } = await this.$store.dispatch('company/GetList', { per_page: 0 })
      const p1 = await this.$store.dispatch('company/GetList', { per_page: TotalForCompany, order_by: 'company_name', order_dir: 'asc' })

      const { total: TotalForReseller } = await this.$store.dispatch('reseller/GetList', { per_page: 0 })
      const p2 = await this.$store.dispatch('reseller/GetList', { per_page: TotalForReseller, order_by: 'reseller_name', order_dir: 'asc' })

      Promise.all([p1, p2])
      .then(res => {
        this.companies = res[0].items.map(this.TransformCompany)
        this.resellers = res[1].items.map(this.TransformReseller)

        this.GetList()
      })
      .catch(err => this.ShowErrorMessage({ title: 'Error', text: err }))
      .finally(() => this.$vs.loading.close())
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
        company_uuid: item.company_uuid,
        status: item.status === 'active' ? true : false,
        company_name: item.company_name,
        balance: `$${item.balance}`,
        prepay: item.prepay ? 'Prepaid' : 'Postpaid',
        credit: item.credit,
        product_name: item.product_name,
        reseller_name: item.reseller_name,
        email: item.contact && item.contact.email,
        created_on: item.created_on ? format(new Date(item.created_on), 'yyyy:MM:dd HH:mm:ss') : null,
      }
    },
    TransformCompany (item) {
      return {
        name: item.company_name,
        value: item.company_uuid
      }
    },
    TransformReseller (item) {
      return {
        name: item.reseller_name,
        value: item.reseller_uuid
      }
    }
  }
}
</script>