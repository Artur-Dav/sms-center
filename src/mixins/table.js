export default {
  data() {
    return {
      // ag-grid
      gridOptions: {},
      maxPageNumbers: 7,
      gridApi: null,
      defaultColDef: {
        sortable: false,
        filter: false,
        editable: false,
        resizable: true,
        suppressMenu: true,
        flex: 1
      },

      list: [],
      page: 0,
      per_page: 10,
      total: 0,
      order_by: null,
      order_dir: null,
      filters: {}
    }
  },
  watch: {
    '$store.state.windowWidth' (val) {
      if (val <= 576) {
        this.maxPageNumbers = 4
      }
    },
    page() {
      this.GetList()
    }
  },
  computed: {
    listLength() {
      return this.list.length || 0
    },
    totalPages () {
      return Math.ceil(this.total / this.per_page) || 0
    },
    Page: {
      get() {
        return this.page + 1
      },
      set(value) {
        this.page = value - 1
      }
    },
    pageStart() {
      return this.page * this.per_page + 1
    },
    pageEnd() {
      return this.page * this.per_page + this.listLength
    },
    isFloatingFilter() {
      const index = this.columnDefs.findIndex(item => item.filter === true)

      return index === -1 ? false : true
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(".ag-header-container");
      header.style.left = `-${String(Number(header.style.transform.slice(11, -3)) + 9)}px`;
    }
  },
  methods: {
    SetFilters(item) {
      this.filters[item.filter_name] = item.filter_value
    },
    FilterFiltersHendleritem(item) {
      return item.filterPromise.resolution.appliedModel
    },
    TransformFiltersHendler(item) {
      return {
        filter_name: item.column.colId,
        filter_value: `${item.filterPromise.resolution.appliedModel.filter}*`
      }
    },
    Sorting(e) {
      const sortable_fields = this.columnDefs.filter(col => col.sortable)

      sortable_fields.forEach(field => {
        const field_name = field.field
        e.columnApi.getColumn(field_name)
        .addEventListener('sortChanged', event => {
          if (event.column.sort === undefined) {
            return
          }

          this.order_dir = event.column.sort
          this.order_by = event.column.sort ? event.column.colId : null
          this.GetList()
        })
      })
    },
    Filtering(e) {
      const AllFilters = e.api.filterManager.allFilters
      const values = Object.values(AllFilters)
      const filters = values
        .filter(this.FilterFiltersHendleritem)
        .map(this.TransformFiltersHendler)
      
      filters.forEach(this.SetFilters)
      this.GetList()
    },
    GridReady(e) {
      this.Sorting(e)
    },
    ChangePerPage(e) {
      this.per_page = e
      this.page = 0
      this.GetList()
    },
  }
}