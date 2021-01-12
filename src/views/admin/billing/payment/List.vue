<template>
  <div class="smsc-container">
    <vx-card>
      <div slot="no-body" class="flex flex-wrap items-center justify-between pl-3 pr-3">
        <div class="filters-container flex flex-wrap items-center justify-start"></div>
        <div class="buttons-container flex flex-wrap items-center justify-end pb-3">
          <vs-button
            class="mt-3"
            @click="$router.push({ name: 'admin-billing-payment-add' })"
          >Create Manual Payment</vs-button>
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
        v-model="Page"
      />
    </vx-card>
  </div>
</template>

<script>
// Mixins
import TableMixin from "@/mixins/table.js";

// Packages
import { format } from "date-fns";
import { AgGridVue } from "ag-grid-vue";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";

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
          headerName: "Created On",
          field: "created_on",
          sortable: true,
          minWidth: 200,
        },
        {
          headerName: "Created By",
          field: "created_by",
          minWidth: 160,
        },
        {
          headerName: "Method",
          field: "method",
          minWidth: 140,
        },
        {
          headerName: "Total",
          field: "amount",
          minWidth: 120,
        },
        {
          headerName: "Note",
          field: "note",
          minWidth: 120,
        },
        {
          headerName: "Company",
          sortable: true,
          filter: true,
          field: "company_name",
          minWidth: 240,
        },
        {
          headerName: "Transaction ID",
          sortable: true,
          field: "tran_id",
          minWidth: 180,
        },
      ],
    };
  },
  created() {
    this.GetList();
  },
  methods: {
    GetList() {
      this.$vs.loading();
      this.$store
        .dispatch("payment/GetList", {
          ...this.filters,
          page: this.page || 0,
          per_page: this.per_page || 20,
          order_by: this.order_by || null,
          order_dir: this.order_dir || null,
        })
        .then((res) => {
          this.list = res.items.map(this.TransformPayment);
          this.total = res.total;
        })
        .catch()
        .finally(() => {
          this.$vs.loading.close();
        });
    },
    TransformPayment(item) {
      return {
        created_on: format(new Date(item.created_on), "yyyy:MM:dd HH:mm:ss"),
        created_by: item.created_by,
        method: item.method,
        amount: item.amount,
        note: "",
        company_name: item.company_name,
        tran_id: item.tran_id,
      };
    },
  },
};
</script>
