<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" search :data="products">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="vx-row flex items-center" style="flex-grow:1">
          <div class="vx-col sm:w-1/3 w-full">
            <datepicker placeholder="Select start date" v-model="start_date"></datepicker> 
          </div>
          <div style="width:10px;"> - </div>
          <div class="vx-col sm:w-1/3 w-full">
            <datepicker placeholder="Select end date" v-model="end_date"></datepicker>
          </div>
          <div class="text-right">
            <a href="#"><feather-icon icon="FileIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2" /></a>
            <a href="#"><feather-icon icon="DownloadIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2" /></a>
            <a href="#"><feather-icon icon="PrinterIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2" /></a>
          </div>
        </div>

        <!-- ITEMS PER PAGE -->
        <per-page
          :perPageOptions="[10,20,50]"
          :currentPage="currentPage"
          :list="products"
          :queriedItems="queriedItems"
        />
        <!--
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div> -->
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <!--
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
         -->
      </div>

      <template slot="thead">
        <vs-th sort-key="company">Reseller Name</vs-th>
        <vs-th sort-key="company">Company Name</vs-th>
        <vs-th sort-key="paidon">Paid On</vs-th>
        <vs-th sort-key="amount">Paid Amount</vs-th>
        <vs-th sort-key="gateway">Method</vs-th>
        <vs-th sort-key="transactioniD">Transaction ID</vs-th>        
        
      </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.reseller_name }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.company_name }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.paid_on }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.amount }}</p>
              </vs-td>  

              <vs-td>
                <p class="product-category">{{ tr.gateway }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.transaction_id }}</p>
              </vs-td>                         

            </vs-tr>
          </tbody>
        </template>
    </vs-table>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moduleDataList from '@/store/data-list/moduleDataList.js'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      selected: [],
      products: [
        {
          reseller_name: 'Reseller 1',
          company_name: 'Company 1',
          gateway: 'Stripe',
          paid_on: 'October 10, 2020',
          amount: '$100.21',
          transaction_id: 'asfasf-asdfdsafa-sadfaf'
        },
        {
          reseller_name: 'Reseller 2',
          company_name: 'Company 2',
          gateway: 'Paypal',
          paid_on: 'October 10, 2020',
          amount: '$100.21',
          transaction_id: 'asfasf-asdfdsafa-sadfaf'
        },
        {
          reseller_name: 'Reseller 3',
          company_name: 'Company 3',
          gateway: 'Stripe',
          paid_on: 'October 10, 2020',
          amount: '$100.21',
          transaction_id: 'asfasf-asdfdsafa-sadfaf'
        }
      ],
      itemsPerPage: 4,
      isMounted: false,

      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {},

      // Date picker
      start_date: null,
      end_date: null
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
    }
  },
  methods: {
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      this.$store.dispatch('dataList/removeItem', id).catch(err => { console.error(err) })
    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    getOrderStatusColor (status) {
      if (status === 'on_hold')   return 'warning'
      if (status === 'delivered') return 'success'
      if (status === 'canceled')  return 'danger'
      return 'primary'
    },
    getPopularityColor (num) {
      if (num > 90)  return 'success'
      if (num > 70)  return 'primary'
      if (num >= 50) return 'warning'
      if (num < 50)  return 'danger'
      return 'primary'
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {
    if (!moduleDataList.isRegistered) {
      this.$store.registerModule('dataList', moduleDataList)
      moduleDataList.isRegistered = true
    }
    this.$store.dispatch('dataList/fetchDataListItems')
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
